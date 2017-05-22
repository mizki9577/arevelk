// @flow
import test from 'ava'
import Polygon from '../Polygon.js'
import Edge from '../Edge.js'
import Point from '../Point.js'

test('#isEqual', t => {
  const polygon1 = new Polygon(
    new Point(0, 1),
    new Point(2, 3),
    new Point(4, 5),
  )
  const polygon2 = new Polygon(
    new Point(2, 3),
    new Point(4, 5),
    new Point(0, 1),
  )

  t.true(polygon1.isEqual(polygon2))
})

test('#getEdges', t => {
  const polygon = new Polygon(
    new Point(0,  0),
    new Point(4,  2),
    new Point(4, -2),
  )

  t.deepEqual(polygon.getEdges(), [
    new Edge(new Point(0,  0), new Point(4,  2)),
    new Edge(new Point(4,  2), new Point(4, -2)),
    new Edge(new Point(4, -2), new Point(0,  0)),
  ])
})

test('#split', t => {
  const polygon = new Polygon(
    new Point(0, 0),
    new Point(8, 0),
    new Point(8, 4),
    new Point(0, 4),
  )

  const edges = polygon.getEdges()
  const edge1 = edges[0]  // [new Point(0, 0), new Point(8, 0)]
  const edge2 = edges[2]  // [new Point(8, 4), new Point(0, 4)]
  const point1 = edge1.getPointsOnGrids()[2]  // new Point(2, 0)
  const point2 = edge2.getPointsOnGrids()[6]  // new Point(6, 4)

  t.deepEqual(
    polygon.split(edge1, point1, edge2, point2), [
      new Polygon(
        new Point(0, 0), new Point(2, 0), new Point(6, 4), new Point(0, 4),
      ),
      new Polygon(
        new Point(8, 4), new Point(6, 4), new Point(2, 0), new Point(8, 0)
      ),
    ])
})

test('#split', t => {
  const polygon = new Polygon(
    new Point(0, 0),
    new Point(8, 0),
    new Point(8, 4),
    new Point(0, 4),
  )

  const edges = polygon.getEdges()
  const edge1 = edges[0]  // [new Point(0, 0), new Point(8, 0)]
  const edge2 = edges[1]  // [new Point(8, 0), new Point(8, 4)]
  const point1 = edge1.getPointsOnGrids()[0]  // new Point(0, 0)
  const point2 = edge2.getPointsOnGrids()[2]  // new Point(8, 2)

  const result = polygon.split(edge1, point1, edge2, point2)

  t.true(
    result[0].isEqual(new Polygon(
      new Point(0, 0), new Point(8, 2), new Point(8, 4), new Point(0, 4),
    ))
  )

  t.true(
    result[1].isEqual(new Polygon(
      new Point(8, 0), new Point(8, 2), new Point(0, 0),
    ))
  )
})

test('#split', t => {
  const polygon = new Polygon(
    new Point(0, 0),
    new Point(8, 0),
    new Point(8, 4),
    new Point(0, 4),
  )

  const edges = polygon.getEdges()
  const edge1 = edges[1]  // [new Point(8, 0), new Point(8, 4)]
  const edge2 = edges[3]  // [new Point(0, 0), new Point(8, 0)]
  const point1 = edge1.getPointsOnGrids()[2]  // new Point(8, 2)
  const point2 = edge2.getPointsOnGrids()[0]  // new Point(0, 0)

  const result = polygon.split(edge1, point1, edge2, point2)

  t.true(
    result[0].isEqual(new Polygon(
      new Point(8, 0), new Point(8, 2), new Point(0, 0),
    ))
  )

  t.true(
    result[1].isEqual(new Polygon(
      new Point(0, 4), new Point(0, 0), new Point(8, 2), new Point(8, 4),
    ))
  )
})

// vim: set ts=2 sw=2 et:
