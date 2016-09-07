// @flow
import math from 'mathjs'
import { isEqual, sortBy } from 'lodash'

const vertices = new WeakMap()
const edges = new WeakMap()

class Polygon {
  constructor(_vertices: Point[]) {
    vertices.set(this, _vertices)

    // sort vertices counterclockwise
    const center = this.getCenter()
    this.vertices.sort((a, b) => {
      const angle_a = math.atan2(a[1] - center[1], a[0] - center[0])
      const angle_b = math.atan2(b[1] - center[1], b[0] - center[0])
      if (angle_a < angle_b) return -1
      if (angle_a > angle_b) return  1
      return 0
    })

    // compute edges
    edges.set(this, [])
    let i
    for (i = 0; i < this.vertices.length - 1; ++i) {
      this.edges.push([this.vertices[i], this.vertices[i + 1]])
    }
    this.edges.push([this.vertices[i], this.vertices[0]])
  }

  get vertices(): Point[] {
    return vertices.get(this)
  }

  get edges(): Edge[] {
    return edges.get(this)
  }

  isEqual(other: Polygon) {
    return isEqual(sortBy(this.vertices), sortBy(other.vertices))
  }

  getCenter(): Point {
    return math.divide(
      this.vertices.reduce((prev, curr) => math.add(prev, curr)),
      this.vertices.length
    )
  }

  hasVertex(target: Point) {
    return this.vertices.find(v => isEqual(v, target)) !== undefined
  }

  hasEdge(target: Edge) {
    const copied_target = [target[0], target[1]]
    for (const edge of this.edges) {
      if (isEqual(edge, target) || isEqual(edge, target.reverse())) {
        return true
      }
    }
    return false
  }

  isContaining(p: Point) {
    let cn = 0

    for (let [begin, end] of this.edges) {
      if ((begin[1] <= p[1] && p[1] < end[1]) || (end[1] <= p[1] && p[1] < begin[1])) {
        const m = (end[0] - begin[0]) / (end[1] - begin[1])
        if (p[0] < (p[1] - begin[1]) * m + begin[0]) {
          ++cn
        }
      }
    }

    return cn % 2 === 1
  }
}

export default Polygon

// vim: set ts=2 sw=2 et:
