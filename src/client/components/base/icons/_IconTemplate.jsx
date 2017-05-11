import React from 'react'
import Icon from './Icon'

//plug this regex into the find/replace to clean up svgs from editor.method.ac
//(id|class|fill|stroke)(-[a-z]+)?=('|")([A-z]|\d|_|-)+('|")\s?

export default function IconName({...other}) {

  return <Icon {...other}>
    {/*icon children here*/}
  </Icon>
}
