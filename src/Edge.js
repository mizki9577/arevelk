// @flow
import type { Point } from './Point.js'

class Edge {
  points: [Point, Point]

  constructor(...points: [Point, Point]) {
    this.points = points
  }

  getPointsOnGrids(): Point[] {
    const result = []

    if (this.points[0].x === this.points[1].x) {
      const begin_y = Math.min(this.points[0].y, this.points[1].y)
      const end_y   = Math.max(this.points[0].y, this.points[1].y)
      const x = this.points[0].x
      for (let y = begin_y; y <= end_y; ++y) {
        result.push({ x, y })
      }
      return result
    }

    const { x: begin_x, y: begin_y } = this.points[0].x < this.points[1].x ? this.points[0] : this.points[1]
    const end_x   = Math.max(this.points[0].x, this.points[1].x)
    const gradient = (this.points[0].y - this.points[1].y) / (this.points[0].x - this.points[1].x)
    for (let x = begin_x; x <= end_x; ++x) if (Number.isInteger(x * gradient)) {
      result.push({ x, y: begin_y + x * gradient })
    }
    return result
  }
}

export default Edge

// vim: set ts=2 sw=2 et:
