// @flow
import Point from './Point.js'
import Edge from './Edge.js'
import { randomChoice, orderedRandomPull } from './utils.js'

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
    const polygon1 = new Polygon(edge1.begin, point1, point2, edge2.end)
    if (polygon1[0].isEqual(polygon1[1])) {
      polygon1.splice(0, 1)
    } else if (polygon1[2].isEqual(polygon1[3])) {
      polygon1.splice(2, 1)
    } else if (polygon1[0].isEqual(polygon1[3])) {
      polygon1.splice(0, 1)
    } else {
      let i = this.findIndex(v => v.isEqual(polygon1[3]))
      if (i === -1) throw 'something wrong'
      i = (i + 1) % this.length

      while (!this[i].isEqual(polygon1[0])) {
        polygon1.push(this[i])
        i = (i + 1) % this.length
      }
    }

    const polygon2 = new Polygon(edge2.begin, point2, point1, edge1.end)
    if (polygon2[0].isEqual(polygon2[1])) {
      polygon2.splice(0, 1)
    } else if (polygon2[2].isEqual(polygon2[3])) {
      polygon2.splice(2, 1)
    } else if (polygon2[0].isEqual(polygon2[3])) {
      polygon2.splice(0, 1)
    } else {
      let i = this.findIndex(v => v.isEqual(polygon2[3]))
      if (i === -1) throw 'something wrong'
      i = (i + 1) % this.length

      while (!this[i].isEqual(polygon2[0])) {
        polygon2.push(this[i])
        i = (i + 1) % this.length
      }
    }

    return [polygon1, polygon2]
  }

  randomSplit(numberOfSplits: number): Polygon[] {
    const polygons = [this]

    for (let _ = 0; _ < numberOfSplits; ++_) {
      if (polygons.length === 0) break
      const splitting_polygon = randomChoice(polygons, true)
      const edges = splitting_polygon.getEdges()

      const edges_points = edges.map(e => [e, e.getPointsOnGrids()])
                                .filter(ep => ep[1].length > 2)

      if (edges_points.length < 2) {
        --_
        continue
      }

      const [ep1, ep2] = orderedRandomPull(edges_points, 2)

      const [edge1, points1] = ep1
      const [edge2, points2] = ep2

      const point1 = randomChoice(points1.slice(1, -1))
      const point2 = randomChoice(points2.slice(1, -1))

      polygons.push(...splitting_polygon.split(edge1, point1, edge2, point2))
    }

    return polygons
  }
}

export default Polygon

// vim: set ts=2 sw=2 et:
