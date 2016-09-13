import React, { Component } from 'react'
import { Panel, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap'
import { Container } from 'flux/utils'

import appStore from '../stores/appStore'
import { act, ControlAction } from '../actions'

class ControlPanel extends Component {
  static getStores() {
    return [appStore]
  }

  static calculateState() {
    return {
      numOfPoints: appStore.get('numOfPoints'),
    }
  }

  handleNumOfPointsChanged(ev) {
    ControlAction.changeNumOfPoints(ev.target.value)
  }

  render() {
    return (
      <Panel>
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Number of points</Col>
            <Col sm={4}>
              <FormControl type="number" value={this.state.numOfPoints} onChange={::this.handleNumOfPointsChanged} />
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    )
  }
}

export default Container.create(ControlPanel)

// vim: set ts=2 sw=2 et:
