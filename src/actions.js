import dispatcher from './dispatcher'

import { createRandomPolygon } from './functions'

export const act = {
  CHANGE_NUM_OF_VERTICES : 'CHANGE_NUM_OF_VERTICES',
  CHANGE_RADIUS          : 'CHANGE_RADIUS',
  CHANGE_IRREGULARITY    : 'CHANGE_IRREGULARITY',
  CHANGE_SPIKEYNESS      : 'CHANGE_SPIKEYNESS',
  GENERATE_POLYGON       : 'GENERATE_POLYGON',
}

export const ControlAction = {
  generatePolygon(n_vertices, radius, irregularity, spikeyness) {
    dispatcher.dispatch({
      type: act.GENERATE_POLYGON,
      value: createRandomPolygon(n_vertices, radius, irregularity, spikeyness),
    })
  },

  changeNumOfVertices(value) {
    dispatcher.dispatch({
      type: act.CHANGE_NUM_OF_VERTICES,
      value,
    })
  },

  changeRadius(value) {
    dispatcher.dispatch({
      type: act.CHANGE_RADIUS,
      value,
    })
  },

  changeIrregularity(value) {
    dispatcher.dispatch({
      type: act.CHANGE_IRREGULARITY,
      value,
    })
  },

  changeSpikeyness(value) {
    dispatcher.dispatch({
      type: act.CHANGE_SPIKEYNESS,
      value,
    })
  },
}

// vim: set ts=2 sw=2 et:
