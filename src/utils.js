// @flow
import math from 'mathjs'

import Polygon from './Polygon.js'
import Triangle from './Triangle.js'
import Point from './Point.js'

export const delaunayTriangulate = (points: Point[]) => {
  const super_triangle = createSuperTriangle(points)

  return points.reduce((triangles, point) => {
    const { [true]: bad_triangles = [], [false]: good_triangles = [] } = partition(triangles, t => t.circumcircleContainsPoint(point))
    if (bad_triangles.length === 0) return triangles

    const new_triangles = bad_triangles
      .map(t => t.getEdges())
      .reduce((prev, next) => prev.concat(next))
      .filter((_, i, array) => isUnique(array, i, (e1, e2) => e1.isWeakEqual(e2)))
      .map(e => new Triangle(point, e.begin, e.end))

    return [...good_triangles, ...new_triangles]
  }, [super_triangle])
    .filter(t => t.findIndex(v => super_triangle.some(super_vertex => v.isEqual(super_vertex))) === -1)
}

const createSuperTriangle = (points: Point[]) => {
  const max_x = math.max(points.map(p => p.x))
  const max_y = math.max(points.map(p => p.y))
  const min_x = math.min(points.map(p => p.x))
  const min_y = math.min(points.map(p => p.y))

  // create a isosceles right triangle
  const p1 = new Point(min_x - 4    , min_y - 4)      // bottom left
  const p2 = new Point(max_x * 2 + 8, min_y - 4)      // bottom right
  const p3 = new Point(min_x - 4    , max_y * 2 + 8)  // top left
  return new Triangle(p1, p2, p3)
}

export const isUnique = <T>(array: T[], i: number, compare: (T, T) => boolean): boolean => (
  !array.some((v, j) => j === i ? false : compare(v, array[i]))
)

export const partition = <K, V>(array: V[], fn: (V) => K): { [K]: V[] } => {
  const map: { [K]: V[] } = {}
  for (const value of array) {
    const key = fn(value)
    if (typeof map[key] === 'undefined') {
      map[key] = []
    }
    map[fn(value)].push(value)
  }
  return map
}

export const randomDelaunayTriangulation = (min_x: number, max_x: number, min_y: number, max_y: number, numberOfSplits: number): Triangle[] => {
  const points = []

  for (let i = 0; i < numberOfSplits; ++i) {
    points.push(new Point(
      math.randomInt(min_x, max_x),
      math.randomInt(min_y, max_y),
    ))
  }
  return delaunayTriangulate(points)
}

export const getConvexHull = (triangles: Triangle[]): Polygon => {
  const outer_edges = triangles
    .map(t => t.getEdges())
    .reduce((prev, next) => prev.concat(next))
    .filter((_, i, array) => isUnique(array, i, (e1, e2) => e1.isWeakEqual(e2)))

  const vertices = [outer_edges[0].begin, outer_edges[0].end]
  outer_edges.shift()
  while (outer_edges.length > 0) {
    for (let i = 0; i < outer_edges.length; ++i) {
      const edge = outer_edges[i]

      if (vertices[vertices.length-1].isEqual(edge.begin)) {
        vertices.push(edge.end)
        outer_edges.splice(i, 1)
        break
      } else if (vertices[vertices.length-1].isEqual(edge.end)) {
        vertices.push(edge.begin)
        outer_edges.splice(i, 1)
        break
      }
    }
  }

  return new Polygon(...vertices)
}

// vim: set ts=2 sw=2 et:
