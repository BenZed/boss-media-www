import { themes, Color, Styler } from '@benzed/react'

/******************************************************************************/
// Exports
/******************************************************************************/

const theme = {
  ...themes.basic,
  primary: Color('#e05a15'),
  fonts: {
    title: '"Arial Black", Helvetica',
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
