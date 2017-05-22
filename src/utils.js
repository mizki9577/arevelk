// @flow

export const randomChoice = (array: any[], destructive: boolean=false) => {
  if (array.length === 0) throw 'given array was empty.'
  const i = Math.floor(Math.random() * array.length)
  if (destructive) return array.splice(i, 1)[0]
  return array[i]
}

export const orderedRandomPull = (array: any[], size: number) => {
  if (array.length === 0) throw 'given array was empty.'
  if (array.length < size) throw 'too big size is given.'

  const indexes = []

  while (indexes.length < size) {
    const i = Math.floor(Math.random() * array.length)
    if (!indexes.includes(i)) {
      indexes.push(i)
    }
  }
  indexes.sort((a, b) => a - b)

  const results = []
  for (let i = 0; i < size; ++i) {
    results.push(array.splice(indexes[i] - i, 1)[0])
  }

  return results
}

// vim: set ts=2 sw=2 et:
