import backgroundVideo from '../assets/background.mp4'
import backgroundPoster from '../assets/background-poster.jpg'

export default function() {
  return <div id='background'>
    <div id='background-overlay'/>
    <video id='background-video' loop autoPlay muted poster={backgroundPoster} >
      <source src={backgroundVideo} type='video/mp4'/>
    </video>
  </div>
}
