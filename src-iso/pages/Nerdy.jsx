import React from 'react'
import fetch from 'isomorphic-fetch'

function seconds(seconds = 0) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

class Nerd extends React.Component {

  state = {
    foo: ''
  }

  async componentDidMount() {
    await seconds(2)

    this.setState({ foo: 'foo' })
  }

  render = () => <span>{this.state.foo}</span>

}

export default function Nerdy({children}) {
  return <div>
    <Nerd/>
    {children}
  </div>
}
