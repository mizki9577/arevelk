// @flow
import test from 'ava'
import * as utils from '../utils.js'

test('isUnique', t => {
  t.true(utils.isUnique([0, 1, 2, 3], 2, (a, b) => a === b))
  t.false(utils.isUnique([0, 2, 2, 3], 2, (a, b) => a === b))
})

// vim: set ts=2 sw=2 et:
