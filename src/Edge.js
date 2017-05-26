// @flow
import Point from './Point.js'

class Edge {
  begin: Point
  end: Point

  constructor(begin: Point, end: Point) {
    this.begin = begin
    this.end = end
  }

  isEqual(other: Edge): boolean {
    return this.begin.isEqual(other.begin) && this.end.isEqual(other.end)
  }

  isWeakEqual(other: Edge): boolean {
    return this.isEqual(other) || this.begin.isEqual(other.end) && this.end.isEqual(other.begin)
  }

  getPointsOnGrids(): Point[] {
    const result = []

    if (this.begin.x === this.end.x) {
      const begin_y = Math.min(this.begin.y, this.end.y)
      const end_y   = Math.max(this.begin.y, this.end.y)
      const x = this.begin.x
      for (let y = begin_y; y <= end_y; ++y) {
        result.push(new Point(x, y))
      }
      return result
    }

    const { x: begin_x, y: begin_y } = this.begin.x < this.end.x ? this.begin : this.end
    const end_x   = Math.max(this.begin.x, this.end.x)
    const n = end_x - begin_x
    for (let x = 0; x <= n; ++x) {
      const y = x * (this.begin.y - this.end.y) / (this.begin.x - this.end.x)
      if (Number.isInteger(y)) {
        result.push(new Point(x + begin_x, y + begin_y))
      }
    }
    return result
  }
}

export default Edge

// vim: set ts=2 sw=2 et:
