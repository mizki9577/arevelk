import React, { Component } from 'react'
import { Container } from 'flux/utils'
import { Col, Panel, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import appStore from '../stores/appStore'
import { act, ControlAction } from '../actions'

class TriangulationPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      n_vertices   : 3,
      radius       : 32,
      irregularity : 0,
      spikeyness   : 0,
    }
  }

  static getStores() {
    return [appStore]
  }

  static calculateState() {
    return {
      n_vertices   : appStore.get('n_vertices'),
      radius       : appStore.get('radius'),
      irregularity : appStore.get('irregularity'),
      spikeyness   : appStore.get('spikeyness'),
    }
  }

  handleNumOfVerticesChanged(ev) {
    ControlAction.changeNumOfVertices(ev.target.value)
  }

  handleRadiusChanged(ev) {
    ControlAction.changeRadius(ev.target.value)
  }

  handleIrregularityChanged(ev) {
    ControlAction.changeIrregularity(ev.target.value)
  }

  handleSpikeynessChanged(ev) {
    ControlAction.changeSpikeyness(ev.target.value)
  }

  handleGeneratePolygon(ev) {
    const { n_vertices, radius, irregularity, spikeyness } = this.state
    ControlAction.generatePolygon(n_vertices, radius, irregularity, spikeyness)
  }

  render() {
    return (
      <Panel>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}><ControlLabel>Number of vertices</ControlLabel></Col>
            <Col sm={2}><FormControl type="number" min={3} value={this.state.n_vertices} onChange={::this.handleNumOfVerticesChanged} /></Col>
          </FormGroup>

          <FormGroup>
            <Col sm={2}><ControlLabel>Standard Radius</ControlLabel></Col>
            <Col sm={4}><FormControl type="range"  min={0} max={250} value={this.state.radius} onChange={::this.handleRadiusChanged} /></Col>
            <Col sm={2}><FormControl type="number" min={0} max={250} value={this.state.radius} onChange={::this.handleRadiusChanged} /></Col>
          </FormGroup>

          <FormGroup>
            <Col sm={2}><ControlLabel>Irregularity</ControlLabel></Col>
            <Col sm={4}><FormControl type="range"  min={0} max={1} step={0.01} value={this.state.irregularity} onChange={::this.handleIrregularityChanged} /></Col>
            <Col sm={2}><FormControl type="number" min={0} max={1} step={0.01} value={this.state.irregularity} onChange={::this.handleIrregularityChanged} /></Col>
          </FormGroup>

          <FormGroup>
            <Col sm={2}><ControlLabel>Spikeyness</ControlLabel></Col>
            <Col sm={4}><FormControl type="range"  min={0} max={1} step={0.01} value={this.state.spikeyness} onChange={::this.handleSpikeynessChanged} /></Col>
            <Col sm={2}><FormControl type="number" min={0} max={1} step={0.01} value={this.state.spikeyness} onChange={::this.handleSpikeynessChanged} /></Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={2}><Button bsStyle="primary" onClick={::this.handleGeneratePolygon} >Generate</Button></Col>
          </FormGroup>
        </Form>
      </Panel>
    )
  }
}

export default Container.create(TriangulationPanel)

// vim: set ts=2 sw=2 et:
