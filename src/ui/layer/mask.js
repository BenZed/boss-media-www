import { Store } from '@benzed/react'
import { Vector } from '@benzed/math'

import is from 'is-explicit'

/******************************************************************************/
// TODO move this to @benzed/math
/******************************************************************************/

function isEven (num) {

  if (this !== undefined)
    num = this

  return num % 2 === 0

}

/******************************************************************************/
// Helper
/******************************************************************************/

function toVectors () {

  const points = this

  const vectors = []
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i]
    const y = points[i + 1]

    const vector = new Vector(x, y)
    vectors.push(vector)
  }

  return vectors

}

/******************************************************************************/
// Main
/******************************************************************************/

class Mask extends Store {

  vectors = []

  // constructor () {
  //   super()
  // }

  push (points) {
    if (!is.arrayOf.number(points))
      throw new Error('Must be an array of axes.')

    if (!points.length::isEven())
      throw new Error('Must be an even number of axes.')

    const vectors = points::toVectors()

    this.set('vectors', vectors)

  }

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default Mask
