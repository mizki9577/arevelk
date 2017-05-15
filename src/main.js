import React from 'react'
import ReactDOM from 'react-dom'

class Arevelk extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isRunning: false,
      width: 101,
      height: 65,
      numberOfPoints: 8,
    }
    this.state.triangles = this.triangulate(this.state.numberOfPoints)
  }

  split(numberOfPoints) {
    const points = []
    for (let x = 0; x < this.state.width; ++x) {
      points.push({ x, y: 0 }, { x, y: this.state.height - 1 })
    }
    for (let y = 0; y < this.state.width; ++y) {
      points.push({ x: 0, y }, { x: this.state.width - 1, y })
    }
  }

  handleToggleRunning() {
    this.setState({ isRunning: !this.state.isRunning })
  }

  handleReset() {
    const triangles = this.triangulate(this.state.numberOfPoints)
    this.setState({ triangles })
  }

  handleNumberOfPointsChange(ev) {
    this.setState({ numberOfPoints: ev.target.value })
  }

  render() {
    return (
      <div>
        <svg width={ 800 } height={ 600 } viewBox={ `-1 -1 103 67` }>
          { grid }
        </svg>

        <div className="column">
          <div className="row">
            <button onClick={ () => this.handleToggleRunning() }>{ this.state.isRunning ? 'pause' : 'run' }</button>
          </div>

          <div className="row">
            <label>number of points: <input type="number" min={ 0 } max={ 1024 } value={ this.state.numberOfPoints } step={ 1 } onChange={ ev => this.handleNumberOfPointsChange(ev) } /></label>
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

ReactDOM.render(
  <Arevelk />,
  document.getElementById('root')
)

// vim: set ts=2 sw=2 et:
