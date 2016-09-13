import assert from 'assert'
import fs from 'fs'
import Polygon from '../src/Polygon'
import { delaunayTriangulate, createRandomPolygon, generateRandomPoints } from '../src/functions'

describe('delaunayTriangulate()', () => {
  it('returns delaunay triangulation of given points', () => {
    {
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
    }

    {
      const actual = delaunayTriangulate([
        [ -62, -108 ],
        [ 62, -108 ],
        [ 125, -0 ],
        [ 62, 108 ],
        [ -62, 108 ],
        [ -125, 0 ]
      ]).map(t => t.vertices)

      console.log(actual)

      fs.writeFileSync('hoge.svg', `<?xml version="1.0" ?>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -150 200 300" fill="none" stroke="black" stroke-width="0.5">
        ${actual.map(vs => `<polygon points="${vs.map(v => v.join(',')).join(' ')}" />`).join('\n')}
        </svg>`)

      const expected = [
      ]

      assert.deepEqual(actual, expected)
    }
  })
})

describe('generateRandomPoints()', () => {
  it('returns random points which satisfies given condition', () => {
    const polygon = new Polygon([[0, 0], [2, 4], [4, 0]])
    const points = generateRandomPoints(100, polygon)
    assert.equal(points.length, 100)
    assert.ok(points.every(p => polygon.isContaining(p)))
  })
})

// vim: set ts=2 sw=2 et:
