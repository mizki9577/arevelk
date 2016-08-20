// @flow
import math from 'mathjs'

import AbstractPolygon from './AbstractPolygon'

class Triangle extends AbstractPolygon {
  constructor(p1: Point, p2: Point, p3: Point) {
    super([p1, p2, p3])
  }

  isContain(p4: Point) {
    const cross = (a, b) => a[0] * b[1] - a[1] * b[0]
    const [p1, p2, p3] = this.vertices
    const v12 = math.subtract(p2, p1)
    const v23 = math.subtract(p3, p2)
    const v31 = math.subtract(p1, p3)
    const v14 = math.subtract(p4, p1)
    const v24 = math.subtract(p4, p2)
    const v34 = math.subtract(p4, p3)
    const x1224 = cross(v12, v24) < 0
    const x2334 = cross(v23, v34) < 0
    const x3114 = cross(v31, v14) < 0
    return (x1224 === x2334 && x2334 === x3114)
  }

  isContainInCircumcircle(p4: Point) {
    const [p1, p2, p3] = this.vertices
    return 0 < math.det([
      [p1[0], p1[1], p1[0]**2 + p1[1]**2, 1],
      [p2[0], p2[1], p2[0]**2 + p2[1]**2, 1],
      [p3[0], p3[1], p3[0]**2 + p3[1]**2, 1],
      [p4[0], p4[1], p4[0]**2 + p4[1]**2, 1],
    ])
  }

  static createFromPointAndEdge(point: Point, edge: Edge) {
    return new Triangle(point, edge[0], edge[1])
  }
}

export default Triangle

// vim: set ts=2 sw=2 et:
