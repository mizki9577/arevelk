import React, { Component } from 'react'
import { Container } from 'flux/utils'

import appStore from '../stores/appStore'
import { act } from '../actions'

class Drawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polygon: null,
      points : [],
    }
  }

  static getStores() {
    return [appStore]
  }

  static calculateState(prevState) {
    return {
      polygon: appStore.get('polygon'),
      points : appStore.get('points'),
    }
  }

  render() {
    const children = []
    if (this.state.polygon !== null) {
      children.push(<polygon key="root" points={this.state.polygon.vertices.map(v => v.join(',')).join(' ')} />)
    }
    children.push(...this.state.points.map(p => <circle r={1} cx={p[0]} cy={p[1]} />))

    return (
      <svg width={500} height={500} viewBox="-250 -250 500 500" style={{fill: 'none', stroke: 'black'}}>
        {children}
      </svg>
    )
  }
}

export default Container.create(Drawer)

// vim: set ts=2 sw=2 et:
