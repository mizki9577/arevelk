// @flow
import React from 'react'

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

  initalizePolygons(numberOfSplits: number): Polygon[] {
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
      console.group()

      const splitting_polygon = randomChoice(polygons, true)

      const edges = splitting_polygon.getEdges()
      const edge1 = randomChoice(edges, true)
      const edge2 = randomChoice(edges, true)

      const point1 = randomChoice(edge1.getPointsOnGrids())
      const point2 = randomChoice(edge2.getPointsOnGrids())

      console.log('splitting_polygon: ', splitting_polygon.vertices.map(v => `[${v.x}, ${v.y}]`).join(', '))
      console.log('edge1:', edge1.points.map(p => `[${p.x}, ${p.y}]`).join(', '))
      console.log('edge2:', edge2.points.map(p => `[${p.x}, ${p.y}]`).join(', '))
      console.log(`point1: [${point1.x}, ${point1.y}]`)
      console.log(`point2: [${point2.x}, ${point2.y}]`)

      console.group()

      let i = (splitting_polygon.vertices.indexOf(edge2.points[1]) + 1) % splitting_polygon.vertices.length
      const polygon1_vertices = [edge1.points[0], point1, point2, edge2.points[1]]
      console.log('polygon1_vertices:', polygon1_vertices.map(v => `[${v.x}, ${v.y}]`).join(', '))
      if (polygon1_vertices[0] === polygon1_vertices[polygon1_vertices.length-1]) {
        polygon1_vertices.splice(-1, 1)
      } else while (splitting_polygon.vertices[i] !== edge1.points[0]) {
        console.log(`i: ${i}`)
        console.log('adding:', splitting_polygon.vertices[i])
        polygon1_vertices.push(splitting_polygon.vertices[i])
        i = (i + 1) % splitting_polygon.vertices.length
      }

      console.groupEnd()
      console.group()

      let j = (splitting_polygon.vertices.indexOf(edge1.points[1]) + 1) % splitting_polygon.vertices.length
      const polygon2_vertices = [edge2.points[0], point2, point1, edge1.points[1]]
      console.log('polygon2_vertices:', polygon2_vertices.map(v => `[${v.x}, ${v.y}]`).join(', '))
      if (polygon2_vertices[0] === polygon2_vertices[polygon2_vertices.length-1]) {
        polygon2_vertices.splice(-1, 1)
      } else while (splitting_polygon.vertices[j] !== edge2.points[0]) {
        console.log(`j: ${j}`)
        console.log('adding:', splitting_polygon.vertices[j])
        polygon2_vertices.push(splitting_polygon.vertices[j])
        j = (j + 1) % splitting_polygon.vertices.length
      }

      console.groupEnd()

      polygons.push(new Polygon(polygon1_vertices), new Polygon(polygon2_vertices))

      console.groupEnd()
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

export default Arevelk

// vim: set ts=2 sw=2 et:
