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

  randomSplit(numberOfSplits: number): Polygon[] {
    const polygons = [this]

    for (let _ = 0; _ < numberOfSplits; ++_) {
      console.group()

      const splitting_polygon = randomChoice(polygons, true)

      const edges = splitting_polygon.getEdges()
      const edge1 = randomChoice(edges, true)
      const edge2 = randomChoice(edges, true)

      const point1 = randomChoice(edge1.getPointsOnGrids())
      const point2 = randomChoice(edge2.getPointsOnGrids())

      console.log('splitting_polygon: ', splitting_polygon.vertices.map(v => `[${v.x}, ${v.y}]`).join(', '))
      console.log('edge1:', edge1.points.map(p => `[${p.x}, ${p.y}]`).join(', '))
      console.log('edge2:', edge2.points.map(p => `[${p.x}, ${p.y}]`).join(', '))
      console.log(`point1: [${point1.x}, ${point1.y}]`)
      console.log(`point2: [${point2.x}, ${point2.y}]`)

      console.group()

      let i = (splitting_polygon.vertices.indexOf(edge2.points[1]) + 1) % splitting_polygon.vertices.length
      const polygon1_vertices = [edge1.points[0], point1, point2, edge2.points[1]]
      console.log('polygon1_vertices:', polygon1_vertices.map(v => `[${v.x}, ${v.y}]`).join(', '))
      if (polygon1_vertices[0] === polygon1_vertices[polygon1_vertices.length-1]) {
        polygon1_vertices.splice(-1, 1)
      } else while (splitting_polygon.vertices[i] !== edge1.points[0]) {
        console.log(`i: ${i}`)
        console.log('adding:', splitting_polygon.vertices[i])
        polygon1_vertices.push(splitting_polygon.vertices[i])
        i = (i + 1) % splitting_polygon.vertices.length
      }

      console.groupEnd()
      console.group()

      let j = (splitting_polygon.vertices.indexOf(edge1.points[1]) + 1) % splitting_polygon.vertices.length
      const polygon2_vertices = [edge2.points[0], point2, point1, edge1.points[1]]
      console.log('polygon2_vertices:', polygon2_vertices.map(v => `[${v.x}, ${v.y}]`).join(', '))
      if (polygon2_vertices[0] === polygon2_vertices[polygon2_vertices.length-1]) {
        polygon2_vertices.splice(-1, 1)
      } else while (splitting_polygon.vertices[j] !== edge2.points[0]) {
        console.log(`j: ${j}`)
        console.log('adding:', splitting_polygon.vertices[j])
        polygon2_vertices.push(splitting_polygon.vertices[j])
        j = (j + 1) % splitting_polygon.vertices.length
      }

      console.groupEnd()

      polygons.push(new Polygon(polygon1_vertices), new Polygon(polygon2_vertices))

      console.groupEnd()
    }

    return polygons
  }
}

export default Polygon

// vim: set ts=2 sw=2 et:
