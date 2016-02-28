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

export default function Remodal (classes = {}) {
  classes = {
    ...defaultClasses,
    ...classes
  }

  return class Remodal extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      className: PropTypes.string,
      isOpen: PropTypes.bool,
      onClose: PropTypes.func,
      overlayClosesModal: PropTypes.bool,
      closeOnEscape: PropTypes.bool
    }

    static defaultProps = {
      isOpen: false,
      overlayClosesModal: false,
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
      return (this.props.isOpen) ? (
        <div
          onClick={::this.handleDialogClick}
          className={classes.dialog}>
          {this.props.children}
        </div>
      ) : null
    }

    get overlay () {
      return (this.props.isOpen) ? (
        <div className={classes.overlay} onClick={::this.handleClose} />
      ) : null
    }

    render () {
      const {
        className,
        isOpen
      } = this.props

      const props = blacklist(
        this.props,
        'overlayClosesModal',
        'className',
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
              [classes.wrapIsOpen]: isOpen,
              [className]: className
            })}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
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
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            component='div'>
            {this.overlay}
          </TransitionPortal>
        </div>
      )
    }
  }
}
