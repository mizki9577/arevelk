import React, { Component } from 'react'
import { Col, Panel, Tabs, Tab, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const ControlPanel = () => (
  <Tabs id="controlpanel">
    <Tab eventKey={1} title="Polygon">
      <Panel>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Number of vertices</ControlLabel>
            </Col>
            <Col sm={2}>
              <FormControl type="number" min="3" defaultValue="3" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={2}>
              <Button bsStyle="primary">Generate</Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    </Tab>

    <Tab eventKey={2} title="Points">
      <Panel>
      </Panel>
    </Tab>

    <Tab eventKey={3} title="Dividing">
      <Panel>
      </Panel>
    </Tab>

    <Tab eventKey={4} title="Annealing">
      <Panel>
      </Panel>
    </Tab>
  </Tabs>
)

export default ControlPanel

// vim: set ts=2 sw=2 et:
