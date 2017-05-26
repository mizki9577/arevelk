// @flow
import React from 'react'

export default ({ x, y, width, height, r=0.1, className=null }) => {
  const grid = []
  for (let i = 0; i < width; ++i) for (let j = 0; j < height; ++j) {
    grid.push(<circle key={ `grid${i},${j}` } cx={ i } cy={ j } r={ r } />)
  }
  return <g className={ className }>{ grid }</g>
}

// vim: set ts=2 sw=2 et:
