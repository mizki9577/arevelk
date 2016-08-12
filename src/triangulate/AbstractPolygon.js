// @flow
import math from 'mathjs'

const vertices = new WeakMap()
const edges = new WeakMap()

class AbstractPolygon {
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

  getCenter(): Point {
    return math.divide(
      this.vertices.reduce((prev, curr) => math.add(prev, curr)),
      this.vertices.length
    )
  }

  triangulate() {
    throw '循環依存回避のつもりだったけど本当にひどくてつらい'
  }
}

export default AbstractPolygon

// vim: set ts=2 sw=2 et:
