// @flow
import Point from './Point.js'
import Edge from './Edge.js'

class Polygon extends Array {
  constructor(...vertices: Point[]) {
    super(...vertices)
  }

  isEqual(other: Polygon): boolean {
    if (this.length !== other.length) return false
    const length = this.length

    for (let i = 0; i < length; ++i) {
      let matched = true
      for (let j = 0; j < length; ++j) {
        if (!this[j].isEqual(other[(i+j)%length])) {
          matched = false
          break
        }
      }
      if (matched) {
        return true
      }
    }

    return false
  }

  getEdges(): Edge[] {
    const result = []
    const n = this.length
    for (let i = 0; i < n-1; ++i) {
      result.push(new Edge(this[i], this[i+1]))
    }
    result.push(new Edge(this[n-1], this[0]))
    return result
  }
}

export default Polygon

// vim: set ts=2 sw=2 et:
