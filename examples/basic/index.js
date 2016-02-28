import React from 'react'
import { render } from 'react-dom'
// import { TransitionPortal } from '../../'

var App = React.createClass({
  displayName: 'App',

  getInitialState: function () {
    return { checked: false }
  },

  handleCheckChange: function (event) {
    this.setState({checked: !this.state.checked})
  },

  handlePasswordChange: function (event) {
    console.log(this.refs.password.state.value)
  },

  render: function () {
    return (
      <div>
        <h1>This is my webpage.</h1>
      </div>
    )
  }
})

window.onload = function () {
  render(
    <App />,
    document.getElementById('root')
  )
}
