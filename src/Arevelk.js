// @flow
import React from 'react'

import Polygon from './Polygon.js'
import Edge from './Edge.js'

class Arevelk extends React.Component {
  state: {
    isRunning: boolean,
    width: number,
    height: number,
    numberOfSplits: number,
    polygons: Polygon[],
  }

  constructor() {
    super()

    this.state = {
      isRunning: false,
      width: 101,
      height: 65,
      numberOfSplits: 8,
      polygons: frame.randomSplit(8)
    }
  }

  handleToggleRunning() {
    this.setState({ isRunning: !this.state.isRunning })
  }

  handleReset() {
    this.setState({ polygons: frame.randomSplit(this.state.numberOfSplits) })
  }

  handleNumberOfPointsChange(ev: SyntheticInputEvent) {
    this.setState({ numberOfSplits: Number(ev.target.value) })
  }

  render() {
    return (
      <div>
        <svg width={ 800 } height={ 600 } viewBox={ `-1 -1 103 67` }>
          <g>{ grid }</g>
          { this.state.polygons.map((p, i) => <polygon key={ i } points={ p.vertices.map(({ x, y }) => `${ x },${ y }`).join(' ') } />) }
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

const grid = []
for (let x = 0; x < 101; ++x) for (let y = 0; y < 65; ++y) {
  grid.push(<circle className="grid" key={ `grid${x},${y}` } cx={ x } cy={ y } r={ 0.1 } />)
}

const frame = new Polygon([
  { x:   0, y:  0 },
  { x: 100, y:  0 },
  { x: 100, y: 64 },
  { x:   0, y: 64 },
])

export default Arevelk

// vim: set ts=2 sw=2 et:
