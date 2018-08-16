import { themes, Color, Styler } from '@benzed/react'

/******************************************************************************/
// Exports
/******************************************************************************/

const theme = {
  ...themes.basic,
  primary: Color('darkorange'),
  fonts: {
    title: 'Arial Black',
    body: 'Helvetica'
  }
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
