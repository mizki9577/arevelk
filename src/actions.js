import dispatcher from './dispatcher'

import { createRandomPolygon, generateRandomPoints, delaunayTriangulate } from './functions'

export const act = {
  CHANGE_NUM_OF_VERTICES : 'CHANGE_NUM_OF_VERTICES',
  CHANGE_RADIUS          : 'CHANGE_RADIUS',
  CHANGE_IRREGULARITY    : 'CHANGE_IRREGULARITY',
  CHANGE_SPIKEYNESS      : 'CHANGE_SPIKEYNESS',
  CHANGE_NUM_OF_POINTS   : 'CHANGE_NUM_OF_POINTS',
  GENERATE_POLYGON       : 'GENERATE_POLYGON',
  TRIANGULATE            : 'TRIANGULATE',
}

export const ControlAction = {
  generatePolygon(n_vertices, radius, irregularity, spikeyness) {
    const polygon = createRandomPolygon(n_vertices, radius, irregularity, spikeyness)
    dispatcher.dispatch({
      type: act.GENERATE_POLYGON,
      value: polygon
    })
  },

  triangulate(n_points, polygon) {
    const points = generateRandomPoints(n_points, polygon)
    const triangles = delaunayTriangulate(points.concat(polygon.vertices))
    dispatcher.dispatch({
      type: act.TRIANGULATE,
      value: triangles,
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
