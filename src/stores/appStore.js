import Immutable from 'immutable'
import { MapStore } from 'flux/utils'

import dispatcher from '../dispatcher'

class AppStore extends MapStore {
  getInitialState() {
    return Immutable.Map()
  }

  reduce(state, action) {
    switch (action.type) {
      default:
        return state
    }
  }
}

export default new AppStore(dispatcher)

// vim: set ts=2 sw=2 et:
