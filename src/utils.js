// @flow
import math from 'mathjs'

import Polygon from './Polygon.js'
import Triangle from './Triangle.js'
import Point from './Point.js'

export const delaunayTriangulate = (points: Point[]) => {
  let triangles = []
  const super_triangle = createSuperTriangle(points)
  triangles.push(super_triangle)

  for (let point of points) {
    const { true: bad_triangles = [], false: good_triangles = [] } = partition(triangles, t => t.circumcircleContainsPoint(point))

    const polygon = bad_triangles.map(t => t.getEdges())
                                 .reduce((prev, next) => prev.concat(next))
                                 .filter((_, i, array) => isUnique(array, i, (e1, e2) => e1.isEqual(e2)))

    const new_triangles = polygon.map(e => new Triangle(point, e.begin, e.end))

    triangles = [...good_triangles, ...new_triangles]
  }

  for (const super_vertex of super_triangle) {
    triangles = triangles.filter(t => t.findIndex(v => v.isEqual(super_vertex)) === -1)
  }

  return triangles
}

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

export const isUnique = (array: any[], index: number, fn: (any, any) => boolean): boolean => (
  array.slice(0, index).findIndex(v => fn(v, array[index])) === -1 && array.slice(index + 1).findIndex(v => fn(v, array[index])) === -1
)

export const partition = (array: any[], fn: (any) => any): { [any]: any[] } => {
  const map = {}
  for (const value of array) {
    const key = fn(value)
    if (typeof map[key] === 'undefined') {
      map[key] = []
    }
    map[fn(value)].push(value)
  }
  return map
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
