import React from 'react'
import { Block } from 'ui/components/base'

const ImageCache = { }

class ImagePreview extends React.Component {

  state = {
    loaded: false
  }

  componentWillMount() {
    this.setImage(this.props.url)
  }

  componentWillReceiveProps(props) {
    if (props.url !== this.props.url)
      this.setImage(props.url)
  }

  setImage(url) {

    if (ImageCache[url])
      return this.setLoaded()

    this.clearLoaded()

    const image = ImageCache[url] = new Image()

    image.src = url
    image.onload = this.setLoaded
    image.error = this.clearLoaded

  }

  setLoaded = () => {
    if (!this.state.loaded)
      this.setState({ loaded: true })
  }

  clearLoaded = () => {
    if (this.state.loaded)
      this.setState({ loaded: false })
  }

  render() {

    const { url } = this.props
    const { loaded } = this.state

    const style = loaded
      ? { backgroundImage: `url(${url})` }
      : null

    return <Block classes={['image', { 'image-loaded': loaded }]} style={style} />
  }
}

export default ImagePreview
