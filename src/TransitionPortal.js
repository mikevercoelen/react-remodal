import React, { PropTypes } from 'react'
import Transition from 'react-addons-css-transition-group'
import PortalWrap from 'react-portal-wrap'

const TransitionPortal = ({ children, ...props }) =>
  <PortalWrap>
    <Transition {...props}>
      {children}
    </Transition>
  </PortalWrap>

TransitionPortal.propTypes = {
  children: PropTypes.node
}

export default TransitionPortal
