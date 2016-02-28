import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import blacklist from 'blacklist'
import { lock, unlock } from './helpers/scrollLock'
import TransitionPortal from './TransitionPortal'

const defaultClasses = {
  'dialog': 'dialog',
  'dialog--large': 'dialog--large',
  'dialog--medium': 'dialog--medium',
  'dialog--small': 'dialog--small',
  'dialogEnter': 'dialogEnter',
  'dialogEnterActive': 'dialogEnterActive',
  'dialogLeave': 'dialogLeave',
  'dialogLeaveActive': 'dialogLeaveActive',
  'overlayEnter': 'overlayEnter',
  'overlayEnterActive': 'overlayEnterActive',
  'overlayLeave': 'overlayLeave',
  'overlayLeaveActive': 'overlayLeaveActive',
  'wrap': 'wrap',
  'isOpen': 'isOpen',
  'overlay': 'overlay'
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
      closeOnEscape: PropTypes.bool,
      width: PropTypes.oneOf([
        'small',
        'medium',
        'large'
      ])
    }

    static defaultProps = {
      width: 'medium',
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
          className={classNames({
            [classes.dialog]: true,
            [classes[`dialog--${this.props.width}`]]: true
          })}>
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
              [classes.isOpen]: isOpen,
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
