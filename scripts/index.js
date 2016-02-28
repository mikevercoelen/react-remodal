import React, { Component } from 'react'
import { render } from 'react-dom'
import createRemodal from '../../'

const Remodal = createRemodal()

class App extends Component {
  state = {
    isModalOpen: false
  }

  toggleModal () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render () {
    return (
      <div>
        <button onClick={::this.toggleModal}>
          Open modal
        </button>
        <Remodal isOpen={this.state.isModalOpen} onClose={::this.toggleModal} overlayClosesModal>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Remodal>
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
