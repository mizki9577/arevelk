// @flow
import type { Point } from './Point.js'
import Edge from './Edge.js'

class Polygon {
  vertices: Point[]

  constructor(vertices: Point[]) {
    this.vertices = vertices
  }

  getEdges() {
    const result = []
    const n = this.vertices.length
    for (let i = 0; i < n-1; ++i) {
      result.push(new Edge(this.vertices[i], this.vertices[i+1]))
    }
    result.push(new Edge(this.vertices[n-1], this.vertices[0]))
    return result
  }
}

export default Polygon

// vim: set ts=2 sw=2 et:
