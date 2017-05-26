// @flow
import React from 'react'

import Polygon from './Polygon.js'
import Edge from './Edge.js'
import Point from './Point.js'
import { randomDelaunayTriangulation } from './utils.js'
import Grid from './Grid.js'

const WIDTH = 101
const HEIGHT = 65

class Arevelk extends React.Component {
  state: {
    isRunning: boolean,
    width: number,
    height: number,
    numberOfSplits: number,
    polygons: $Subtype<Polygon>[],
  }

  constructor() {
    super()

    this.state = {
      isRunning: false,
      width: WIDTH,
      height: HEIGHT,
      numberOfSplits: 0,
      polygons: randomDelaunayTriangulation(frame, 0),
    }
  }

  handleToggleRunning() {
    this.setState({ isRunning: !this.state.isRunning })
  }

  handleReset() {
    this.setState({ polygons: randomDelaunayTriangulation(frame, this.state.numberOfSplits) })
  }

  handleNumberOfPointsChange(ev: SyntheticInputEvent) {
    this.setState({ numberOfSplits: Number(ev.target.value) })
  }

  render() {
    return (
      <div>
        <svg width={ 1200 } height={ 800 } viewBox={ `${ -this.state.width / 2 } ${ -this.state.height / 2 } ${ this.state.width * 2 } ${ this.state.height * 2 }` }>
          <Grid className="grid" x={ 0 } y={ 0 } width={ this.state.width } height={ this.state.height } />
          { this.state.polygons.map((p, i) => <polygon key={ i } points={ p.map(({ x, y }) => `${ x },${ y }`).join(' ') } />) }
        </svg>

        <div className="column">
          <div className="row">
            <button onClick={ () => this.handleToggleRunning() }>{ this.state.isRunning ? 'pause' : 'run' }</button>
          </div>

          <div className="row">
            <label>number of points: <input type="number" min={ 0 } max={ 1024 } value={ this.state.numberOfSplits } step={ 1 } onChange={ ev => this.handleNumberOfPointsChange(ev) } /></label>
            <button onClick={ () => this.handleReset() }>reset</button>
          </div>
        </div>
      </div>
    )
  }
}

const frame = new Polygon(
  new Point(        0,          0),
  new Point(WIDTH - 1,          0),
  new Point(WIDTH - 1, HEIGHT - 1),
  new Point(        0, HEIGHT - 1),
)


export default Arevelk

// vim: set ts=2 sw=2 et:
