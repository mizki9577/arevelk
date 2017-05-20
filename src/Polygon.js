// @flow
import type { Point } from './Point.js'
import Edge from './Edge.js'
import { randomChoice } from './utils.js'

class Polygon {
  vertices: Point[]

  constructor(vertices: Point[]) {
    this.vertices = vertices
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
    let i = (this.vertices.indexOf(edge2.points[1]) + 1) % this.vertices.length
    const polygon1_vertices = [edge1.points[0], point1, point2, edge2.points[1]]
    if (polygon1_vertices[0] === polygon1_vertices[polygon1_vertices.length-1]) {
      polygon1_vertices.splice(-1, 1)
    } else while (this.vertices[i] !== edge1.points[0]) {
      polygon1_vertices.push(this.vertices[i])
      i = (i + 1) % this.vertices.length
    }

    let j = (this.vertices.indexOf(edge1.points[1]) + 1) % this.vertices.length
    const polygon2_vertices = [edge2.points[0], point2, point1, edge1.points[1]]
    if (polygon2_vertices[0] === polygon2_vertices[polygon2_vertices.length-1]) {
      polygon2_vertices.splice(-1, 1)
    } else while (this.vertices[j] !== edge2.points[0]) {
      polygon2_vertices.push(this.vertices[j])
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
