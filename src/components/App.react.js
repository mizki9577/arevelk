import React from 'react'
import { Grid, Row, Navbar, Panel, Button } from 'react-bootstrap'

import Drawer from './Drawer.react'
import ControlPanel from './ControlPanel.react'

const App = () => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Arevelk</Navbar.Brand>
      </Navbar.Header>
    </Navbar>

    <Grid>
      <Row style={{textAlign: 'center'}}>
        <Drawer />
      </Row>

      <Row>
        <ControlPanel />
      </Row>
    </Grid>
  </div>
)

export default App

// vim: set ts=2 sw=2 et:
