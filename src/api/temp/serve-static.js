import express from '@feathersjs/express'

/******************************************************************************/
// Main
/******************************************************************************/

const serveStatic = ({ src }) => {

  return app => {

    app.log`temporary serveStatic middleware added until <express-ui/> entity is complete`

    app.use(express.static(src))

  }

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default serveStatic
