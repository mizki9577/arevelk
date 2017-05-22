// @flow
import Point from './Point.js'
import Edge from './Edge.js'
import { randomChoice } from './utils.js'

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

  split(edge1: Edge, point1: Point, edge2: Edge, point2: Point): [Polygon, Polygon] {
    const polygon1_vertices = [edge1.begin, point1, point2, edge2.end]
    if (polygon1_vertices[0].isEqual(polygon1_vertices[1])) {
      polygon1_vertices.splice(0, 1)
    }
    if (polygon1_vertices[polygon1_vertices.length-2].isEqual(polygon1_vertices[polygon1_vertices.length-1])) {
      polygon1_vertices.splice(-1, 1)
    }
    if (polygon1_vertices[0].isEqual(polygon1_vertices[polygon1_vertices.length-1])) {
      polygon1_vertices.splice(-1, 1)
    }

    let i = (this.indexOf(polygon1_vertices[polygon1_vertices.length-1]) + 1) % this.length
    while (!this[i].isEqual(polygon1_vertices[0])) {
      if (!polygon1_vertices[polygon1_vertices.length - 1].isEqual(this[i])) {
        polygon1_vertices.push(this[i])
      }
      i = (i + 1) % this.length
    }

    const polygon2_vertices = [edge2.begin, point2, point1, edge1.end]
    if (polygon2_vertices[0].isEqual(polygon2_vertices[1])) {
      polygon2_vertices.splice(0, 1)
    }
    if (polygon2_vertices[polygon2_vertices.length-2].isEqual(polygon2_vertices[polygon2_vertices.length-1])) {
      polygon2_vertices.splice(-1, 1)
    }
    if (polygon2_vertices[0].isEqual(polygon2_vertices[polygon2_vertices.length-1])) {
      polygon2_vertices.splice(-1, 1)
    }

    let j = (this.indexOf(polygon2_vertices[polygon2_vertices.length-1]) + 1) % this.length
    while (!this[j].isEqual(polygon2_vertices[0])) {
      if (!polygon2_vertices[polygon2_vertices.length - 1].isEqual(this[j])) {
        polygon2_vertices.push(this[j])
      }
      j = (j + 1) % this.length
    }

    return [new Polygon(...polygon1_vertices), new Polygon(...polygon2_vertices)]
  }

  randomSplit(numberOfSplits: number): Polygon[] {
    const polygons = [this]

    for (let _ = 0; _ < numberOfSplits; ++_) {
      const splitting_polygon = randomChoice(polygons, true)
      const edges = splitting_polygon.getEdges()

      const edge1 = randomChoice(edges, true)
      const edge2 = randomChoice(edges, true)

      const points1 = edge1.getPointsOnGrids()
      const points2 = edge2.getPointsOnGrids()

      const point1 = randomChoice(points1)
      const point2 = randomChoice(points2)

      polygons.push(...splitting_polygon.split(edge1, point1, edge2, point2))
    }

    return polygons
  }
}

export default Polygon

// vim: set ts=2 sw=2 et:
