import React from 'react'
import { render } from 'react-dom'

import App from './components/App.react'

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('app'))
})

// vim: set ts=2 sw=2 et:
