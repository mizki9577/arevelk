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

// vim: set ts=2 sw=2 et:
