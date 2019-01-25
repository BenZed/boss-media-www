import fetch from 'isomorphic-fetch'
import { min } from '@benzed/math'
import { scheduleJob } from 'node-schedule'

/******************************************************************************/
// Helper
/******************************************************************************/

const YTAPIURL = 'https://www.googleapis.com/youtube/v3/'
const MAX_RESULTS = 50
const EVERY_FRIDAY_AT_431_PM = { hour: 16, minute: 31, dayOfWeek: 5 }

/******************************************************************************/
// Youtube Api
/******************************************************************************/

class YoutubeApi {

  constructor (config) {
    this.apiKey = config.api_key
    this.userName = config.user_name
  }

  async getChannelAndUploads () {

    const res = await fetch(
      `${YTAPIURL}channels` +
      `?part=contentDetails` +
      `&forUsername=${this.userName}` +
      `&key=${this.apiKey}`
    )

    const json = await res.json()
    const [ item ] = json.items || []

    const channelId = item?.id || null
    const uploadPlaylistId = item?.contentDetails?.relatedPlaylists?.uploads

    return [ channelId, uploadPlaylistId ]
  }

  async getPlaylists (channelId) {

    const res = await fetch(
      `${YTAPIURL}playlists` +
      `?part=snippet` +
      `&channelId=${channelId}` +
      `&maxResults=${MAX_RESULTS}` +
      `&key=${this.apiKey}`
    )

    const json = await res.json()
    const playlists = []

    for (const item of json.items || []) playlists.push({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      videos: await this.getPlaylistItemsIds(item.id)
    })

    return playlists
  }

  async getVideos (playlistId, pageToken = null) {

    const videoIds = await this.getPlaylistItemsIds(playlistId)
    const videos = []

    while (videoIds.length > 0) {

      const ids = videoIds.splice(0, min(videoIds.length, MAX_RESULTS))

      const res = await fetch(
        `${YTAPIURL}videos` +
        `?part=snippet` +
        `&id=${ids}` +
        `&maxResults=${MAX_RESULTS}` +
        `&key=${this.apiKey}`
      )

      const json = await res.json()

      const items = (json.items || []).map(item => ({

        id: item.id,
        title: item.snippet?.title,
        description: item.snippet?.description,
        thumbnails: item.snippet?.thumbnails,
        position: item.snippet?.position,
        published: new Date(item.snippet?.publishedAt),
        meta: this.parseTags(item.snippet?.tags)

      }))

      videos.push(...items)

    }

    return videos

  }

  parseTags (tags = []) {

    const tagreg = /^\([A-Za-z0-9]+\)/

    const metaData = tags.reduce((meta, tag) => {

      const match = tag.match(tagreg)
      if (match) {

        const value = tag.replace(tagreg, '').trim()
        const key = match[0]
          // remove brackets
          .replace(/\(|\)/g, '')

          // really expensive way to make sure the first character is lower case
          .split('')
          .map((char, i) => i === 0 ? char.toLowerCase() : char)
          .join('')

        meta[key] = meta[key] || []
        meta[key].push(value)
      }

      return meta

    }, {})

    return Object.keys(metaData).length > 0
      ? metaData
      : null

  }

  async getPlaylistItemsIds (playlistId, pageToken = null) {

    const res = await fetch(
      `${YTAPIURL}playlistItems` +
      `?part=contentDetails` +
      `&playlistId=${playlistId}` +
      `&maxResults=${MAX_RESULTS}` +
      (pageToken ? `&pageToken=${pageToken}` : '') +
      `&key=${this.apiKey}`
    )

    const json = await res.json()

    const videos = (json.items || []).map(item => item.contentDetails?.videoId)

    if (json.nextPageToken)
      videos.push(...(await this.getPlaylistItemsIds(playlistId, json.nextPageToken)))

    return videos
  }

}

/******************************************************************************/
// Main
/******************************************************************************/

const populate = props => {

  const { youtube: config } = props

  const youtubeApi = new YoutubeApi(config)

  return app => {

    const populateFromYoutube = async () => {
      try {

        const [ channelId, uploadPlaylistId ] = await youtubeApi.getChannelAndUploads()

        const videos = await youtubeApi.getVideos(uploadPlaylistId)

        await app.service('videos').remove(null)
        await app.service('videos').create(videos)

        const playlists = await youtubeApi.getPlaylists(channelId)

        await app.service('playlists').remove(null)
        await app.service('playlists').create(playlists)

        app.log`populate-from-youtube ${videos.length} videos fetched from youtube`
        app.log`populate-from-youtube ${playlists.length} playlists fetched from youtube`

      } catch (err) {

        app.log`information could not be fetched from youtube: ${err.message}`
      }
    }

    scheduleJob(EVERY_FRIDAY_AT_431_PM, populateFromYoutube)
    app.log`populate-from-youtube scheduled every friday at 4:31pm`

    // also do it right now
    return populateFromYoutube()

  }
}
/******************************************************************************/
// Exports

/******************************************************************************/

export default populate
