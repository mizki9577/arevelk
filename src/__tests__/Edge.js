// @flow
import test from 'ava'
import Edge from '../Edge.js'

test(t => {
  const edge = new Edge({ x: 0, y: 0 }, { x: 8, y: 4 })

  t.deepEqual(edge.getPointsOnGrids(), [
    { x: 0, y: 0 },
    { x: 2, y: 1 },
    { x: 4, y: 2 },
    { x: 6, y: 3 },
    { x: 8, y: 4 },
  ])
})

test(t => {
  const edge = new Edge({ x: 0, y: 0 }, { x: 0, y: 4 })

  t.deepEqual(edge.getPointsOnGrids(), [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
  ])
})

test(t => {
  const edge = new Edge({ x: 0, y: 0 }, { x: 4, y: 0 })

  t.deepEqual(edge.getPointsOnGrids(), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ])
})

test(t => {
  const edge = new Edge({ x: 4, y: 8 }, { x: 0, y: 0 })

  t.deepEqual(edge.getPointsOnGrids(), [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
    { x: 4, y: 8 },
  ])
})

// vim: set ts=2 sw=2 et:
