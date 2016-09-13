import { times } from 'lodash'
import { List } from 'immutable'
import dispatcher from './dispatcher'
import appStore from './stores/appStore'

import { createRandomPolygon, generateRandomPoints, delaunayTriangulate, generateRandomPoint } from './functions'

export const act = {
  INCREASE_NUM_OF_POINTS   : 'INCREASE_NUM_OF_POINTS',
  DECREASE_NUM_OF_POINTS   : 'DECREASE_NUM_OF_POINTS',
}

export class ControlAction {
  static changeNumOfPoints(numOfPoints) {
    let points = appStore.get('points')

    if (points.size < numOfPoints) {
      points = points.push(...times(numOfPoints - points.size, () => List(generateRandomPoint(-250, 250, -250, 250))))

      dispatcher.dispatch({
        type: act.INCREASE_NUM_OF_POINTS,
        numOfPoints, points,
      })
    } else {
      dispatcher.dispatch({
        type: act.DECREASE_NUM_OF_POINTS,
        numOfPoints,
      })
    }
  }
}

// vim: set ts=2 sw=2 et:
