import React, { Component } from 'react'
import { Container } from 'flux/utils'
import { Col, Panel, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import appStore from '../stores/appStore'
import { act, ControlAction } from '../actions'

class PointsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numOfPoints: 0,
      polygon: null,
    }
  }

  static getStores() {
    return [appStore]
  }

  static calculateState() {
    return {
      numOfPoints: appStore.get('numOfPoints'),
      polygon    : appStore.get('polygon'),
    }
  }

  handleNumOfPointsChanged(ev) {
    ControlAction.changeNumOfPoints(ev.target.value)
  }

  handleGeneratePoints(ev) {
    ControlAction.generatePoints(this.state.numOfPoints, this.state.polygon)
  }

  render() {
    return (
      <Panel>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}><ControlLabel>Number of points</ControlLabel></Col>
            <Col sm={4}><FormControl type="range" value={this.state.numOfPoints} onChange={::this.handleNumOfPointsChanged} /></Col>
            <Col sm={2}><FormControl type="number" value={this.state.numOfPoints} onChange={::this.handleNumOfPointsChanged} /></Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={2}><Button bsStyle="primary" onClick={::this.handleGeneratePoints} >Generate</Button></Col>
          </FormGroup>
        </Form>
      </Panel>
    )
  }
}

export default Container.create(PointsPanel)

// vim: set ts=2 sw=2 et:
