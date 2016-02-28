React Remodal  [![npm version](https://badge.fury.io/js/react-remodal.svg)](http://badge.fury.io/js/react-remodal)
=====

## Demo & Example

[See the demo](http://tomgrooffer.github.io/react-remodal)

## Features

- Animated
- Customizable
- Responsive

## Installation

```shell
npm install react-remodal --save
```

## Usage

```javascript
import createRemodal from 'react-remodal'
import 'react-remodal/styles/main.css'

// options to createRemodal are optional, see 'Customization' section.
const Remodal = createRemodal()

class Example extends Component {
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
    )
  }
}
```

## Customization

React remodal animates the dialog and overlay with css classes. You can pass
custom classes to `createRemodal`. See below:

```javascript
const Remodal = createRemodal({

  // these are the default values:
  classes: {
    'dialog': 'react-remodal__dialog',
    'dialogEnter': 'react-remodal__dialog--enter',
    'dialogEnterActive': 'react-remodal__dialog--enter-active',
    'dialogLeave': 'react-remodal__dialog--leave',
    'dialogLeaveActive': 'react-remodal__dialog--leave-active',
    'overlay': 'react-remodal__overlay',
    'overlayEnter': 'react-remodal__overlay--enter',
    'overlayEnterActive': 'react-remodal__overlay--enter-active',
    'overlayLeave': 'react-remodal__overlay--leave',
    'overlayLeaveActive': 'react-remodal__overlay--leave-active',
    'wrap': 'react-remodal__wrap',
    'wrapIsOpen': 'react-remodal__wrap--is-open'
  },

  // transition durations: should match the transition duration of your
  // css classes.
  //
  // these are the default values:
  transitions: {
    dialogEnterTimeout: 300,
    dialogLeaveTimeout: 300,
    overlayEnterTimeout: 300,
    overlayLeaveTimeout: 300
  }
})
```

## Props

* isOpen - (bool) if the modal is open (default = false)
* onClose - (function) callback on close
* overlayClosesModal - (bool) if clicking on the overlay closes the modal (requires onClose)
* closeOnEscape - (bool) if keyboard escape closes the modal (requires onClose)

## Recommendations

It is recommended to add `overflow-y: scroll;` to your body css, this way
we prevent "jumpy" content.

```css
body {
  overflow-y: scroll;
}
```

## Development

```shell
npm start
```
