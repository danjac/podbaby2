import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
import { LinkContainer } from 'react-router-bootstrap';

const LinkNavItem = ({ to, icon, onClick, children }) => (
  <LinkContainer to={to}>
    <bs.NavItem onClick={onClick}>
      <Icon name={icon} /> {children}
    </bs.NavItem>
  </LinkContainer>
);

LinkNavItem.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default LinkNavItem;

