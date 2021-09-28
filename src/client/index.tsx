/* Webpack Loader Imports */

import 'normalize.css'

import { isSSRData, SSRData } from './main/root'

/* Dynamic Imports for webpack output chunking */

const dependencies = Promise.all([
    import('react'),
    import('react-dom'),
    import('react-router-dom'),
    import('./main')
] as const)

/* Helper */

function getServerSideRenderedData(): SSRData {

    const SSR_DATA_TAG_ID = 'boss-media-www-ssr'

    try {
        const jsonTag = document.getElementById(SSR_DATA_TAG_ID)
        const jsonStr = jsonTag?.innerText ?? '{}'
        const ssrData: unknown = JSON.parse(jsonStr)

        if (!isSSRData(ssrData)) {
            throw new Error(
                `Data parsed from #${SSR_DATA_TAG_ID} tag is not valid SSRData: ${jsonStr}`
            )
        }

        return ssrData

    } catch (err) {
        if (process.env.NODE_ENV === 'development')
            console.error('SSRData error:', err)

        return {}
    }
}

/* Execute */

window.onload = async function () {

    const ssrData = getServerSideRenderedData()

    const [
        React,
        { render },
        { BrowserRouter: Router },
        { Root }
    ] = await dependencies

    render(
        <Router>
            <Root ssrData={ssrData} />
        </Router>,
        document.getElementById('boss-media-www')
    )
}