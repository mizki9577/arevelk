// @flow
import math from 'mathjs'
import { jStat } from 'jStat'
import { pullAllWith } from 'lodash'

import Polygon from './Polygon'
import Triangle from './Triangle'

export const delaunayTriangulate = (points: Point[]) => {
  const createSuperTriangle = (points: Point[]) => {
    const max_x = math.max(...points.map(p => p[0]))
    const max_y = math.max(...points.map(p => p[1]))
    const min_x = math.min(...points.map(p => p[0]))
    const min_y = math.min(...points.map(p => p[1]))

    // create a isosceles right triangle
    const p1 = [min_x - 1    , min_y - 1]      // bottom left
    const p2 = [max_x * 2 + 2, min_y - 1]      // bottom right
    const p3 = [min_x - 1    , max_y * 2 + 2]  // top left
    return new Triangle(p1, p2, p3)
  }

  const triangles = []
  const super_triangle = createSuperTriangle(points)
  triangles.push(super_triangle)

  for (let point of points) {
    const bad_triangles = []

    for (const triangle of triangles) {
      if (triangle.isContainInCircumcircle(point)) {
        bad_triangles.push(triangle)
      }
    }

    const polygon = []
    for (const bad_triangle of bad_triangles) {
      for (const bad_edge of bad_triangle.edges) {
        let edge_is_shared = false

        for (const other_bad_triangle of bad_triangles) {
          if (bad_triangle.isEqual(other_bad_triangle)) continue

          if (other_bad_triangle.hasEdge(bad_edge)) {
            edge_is_shared = true
            break
          }
        }

        if (!edge_is_shared) {
          polygon.push(bad_edge)
        }
      }
    }

    pullAllWith(triangles, bad_triangles, (a, b) => a.isEqual(b))

    for (const edge of polygon) {
      triangles.push(Triangle.createFromPointAndEdge(point, edge))
    }
  }

  pullAllWith(triangles, super_triangle.vertices, (t, v) => t.hasVertex(v))

  return triangles
}

export const createRandomPolygon = (n_vertices: number, ave_radius: number, irregularity: number, spikeyness: number) => {
  // n_vertices must be >= 3, ave_radius must be > 0, irregularity must be in [0, 1], spikeyness must be >= 0
  const std_angle_diff = 2 * math.PI / n_vertices
  const vertices = []
  let std_angle = 0
  for (let i = 0; i < n_vertices; ++i) {
    std_angle += std_angle_diff
    const radius = jStat.normal.sample(ave_radius, spikeyness * ave_radius)
    const angle = std_angle + std_angle_diff * jStat.uniform.sample(-irregularity, irregularity)
    vertices.push({ radius, angle })
  }

  const polarToCartesian = ({ radius, angle }) => [radius * math.cos(angle), radius * math.sin(angle)]
  return new Polygon(vertices.map(polarToCartesian))
}

// vim: set ts=2 sw=2 et:
