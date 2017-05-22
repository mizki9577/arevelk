// @flow
import Point from './Point.js'
import Edge from './Edge.js'
import { randomChoice } from './utils.js'

class Polygon {
  vertices: Point[]

  constructor(vertices: Point[]) {
    this.vertices = vertices
  }

  isEqual(other: Polygon) {
    if (this.vertices.length !== other.vertices.length) return false
    const length = this.vertices.length

    for (let i = 0; i < length; ++i) {
      let matched = true
      for (let j = 0; j < length; ++j) {
        if (!this.vertices[j].isEqual(other.vertices[(i+j)%length])) {
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
    const n = this.vertices.length
    for (let i = 0; i < n-1; ++i) {
      result.push(new Edge(this.vertices[i], this.vertices[i+1]))
    }
    result.push(new Edge(this.vertices[n-1], this.vertices[0]))
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

    let i = (this.vertices.indexOf(polygon1_vertices[polygon1_vertices.length-1]) + 1) % this.vertices.length
    while (!this.vertices[i].isEqual(polygon1_vertices[0])) {
      if (!polygon1_vertices[polygon1_vertices.length - 1].isEqual(this.vertices[i])) {
        polygon1_vertices.push(this.vertices[i])
      }
      i = (i + 1) % this.vertices.length
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

    let j = (this.vertices.indexOf(polygon2_vertices[polygon2_vertices.length-1]) + 1) % this.vertices.length
    while (!this.vertices[j].isEqual(polygon2_vertices[0])) {
      if (!polygon2_vertices[polygon2_vertices.length - 1].isEqual(this.vertices[j])) {
        polygon2_vertices.push(this.vertices[j])
      }
      j = (j + 1) % this.vertices.length
    }

    return [new Polygon(polygon1_vertices), new Polygon(polygon2_vertices)]
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
