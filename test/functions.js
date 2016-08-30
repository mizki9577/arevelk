import assert from 'assert'
import Polygon from '../src/Polygon'
import { delaunayTriangulate, createRandomPolygon, generateRandomPoints } from '../src/functions'

describe('delaunayTriangulate()', () => {
  it('returns delaunay triangulation of given points', () => {
    const actual = delaunayTriangulate([
      [4, 4], [4, 0], [0, 0], [0, 4], [1, 1], [2, 3], [3, 2]
    ]).map(t => t.vertices)

    const expected = [
      [[0, 0], [4, 0], [1, 1]],
      [[0, 0], [1, 1], [0, 4]],
      [[2, 3], [4, 4], [0, 4]],
      [[1, 1], [2, 3], [0, 4]],
      [[4, 0], [3, 2], [1, 1]],
      [[1, 1], [3, 2], [2, 3]],
      [[4, 0], [4, 4], [3, 2]],
      [[3, 2], [4, 4], [2, 3]],
    ]

    assert.deepEqual(actual, expected)
  })
})

describe('generateRandomPoints()', () => {
  it('returns random points which satisfies given condition', () => {
    const polygon = new Polygon([[0, 0], [2, 4], [4, 0]])
    const points = generateRandomPoints(100, 0, 4, 0, 4, (p => polygon.isContaining(p)))
    assert.equal(points.length, 100)
    assert.ok(points.every(p => polygon.isContaining(p)))
  })
})

// vim: set ts=2 sw=2 et:
