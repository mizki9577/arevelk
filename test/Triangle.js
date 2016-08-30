import assert from 'assert'
import Triangle from '../src/Triangle'

describe('Triangle', () => {
  const triangle = new Triangle([0, 0], [2, 4], [4, 0])

  describe('#isContainInCircumcircle()', () => {
    it('returns true when the point lies in the circumcircle', () => {
      const point = [3.6, 3.0]
      assert(triangle.isContainInCircumcircle(point))
    })

    it('returns false when the point does not lie in the circumcircle', () => {
      const point = [4, 4]
      assert(!triangle.isContainInCircumcircle(point))
    })
  })

  describe('#createFromPointAndEdge()', () => {
    it('returns a triangle which has given edge and vertex', () => {
      const point = [3, 3]
      const edge = [[0, 2], [1, 1]]
      const created = Triangle.createFromPointAndEdge(point, edge)
      assert.deepEqual(created.vertices, [[1, 1], [3, 3], [0, 2]])
    })
  })
})

// vim: set ts=2 sw=2 et:
