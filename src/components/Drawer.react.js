import React, { Component } from 'react'
import { Container } from 'flux/utils'

import appStore from '../stores/appStore'
import { act } from '../actions'

class Drawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polygon: [],
    }
  }

  static getStores() {
    return [appStore]
  }

  static calculateState(prevState) {
    return {
      polygon: appStore.get('polygon'),
    }
  }

  render() {
    const children = [<polygon key="root" points={this.state.polygon.map(v => v.join(',')).join(' ')} />]

    return (
      <svg width={500} height={500} viewBox="-250 -250 500 500" style={{fill: 'none', stroke: 'black'}}>
        {children}
      </svg>
    )
  }
}

export default Container.create(Drawer)

// vim: set ts=2 sw=2 et:
