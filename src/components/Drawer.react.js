import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store'
import { act } from '../actions'

class Drawer extends Component {
  static getStores() {
    return [store]
  }

  static calculateState(prevState) {
    return {
      points     : store.get('points'),
      numOfPoints: store.get('numOfPoints'),
    }
  }

  render() {
    const children = [
      ...this.state.points.take(this.state.numOfPoints)
                          .map((p, k) => <circle key={k} cx={p.get(0)} cy={p.get(1)} r={1} />)
    ]

    return (
      <svg width={500} height={500} viewBox="-250 -250 500 500" style={{fill: 'none', stroke: 'black'}}>
        {children}
      </svg>
    )
  }
}

export default Container.create(Drawer)

// vim: set ts=2 sw=2 et:
