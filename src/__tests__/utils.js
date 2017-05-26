// @flow
import test from 'ava'
import * as utils from '../utils.js'

test('isUnique', t => {
  t.true(utils.isUnique([0, 1, 2, 3], 2, (a, b) => a === b))
  t.false(utils.isUnique([0, 2, 2, 3], 2, (a, b) => a === b))
})

test('partition', t => {
  t.deepEqual(
    utils.partition([0, 1, 2, 3, 4, 5, 6, 7], n => n % 3),
    {
      0: [0, 3, 6],
      1: [1, 4, 7],
      2: [2, 5],
    },
  )
})

// vim: set ts=2 sw=2 et:
