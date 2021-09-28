import React, { ReactElement } from 'react'

import Routes from './routes'

/*** Helper Types ***/

// TODO come up with a better name than "SSRData"
// TODO this should also probably be moved to util

/**
 * Data provided by the server on the page's first render.
 * As of this writing, there's no case where anything is actually 
 * provided, but it will be used for client-side error handling, rather
 * than having the server redirect to a different page.
 */
interface SSRData {
    [key: string]: unknown
}

function isSSRData(input: unknown): input is SSRData {
    return !!input && typeof input === 'object'
}

/*** Root Component ***/

interface RootProps {
    ssrData: SSRData
}

const Root = ({ ssrData }: RootProps): ReactElement =>
    <Routes />

/*** Exports ***/

export default Root

export {
    Root,
    RootProps,

    SSRData,
    isSSRData
}