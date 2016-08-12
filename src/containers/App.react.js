import React, { Component } from 'react'
import { Container } from 'flux/utils'

import appStore from '../stores/appStore'

class App extends Component {
  static getStores() {
    return [appStore]
  }

  static calculateState(prevState) {
    return { }
  }

  render() {
    return (
      <div />
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
