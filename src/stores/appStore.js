import Immutable from 'immutable'
import { MapStore } from 'flux/utils'

import dispatcher from '../dispatcher'
import { act } from '../actions'

class AppStore extends MapStore {
  getInitialState() {
    return Immutable.Map([
      ['polygon',        null],
      ['n_vertices',     3   ],
      ['radius',         1   ],
      ['irregularity',   0   ],
      ['spikeyness',     0   ],
    ])
  }

  reduce(state, action) {
    switch (action.type) {
      case act.CHANGE_NUM_OF_VERTICES:
        return state.set('n_vertices', action.value)

      case act.CHANGE_RADIUS:
        return state.set('radius', action.value)

      case act.CHANGE_IRREGULARITY:
        return state.set('irregularity', action.value)

      case act.CHANGE_SPIKEYNESS:
        return state.set('spikeyness', action.value)

      case act.GENERATE_POLYGON:
        return state.set('polygon', action.value)

      default:
        return state
    }
  }
}

export default new AppStore(dispatcher)

// vim: set ts=2 sw=2 et:
