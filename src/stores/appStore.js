import Immutable from 'immutable'
import { MapStore } from 'flux/utils'

import dispatcher from '../dispatcher'
import { act } from '../actions'

class AppStore extends MapStore {
  getInitialState() {
    return Immutable.fromJS({
      numOfPoints: 0,
      points     : [],
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case act.INCREASE_NUM_OF_POINTS:
        return state.set('numOfPoints', action.numOfPoints)
                    .set('points',      action.points)

      case act.DECREASE_NUM_OF_POINTS:
        return state.set('numOfPoints', action.numOfPoints)

      default:
        return state
    }
  }
}

export default new AppStore(dispatcher)

// vim: set ts=2 sw=2 et:
