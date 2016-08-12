// @flow
import math from 'mathjs'

import AbstractPolygon from './AbstractPolygon'
import Triangle from './Triangle'

const createSuperTriangle = (points: Point[]) => {
  const max_x = math.max(...points.map(p => p[0]))
  const max_y = math.max(...points.map(p => p[1]))
  const min_x = math.min(...points.map(p => p[0]))
  const min_y = math.min(...points.map(p => p[1]))

  // create a isosceles right triangle
  const p1 = [min_x - 1    , min_y - 1]      // bottom left
  const p2 = [max_x * 2 + 2, min_y - 1]      // bottom right
  const p3 = [min_x - 1    , max_y * 2 + 2]  // top left
  return new Triangle(p1, p2, p3)
}

class Polygon extends AbstractPolygon {
  triangulate(points: Point[]) {
    const triangles = []
    const super_triangle = createSuperTriangle(this.vertices)
    triangles.push(super_triangle)
    points.unshift(...this.vertices)

    for (let point of points) {
      console.log(`point: [${point[0]}, ${point[1]}]`)
      for (let [it, triangle] of triangles.entries()) {
        console.log(`it: ${it}`)
        console.log(`triangle: ${JSON.stringify(triangle.vertices)}`)
        if (!triangle.isContain(point)) continue
        console.log('triangle contains point')
        triangles.splice(it, 1)
        for (let edge of triangle.edges) {
          triangles.push(Triangle.createFromPointAndEdge(point, edge))
        }
        break
      }
    }

    return triangles
  }
}

export default Polygon

// vim: set ts=2 sw=2 et:
