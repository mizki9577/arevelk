// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import Polygon from './Polygon.js'
import Edge from './Edge.js'

import { randomChoice } from './utils.js'

class Arevelk extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isRunning: false,
      width: 101,
      height: 65,
      numberOfSplits: 8,
    }
    this.state.polygons = this.initalizePolygons(this.state.numberOfSplits)
  }

  initalizePolygons(numberOfSplits) {
    /* Polygon#vertices は必ず時計回りで格納する
     * したがって Edge#points[1] は [0] よりも時計回りの方向に進んだ側を指す
     */

    const polygons = [
      new Polygon([
        { x:   0, y:  0 },
        { x: 100, y:  0 },
        { x: 100, y: 64 },
        { x:   0, y: 64 },
      ]),
    ]

    for (let _ = 0; _ < numberOfSplits; ++_) {
      const splitting_polygon = randomChoice(polygons, true)

      const edges = splitting_polygon.getEdges()
      const edge1 = randomChoice(edges, true)
      const edge2 = randomChoice(edges, true)

      const point1 = randomChoice(edge1.getPointsOnGrids())
      const point2 = randomChoice(edge2.getPointsOnGrids())

      let i = (splitting_polygon.vertices.indexOf(edge2.points[1]) + 1) % splitting_polygon.vertices.length
      const polygon1_vertices = [edge1.points[0], point1, point2, edge2.points[1]]
      while (splitting_polygon.vertices[i] !== edge1.points[0]) {
        polygon1_vertices.push(splitting_polygon.vertices[i])
        i = (i + 1) % splitting_polygon.vertices.length
      }

      let j = (splitting_polygon.vertices.indexOf(edge1.points[1]) + 1) % splitting_polygon.vertices.length
      const polygon2_vertices = [edge2.points[0], point2, point1, edge1.points[1]]
      while (splitting_polygon.vertices[j] !== edge1.points[0]) {
        polygon1_vertices.push(splitting_polygon.vertices[j])
        j = (j + 1) % splitting_polygon.vertices.length
      }

      polygons.push(new Polygon(polygon1_vertices), new Polygon(polygon2_vertices))
    }

    return polygons
  }

  handleToggleRunning() {
    this.setState({ isRunning: !this.state.isRunning })
  }

  handleReset() {
    this.setState({ polygons: this.initalizePolygons(this.state.numberOfSplits) })
  }

  handleNumberOfPointsChange(ev) {
    this.setState({ numberOfSplits: ev.target.value })
  }

  render() {
    return (
      <div>
        <svg width={ 800 } height={ 600 } viewBox={ `-1 -1 103 67` }>
          { grid }
          { this.state.polygons.map((p, i) => <polyline key={ i } points={ p.vertices.map(({ x, y }) => `${ x },${ y }`).join(' ') } />) }
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

ReactDOM.render(
  <Arevelk />,
  document.getElementById('root')
)

// vim: set ts=2 sw=2 et:
