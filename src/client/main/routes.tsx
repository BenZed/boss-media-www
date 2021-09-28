import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'

/*** Routes Component ***/

const Routes = (): ReactElement =>

    <Switch>
        <Route path='/' render={(): ReactElement => <h1>Home</h1>} />
    </Switch>

/*** Exports ***/

export default Routes

export {
    Routes
}