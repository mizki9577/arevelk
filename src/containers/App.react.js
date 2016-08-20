import React, { Component } from 'react'
import { Container } from 'flux/utils'
import { Grid, Row, Navbar, Jumbotron, Panel, Button } from 'react-bootstrap'

import ControlPanel from '../components/ControlPanel.react'

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
            <Panel>
              <Button bsStyle="danger">Reset</Button>
            </Panel>
          </Row>

          <Row>
            <ControlPanel />
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
