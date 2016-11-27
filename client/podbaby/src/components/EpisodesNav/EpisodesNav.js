import React from 'react';
import * as bs from 'react-bootstrap';

import LinkNavItem from '../Navbar/LinkNavItem';

import './EpisodesNav.css';

const EpisodesNav = () => {
  return (
    <bs.Nav
          bsStyle="tabs"
          className="visible-md-block visible-lg-block podcasts-nav"
          justified
        >

      <LinkNavItem to="/podcasts/all/" icon="list">All podcasts</LinkNavItem>
      <LinkNavItem to="/podcasts/me/" icon="user">My podcasts</LinkNavItem>
      <LinkNavItem to="/podcasts/bookmarks/" icon="bookmark">My bookmarks</LinkNavItem>
      <LinkNavItem to="/podcasts/history/" icon="history">My history</LinkNavItem>

    </bs.Nav>
  );

};

export default EpisodesNav;
