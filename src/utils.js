// @flow

export const randomChoice = (array: any[], destructive: boolean=false) => {
  const i = Math.floor(Math.random() * array.length)
  if (destructive) return array.splice(i, 1)[0]
  return array[i]
}

// vim: set ts=2 sw=2 et:
