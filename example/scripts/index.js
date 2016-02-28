import React, { Component } from 'react'
import { render } from 'react-dom'
import createRemodal from '../../src/'

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
      <div className='app'>
        <div className='top'>
          <div className='container'>
            <h1>
              React Remodal
            </h1>
            <p className='top__description'>
              A beautiful, simple modal for React.
            </p>
            <a href='https://github.com/tomgrooffer/react-remodal'>See documentation / github</a>
          </div>
        </div>
        <div className='content container'>
          <div className='example'>
            <button className='button' onClick={::this.toggleModal}>
              Open modal
            </button>
            <Remodal isOpen={this.state.isModalOpen} onClose={::this.toggleModal}>
              <h1>
                Lorem ipsum dolor sit amet.
              </h1>
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
        </div>
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
