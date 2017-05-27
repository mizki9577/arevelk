// TODO: flow
import React from 'react'

type Props = {
  x: number,
  y: number,
  width: number,
  height: number,
  r: ?number,
  className: ?string,
}

const Grid = ({ x, y, width, height, r=0.1, className='' }: Props) => {
  const grid = []
  for (let i = 0; i < width; ++i) for (let j = 0; j < height; ++j) {
    grid.push(<circle key={ `grid${i},${j}` } cx={ i } cy={ j } r={ r } />)
  }
  return <g className={ className }>{ grid }</g>
}

export default Grid

// vim: set ts=2 sw=2 et:
