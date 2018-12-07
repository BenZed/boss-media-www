import fetch from 'isomorphic-fetch'

/******************************************************************************/
// Helper
/******************************************************************************/

const YTAPIURL = 'https://www.googleapis.com/youtube/v3/'
const MAX_RESULTS = 50

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
      videos: await this.getVideos(item.id, true)
    })

    return playlists
  }

  async getVideos (playlistId, justId = false, pageToken = null) {

    const res = await fetch(
      `${YTAPIURL}playlistItems` +
      `?part=${justId ? 'contentDetails' : 'snippet'}` +
      `&playlistId=${playlistId}` +
      `&maxResults=${MAX_RESULTS}` +
      (pageToken ? `&pageToken=${pageToken}` : '') +
      `&key=${this.apiKey}`
    )

    const json = await res.json()

    const videos = (json.items || []).map(item =>

      justId
        ? item.contentDetails?.videoId

        : {
          id: item.snippet?.resourceId?.videoId,
          title: item.snippet?.title,
          description: item.snippet?.description,
          thumbnails: item.snippet?.thumbnails,
          position: item.snippet?.position,
          published: new Date(item.snippet?.publishedAt)
        }
    )

    if (json.nextPageToken)
      videos.push(...(await this.getVideos(playlistId, justId, json.nextPageToken)))

    return videos
  }

}
/******************************************************************************/
// Main

/******************************************************************************/

const PopulateFromYoutube = props => {

  const { youtube: config } = props

  const api = new YoutubeApi(config)

  return async app => {

    const [ channelId, uploadPlaylistId ] = await api.getChannelAndUploads()

    const videos = await api.getVideos(uploadPlaylistId)
    await app.service('videos').create(videos)

    const playlists = await api.getPlaylists(channelId)
    await app.service('playlists').create(playlists)

    app.log`${videos.length} videos fetched from youtube`
    app.log`${playlists.length} playlists fetched from youtube`

  }
}
/******************************************************************************/
// Exports

/******************************************************************************/

export default PopulateFromYoutube