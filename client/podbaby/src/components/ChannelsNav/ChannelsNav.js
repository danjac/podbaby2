import React from 'react';
import * as bs from 'react-bootstrap';

import LinkNavItem from '../Navbar/LinkNavItem';

import './ChannelsNav.css';

const ChannelsNav = () => {
  return (
    <bs.Nav
          bsStyle="tabs"
          className="visible-md-block visible-lg-block feeds-nav"
          justified
        >
      <LinkNavItem icon="list" to="/feeds/all/">All feeds</LinkNavItem>
      <LinkNavItem icon="user" to="/feeds/me/">My feeds</LinkNavItem>
      <LinkNavItem icon="folder-open" to="/feeds/browse/">Browse</LinkNavItem>
    </bs.Nav>
  );
};

export default ChannelsNav;
