import React from 'react'
import Icon from './Icon'

const Points = ['m20.40355','30.59998c-2.26209','1.13312 -20.63435','20.57745 -20.63435',
  '20.57745l45.76972','48.70986l69.69186','-81.0921l-22.04902','-18.77266l-47.25618',
  '57.94398l-25.52204','-27.36653z']

export default function Check({...other}) {

  return <Icon {...other}>
    <path d={Points} />
  </Icon>
  
}
