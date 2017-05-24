// @flow
import math from 'mathjs'

import Polygon from './Polygon.js'
import Triangle from './Triangle.js'
import Point from './Point.js'

export const delaunayTriangulate = (points: Point[]) => {
  const createSuperTriangle = (points: Point[]) => {
    const max_x = math.max(points.map(p => p.x))
    const max_y = math.max(points.map(p => p.y))
    const min_x = math.min(points.map(p => p.x))
    const min_y = math.min(points.map(p => p.y))

    // create a isosceles right triangle
    const p1 = new Point(min_x - 1    , min_y - 1)      // bottom left
    const p2 = new Point(max_x * 2 + 2, min_y - 1)      // bottom right
    const p3 = new Point(min_x - 1    , max_y * 2 + 2)  // top left
    return new Triangle(p1, p2, p3)
  }

  const triangles = []
  const super_triangle = createSuperTriangle(points)
  triangles.push(super_triangle)

  for (let point of points) {
    const bad_triangles = []

    for (const triangle of triangles) {
      if (triangle.circumcircleContainsPoint(point)) {
        bad_triangles.push(triangle)
      }
    }

    const polygon = []
    for (const bad_triangle of bad_triangles) {
      for (const bad_edge of bad_triangle.getEdges()) {
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

    for (const bad_triangle of bad_triangles) {
      const i = triangles.findIndex(t => t.isEqual(bad_triangle))
      if (i === -1) continue
      triangles.splice(i, 1)
    }

    for (const edge of polygon) {
      triangles.push(new Triangle(edge.begin, point, edge.end))
    }
  }

  for (const super_vertex of super_triangle) {
    const i = triangles.findIndex(t => t.findIndex(v => v.isEqual(super_vertex)) !== -1)
    if (i === -1) continue
    triangles.splice(i, 1)
  }

  return triangles
}

export const randomDelaunayTriangulation = (polygon: Polygon, numberOfSplits: number): Triangle[] => {
  const points = Array.from(polygon)
  const min_x = math.min(polygon.map(v => v.x))
  const max_x = math.max(polygon.map(v => v.x))
  const min_y = math.min(polygon.map(v => v.y))
  const max_y = math.max(polygon.map(v => v.y))

  for (let i = 0; i < numberOfSplits; ++i) {
    points.push(new Point(
      math.randomInt(min_x, max_x),
      math.randomInt(min_y, max_y),
    ))
  }
  return delaunayTriangulate(points)
}

// vim: set ts=2 sw=2 et:
