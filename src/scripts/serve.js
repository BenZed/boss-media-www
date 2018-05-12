import BossMediaWwwServer from '../api/server'
import path from 'path'
import { run } from '@benzed/app'

/******************************************************************************/
// Setup
/******************************************************************************/

const CONFIG_URL = path.resolve(__dirname, '../../config')

/******************************************************************************/
// Execute
/******************************************************************************/

BossMediaWwwServer::run(CONFIG_URL)
