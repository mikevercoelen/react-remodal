import React, { Component } from 'react'
import { render } from 'react-dom'
// import { TransitionPortal } from '../../'


class App extends Component {
  render () {
    return (
      <div>
        <h1>This is my fucking homepage.</h1>
      </div>
    )
  }
}

window.onload = function () {
  render(
    <App />,
    document.getElementById('root')
  )
}
