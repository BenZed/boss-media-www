import React from 'react'
import Icon from './Icon'

//plug this regex into the find/replace to clean up svgs from editor.method.ac
//id='svg_\d\d?' ||stroke-width='..?.?.?' |stroke-opacity='..?.?.?' |fill-opacity='..?.?.?' ||<title>\w+\s?\d?</title>

export default function DownloadableLinkIcon({...other}) {

  return <Icon {...other}>
    <path d='m0.125911,0.125775l57.749032,0l0,49.998988l-57.749032,0l0,-49.998988z' />
    <path d='m0.125048,69.875705l114.749347,0l0,4.749521l-114.749347,0l0,-4.749521z' />
    <path d='m0.125048,82.375752l114.749347,0l0,4.749521l-114.749347,0l0,-4.749521z' />
    <path d='m0.125048,95.1258l114.749347,0l0,4.749521l-114.749347,0l0,-4.749521z' />
    <path d='m0.125048,57.62566l114.749346,0l0,4.749521l-114.749346,0l0,-4.749521z' />
    <path d='m102.024417,26.976401l-14.875015,14.825031l-14.875015,-14.825031l7.437508,0l0,-14.896366l14.875014,0l0,14.896366l7.437508,0z' />
  </Icon>
}
