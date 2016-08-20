import assert from 'assert'
import Polygon from '../../src/triangulate/Polygon'

describe('Polygon', () => {
  const polygon = new Polygon([[4, 4], [4, 0], [0, 0], [0, 4]])

  describe('#vertices', () => {
    it('should be sorted counterclockwise', () => {
      assert.deepEqual(polygon.vertices, [[0, 0], [4, 0], [4, 4], [0, 4]])
    })
  })

  describe('#edges', () => {
    it('should be represent edges', () => {
      assert.deepEqual(polygon.edges, [[[0, 0], [4, 0]], [[4, 0], [4, 4]], [[4, 4], [0, 4]], [[0, 4], [0, 0]]])
    })
  })

  describe('#getCenter()', () => {
    it('returns the center of polygon', () => {
      assert.deepEqual(polygon.getCenter(), [2, 2])
    })
  })

  describe('#triangulate()', () => {
    it('returns delaunay triangulation of polygon', () => {
      const actual = polygon.triangulate([[1, 1], [2, 3], [3, 2]]).map(t => t.vertices)
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
})

// vim: set ts=2 sw=2 et:
