import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import blacklist from 'blacklist'
import { lock, unlock } from './helpers/scrollLock'
import TransitionPortal from './TransitionPortal'

const defaultClasses = {
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
}

const defaultTransitions = {
  dialogEnterTimeout: 300,
  dialogLeaveTimeout: 300,
  overlayEnterTimeout: 300,
  overlayLeaveTimeout: 300
}

export default function Remodal (
  options = {}
) {
  const classes = {
    ...defaultClasses,
    ...options.classes
  }

  const transitions = {
    ...defaultTransitions
  }

  return class Remodal extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      isOpen: PropTypes.bool,
      onClose: PropTypes.func,
      overlayClosesModal: PropTypes.bool,
      closeOnEscape: PropTypes.bool
    }

    static defaultProps = {
      isOpen: false,
      overlayClosesModal: true,
      closeOnEscape: true
    }

    listenKeyboard = (event) => {
      if (this.props.closeOnEscape && (event.key === 'Escape' || event.keyCode === 27)) {
        this.props.onClose()
      }
    }

    componentDidMount () {
      window.addEventListener('keydown', this.listenKeyboard, true)
    }

    componentWillUnmount () {
      window.removeEventListener('keydown', this.listenKeyboard, true)
    }

    componentWillReceiveProps (nextProps) {
      if (!this.props.isOpen && nextProps.isOpen) {
        lock()
      } else if (this.props.isOpen && !nextProps.isOpen) {
        unlock()
      }
    }

    handleClose () {
      if (this.props.overlayClosesModal) {
        this.props.onClose()
      }
    }

    handleDialogClick (event) {
      event.stopPropagation()
    }

    get dialog () {
      const {
        isOpen,
        children
      } = this.props

      return (isOpen) ? (
        <div
          style={{
            // overlay has pointer, set to default
            // else dialog has pointer too.
            cursor: 'default'
          }}
          onClick={::this.handleDialogClick}
          className={classes.dialog}>
          {children}
        </div>
      ) : null
    }

    get overlay () {
      const {
        isOpen,
        overlayClosesModal
      } = this.props

      return (isOpen) ? (
        <div
          className={classes.overlay}
          style={{
            cursor: (overlayClosesModal) ? 'pointer' : 'default'
          }} onClick={::this.handleClose} />
      ) : null
    }

    render () {
      const props = blacklist(
        this.props,
        'overlayClosesModal',
        'isOpen',
        'onClose',
        'width'
      )

      return (
        <div>
          <TransitionPortal {...props}
            transitionName={{
              enter: classes.dialogEnter,
              enterActive: classes.dialogEnterActive,
              leave: classes.dialogLeave,
              leaveActive: classes.dialogLeaveActive
            }}
            onClick={::this.handleClose}
            className={classNames({
              [classes.wrap]: true,
              [classes.wrapIsOpen]: this.props.isOpen
            })}
            transitionEnterTimeout={transitions.dialogEnterTimeout}
            transitionLeaveTimeout={transitions.dialogLeaveTimeout}
            component='div'>
            {this.dialog}
          </TransitionPortal>
          <TransitionPortal
            transitionName={{
              enter: classes.overlayEnter,
              enterActive: classes.overlayEnterActive,
              leave: classes.overlayLeave,
              leaveActive: classes.overlayLeaveActive
            }}
            transitionEnterTimeout={transitions.overlayEnterTimeout}
            transitionLeaveTimeout={transitions.overlayLeaveTimeout}
            component='div'>
            {this.overlay}
          </TransitionPortal>
        </div>
      )
    }
  }
}
