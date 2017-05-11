import React from 'react'

import { instanceOf, oneOf, string } from 'prop-types'
import FileRecord from 'modules/store/records/file'

import { Block } from 'ui/components/base'
import Loading from './Loading'
import Image from './Image'
import Video from './Video'

import { PREVIEW_KEYS } from 'api/services/file/previews/definitions'

const preview = (file, key, host) => {

  if (!file || !key)
    return

  const size = file.getValue('size')
  const preview = key ? file.getValue(['previews', key]) : null

  if (!size || key && !preview)
    return <Loading/>

  const mime = file.getValue('mime')

  const asImage = (key || mime).includes('image')
  const isGif = mime === 'image/gif'

  const url = `${host}/files/${file.getQuerySuffix(key)}`

  return asImage
    ? <Image url={url} />
    : <Video src={url} loop={isGif} autoPlay={isGif} />

}

const Media = ({ classes, file, preview: key, children, ...rest }, { host }) =>

  <Block classes={[classes, 'media']} {...rest}>
    {preview(file, key, host)}
  </Block>

Media.propTypes = {
  file: instanceOf(FileRecord),
  preview: oneOf(PREVIEW_KEYS)
}

Media.contextTypes = {
  host: string.isRequired
}

export default Media
