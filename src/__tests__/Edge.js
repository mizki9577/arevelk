// @flow
import test from 'ava'
import Edge from '../Edge.js'
import Point from '../Point.js'

test(t => {
  const edge = new Edge(new Point(0, 0), new Point(8, 4))

  t.deepEqual(edge.getPointsOnGrids(), [
    new Point(0, 0),
    new Point(2, 1),
    new Point(4, 2),
    new Point(6, 3),
    new Point(8, 4),
  ])
})

test(t => {
  const edge = new Edge(new Point(0, 0), new Point(0, 4))

  t.deepEqual(edge.getPointsOnGrids(), [
    new Point(0, 0),
    new Point(0, 1),
    new Point(0, 2),
    new Point(0, 3),
    new Point(0, 4),
  ])
})

test(t => {
  const edge = new Edge(new Point(0, 0), new Point(4, 0))

  t.deepEqual(edge.getPointsOnGrids(), [
    new Point(0, 0),
    new Point(1, 0),
    new Point(2, 0),
    new Point(3, 0),
    new Point(4, 0),
  ])
})

test(t => {
  const edge = new Edge(new Point(4, 8), new Point(0, 0))

  t.deepEqual(edge.getPointsOnGrids(), [
    new Point(0, 0),
    new Point(1, 2),
    new Point(2, 4),
    new Point(3, 6),
    new Point(4, 8),
  ])
})

test(t => {
  const edge = new Edge(new Point(70, 3), new Point(100, 34))
  t.deepEqual(edge.getPointsOnGrids(), [
    edge.begin,
    edge.end,
  ])
})

// vim: set ts=2 sw=2 et:
