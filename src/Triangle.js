// @flow
import math from 'mathjs'

import Polygon from './Polygon.js'
import Point from './Point.js'

class Triangle extends Polygon {
  constructor(point1: Point, point2: Point, point3: Point) {
    super(point1, point2, point3)
  }

  circumcircleContainsPoint(point: Point): boolean {
    return 0 < math.det([
      [this[0].x, this[0].y, this[0].x**2 + this[0].y**2, 1],
      [this[1].x, this[1].y, this[1].x**2 + this[1].y**2, 1],
      [this[2].x, this[2].y, this[2].x**2 + this[2].y**2, 1],
      [point.x, point.y, point.x**2 + point.y**2, 1],
    ])
  }
}

export default Triangle

// vim: set ts=2 sw=2 et:
