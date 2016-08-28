import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import PolygonPanel from './PolygonPanel.react'

const ControlPanel = () => (
  <Tabs id="controlpanel">
    <Tab eventKey={1} title="Polygon">
      <PolygonPanel />
    </Tab>

    <Tab eventKey={2} title="Points">
    </Tab>

    <Tab eventKey={3} title="Dividing">
    </Tab>

    <Tab eventKey={4} title="Annealing">
    </Tab>
  </Tabs>
)

export default ControlPanel

// vim: set ts=2 sw=2 et:
