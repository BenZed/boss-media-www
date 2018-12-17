import { css } from 'styled-components'
import media from './media'

import { FULL_MULT, DESK_MULT, TAB_MULT, MINI_MULT } from '../constants'
/******************************************************************************/
// main
/******************************************************************************/

const _16x9 = (mult = 1, units = 'em') => css`

  width: ${16 * mult * FULL_MULT}${units};
  height: ${9 * mult * FULL_MULT}${units};

  ${media.desktop.css`
    width: ${16 * mult * DESK_MULT}${units};
    height: ${9 * mult * DESK_MULT}${units};
  `}

  ${media.tablet.css`
    width: ${16 * mult * TAB_MULT}${units};
    height: ${9 * mult * TAB_MULT}${units};
  `}

  ${media.phone.css`
    width: ${16 * mult * MINI_MULT}${units};
    height: ${9 * mult * MINI_MULT}${units};
  `}
`

/******************************************************************************/
// Exports
/******************************************************************************/

export default _16x9
