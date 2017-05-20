// @flow
import test from 'ava'
import Polygon from '../Polygon.js'
import Edge from '../Edge.js'

test('#getEdges', t => {
  const polygon = new Polygon([
    { x: 0, y:  0 },
    { x: 4, y:  2 },
    { x: 4, y: -2 },
  ])

  t.deepEqual(polygon.getEdges(), [
    new Edge({ x: 0, y:  0 }, { x: 4, y:  2 }),
    new Edge({ x: 4, y:  2 }, { x: 4, y: -2 }),
    new Edge({ x: 4, y: -2 }, { x: 0, y:  0 }),
  ])
})

test('#split', t => {
  const polygon = new Polygon([
    { x: 0, y: 0 },
    { x: 8, y: 0 },
    { x: 8, y: 4 },
    { x: 0, y: 4 },
  ])

  const edges = polygon.getEdges()
  const edge1 = edges[0]  // [{ x: 0, y: 0 }, { x: 8, y: 0 }]
  const edge2 = edges[2]  // [{ x: 8, y: 4 }, { x: 0, y: 4 }]
  const point1 = edge1.getPointsOnGrids()[2]  // { x: 2, y: 0 }
  const point2 = edge2.getPointsOnGrids()[6]  // { x: 6, y: 4 }

  t.deepEqual(
    polygon.split(edge1, point1, edge2, point2), [
      new Polygon([
        { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 6, y: 4 }, { x: 0, y: 4 },
      ]),
      new Polygon([
        { x: 8, y: 4 }, { x: 6, y: 4 }, { x: 2, y: 0 }, { x: 8, y: 0 }
      ]),
    ])
})

// vim: set ts=2 sw=2 et:
