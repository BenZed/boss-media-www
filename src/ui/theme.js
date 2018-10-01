import { themes, Color, Styler } from '@benzed/react'

/******************************************************************************/
// Exports
/******************************************************************************/

const theme = {
  ...themes.basic,
  primary: Color('darkorange'),
  baseZ: 100,
  fonts: {
    title: 'Arial Black',
    body: 'Helvetica'
  },
  time: 400
}

const $ = Styler.createInterface(theme)

/******************************************************************************/
// Exports
/******************************************************************************/

export default $

export {
  theme,
  $
}
