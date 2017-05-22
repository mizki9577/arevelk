// @flow
class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  isEqual(other: Point) {
    return this.x === other.x && this.y === other.y
  }
}

export default Point

// vim: set ts=2 sw=2 et:
