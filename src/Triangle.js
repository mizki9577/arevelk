// @flow
import math from 'mathjs'

import Polygon from './Polygon'

class Triangle extends Polygon {
  constructor(p1: Point, p2: Point, p3: Point) {
    super([p1, p2, p3])
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
