import React from 'react'
import { Grid, Row, Navbar, Jumbotron, Panel, Button } from 'react-bootstrap'

import ControlPanel from './ControlPanel.react'

const App = () => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Arevelk</Navbar.Brand>
      </Navbar.Header>
    </Navbar>

    <Grid>
      <Row>
        <Jumbotron>
        </Jumbotron>
      </Row>

      <Row>
        <ControlPanel />
      </Row>
    </Grid>
  </div>
)

export default App

// vim: set ts=2 sw=2 et:
