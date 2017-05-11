import Nut from './Nut'
import Caret from './Caret'
import Check from './Check'
import User from './User'

import Plus from './Plus'

import NodeCardView from './NodeCardView'
import NodeIconView from './NodeIconView'
import NodeTableView from './NodeTableView'

import ShowItemFreewall from './ShowItemFreewall'
import ShowItemProfile from './ShowItemProfile'
import ShowItemLink from './ShowItemLink'

import React from 'react'
import { Block } from '../layout'

const ICONS = {

  Nut,
  Caret,
  Check,
  User,

  Plus,

  NodeCardView,
  NodeIconView,
  NodeTableView,

  ShowItemFreewall,
  ShowItemProfile,
  ShowItemLink

}

export default function Icons(props) {
  const icons = []
  for (const key in props) if (key in ICONS && props[key]) {
    const Icon = ICONS[key]
    icons.push(<Icon key={key}/>)
  }

  return icons.length === 1
    ? icons[0]
    : <Block inline>{icons}</Block>
}


for (const key in ICONS)
  Icons[key] = ICONS[key]
