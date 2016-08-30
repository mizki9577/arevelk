import dispatcher from './dispatcher'

import { createRandomPolygon, generateRandomPoints } from './functions'

export const act = {
  CHANGE_NUM_OF_VERTICES : 'CHANGE_NUM_OF_VERTICES',
  CHANGE_RADIUS          : 'CHANGE_RADIUS',
  CHANGE_IRREGULARITY    : 'CHANGE_IRREGULARITY',
  CHANGE_SPIKEYNESS      : 'CHANGE_SPIKEYNESS',
  CHANGE_NUM_OF_POINTS   : 'CHANGE_NUM_OF_POINTS',
  GENERATE_POLYGON       : 'GENERATE_POLYGON',
  GENERATE_POINTS        : 'GENERATE_POINTS',
}

export const ControlAction = {
  generatePolygon(n_vertices, radius, irregularity, spikeyness) {
    const polygon = createRandomPolygon(n_vertices, radius, irregularity, spikeyness)
    dispatcher.dispatch({
      type: act.GENERATE_POLYGON,
      value: polygon
    })
  },

  generatePoints(n_points, polygon) {
    const points = generateRandomPoints(n_points, polygon)
    dispatcher.dispatch({
      type: act.GENERATE_POINTS,
      value: points,
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

  changeNumOfPoints(value) {
    dispatcher.dispatch({
      type: act.CHANGE_NUM_OF_POINTS,
      value,
    })
  },
}

// vim: set ts=2 sw=2 et:
