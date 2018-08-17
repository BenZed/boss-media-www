import React from 'react'

import { Portal, Cloner } from '@benzed/react'
import { PropTypeSchema, typeOf } from '@benzed/schema'

/******************************************************************************/
// Data
/******************************************************************************/

const FORE_LAYER_ID = 'foreground'

const BACK_LAYER_ID = 'background'

/******************************************************************************/
// Main Component
/******************************************************************************/

const LayerPortal = ({ children, fore }) => {

  return [
    <Portal targetId={FORE_LAYER_ID}>
      <Cloner fore>{children}</Cloner>
    </Portal>,
    <Portal targetId={BACK_LAYER_ID}>
      <Cloner fore={false}>{children}</Cloner>
    </Portal>
  ]

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default LayerPortal

export { BACK_LAYER_ID, FORE_LAYER_ID }
