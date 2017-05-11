import { createElement } from 'react'
import { oneOfType, string, bool, number, oneOf, func } from 'prop-types'

import classNames from 'classnames'
import { variables } from 'ui/styles'

import Hidable from './_Hidable'
import Shaded from './_Shaded'

/******************************************************************************/
// Constants
/******************************************************************************/

const TOP = /top|T/,
  RIGHT = /right|R/,
  LEFT = /left|L/,
  BOTTOM = /bottom|B/,
  AUTO = /auto|A/

const ROW = /row|R/,
  COLUMN = /column|C/,
  WRAP = /wrap|W/,
  START = /start|S/,
  END = /end|E/,
  CENTER = /center|C/,
  STRETCH = /stretch|T/

/******************************************************************************/
// Helper
/******************************************************************************/
function directionable(key, value, allowAuto = false) {

  return !value
    ? null
    : value === true
      ? key
      : {
        [key + '-top']: TOP.test(value),
        [key + '-right']: RIGHT.test(value),
        [key + '-left']: LEFT.test(value),
        [key + '-bottom']: BOTTOM.test(value),
        [key + '-auto']: AUTO.test(value) && allowAuto
      }
}

function flexible(value) {
  if (!is(value, String, Number))
    return null

  if (is(value, Number))
    throw new Error('child flex shrink/grow not yet implemented')

  else return {
    'flex-row': ROW.test(value),
    'flex-column': COLUMN.test(value),
    'flex-wrap': WRAP.test(value),
    'flex-align-start': START.test(value),
    'flex-align-end': END.test(value),
    'flex-align-center': CENTER.test(value),
    'flex-align-stretch': STRETCH.test(value)
  }
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default function Block({children, className, classes, padded, margin,
  brand, shaded, shadow, show, hide, component, height, width, disabled, style,
  inline, time, flex, dom, ...other}, context) {

  const hidden = hide || !show

  if (!is(time) && hidden)
    return null

  if (is(className))
    throw new Error('Do not use the \'className\' prop. It\'s bad. Use \'classes\' instead')

  const createsShade = is(shaded, String)
  const takesShade = !createsShade && !!shaded
  const shade =
      createsShade ? shaded
    : takesShade ? context.shaded
    : null

  const classesComposed = classNames(classes, brand,
    directionable('padded', padded),
    directionable('margin', margin, true),
    flexible(flex),
    {
      [shade]: is(shaded),
      disabled,
      shadow,
      inline,
      'wide': width === true,
      'high': height === true
    }) || null //in case of empty string so there are no empty class attributes in html

  style = is(height, String, Number) || is(width, String, Number)
    ? { height, width, ...style || {}}
    : style

  const props = {
    ...other,
    ref: dom,
    style,
    className: classesComposed
  }

  let next = component

  if (time || createsShade)
    props.component = component

  //iffy about this
  if (time) {
    props.time = is(time, Number) ? time : variables.time.value * 0.5
    props.hidden = hidden
    next = Hidable
  }

  //and this. I'd like to come up with an elegant way to have infinite 'mixin' components
  if (createsShade) {
    props.shaded = shaded
    next = Shaded
  }

  const element = createElement(next, props, children)
  return element
}

Block.defaultProps = {
  component: 'div',
  show: true,
  hide: false
}

Block.propTypes = {
  component: oneOfType([string, func]),
  padded: oneOfType([string, bool]),
  margin: oneOfType([string, bool]),
  height: oneOfType([string, bool, number]),
  width: oneOfType([string, bool, number]),
  disabled: bool,
  shaded: oneOfType([string, bool]),
  shadow: bool,
  show: bool,
  hide: bool,
  brand: oneOf(['neutral', 'success', 'error', 'warning'])
}

Block.contextTypes = {
  shaded: string
}
