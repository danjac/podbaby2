import React, { Component, PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
import { Link } from 'react-router';
import { partial } from 'lodash';

import LinkMenuItem from './LinkMenuItem';
import LinkNavItem from './LinkNavItem';

import './Navbar.css';

class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      dropdowns: {
        'podcasts-dropdown': false,
        'feeds-dropdown': false,
      },
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNavbarToggle = this.handleNavbarToggle.bind(this);

    this.handlePodcastsToggle = partial(
      this.handleDropdownToggle,
      'podcasts-dropdown'
    ).bind(this);

    this.handlePodcastsClose = partial(
      this.handleDropdownClose,
      'podcasts-dropdown'
    ).bind(this);

    this.handleFeedsToggle = partial(
      this.handleDropdownToggle,
      'feeds-dropdown'
    ).bind(this);

    this.handleFeedsClose = partial(
      this.handleDropdownClose,
      'feeds-dropdown'
    ).bind(this);

  }

  handleNavbarToggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  handleClose() {
    this.setState({ expanded: false });
  }

  handleDropdownToggle(id) {
    // will move into own component
    const { dropdowns } = this.state;
    const open = !dropdowns[id];
    dropdowns[id] = open;
    this.setState({ dropdowns });
  }

  handleDropdownClose(id) {
    // will move into own component
    const { dropdowns } = this.state;
    dropdowns[id] = false;
    this.setState({ dropdowns, expanded: false });
  }


  handleLogout() {
    this.setState({ expanded: false });
    this.props.onLogout();
  }

  render() {

    const { authenticated, user } = this.props;
    const { expanded, dropdowns } = this.state;

    return (
      <bs.Navbar fixedTop
                 inverse
                 expanded={expanded}
                 onToggle={this.handleNavbarToggle}>
        <bs.Navbar.Header>
          <bs.Navbar.Brand>
            <Link to={{ pathname: '/', query: { page: 1 }}}
              onClick={this.handleClose}> <Icon name="headphones" /> Podbaby
            </Link>
          </bs.Navbar.Brand>
          <bs.Navbar.Toggle />
        </bs.Navbar.Header>
        <bs.Navbar.Collapse>
        <bs.Nav>

          {authenticated && (
            <bs.NavDropdown open={dropdowns['podcasts-dropdown']}
                            title="Podcasts"
                            onToggle={this.handlePodcastsToggle}
                            id="podcasts-dropdown">

              <LinkMenuItem to="/podcasts/all/"
                            icon="list"
                            onClick={this.handlePodcastsClose}>All podcasts</LinkMenuItem>

              <LinkMenuItem to="/podcasts/me/"
                            icon="user"
                            onClick={this.handlePodcastsClose}>My podcasts</LinkMenuItem>

              <LinkMenuItem to="/podcasts/bookmarks/"
                            icon="bookmark"
                            onClick={this.handlePodcastsClose}>My bookmarks</LinkMenuItem>

              <LinkMenuItem to="/podcasts/history/"
                            icon="history"
                            onClick={this.handlePodcastsClose}>My history</LinkMenuItem>

            </bs.NavDropdown>)}

          {!authenticated && <LinkNavItem to="/podcasts/all/" icon="headphones">Podcasts</LinkNavItem>}

          <bs.NavDropdown open={dropdowns['feeds-dropdown']}
                          title="Feeds"
                          onToggle={this.handleFeedsToggle}
                          id="feeds-dropdown">

            {authenticated && (
              <LinkMenuItem to="/feeds/me/"
                            icon="user"
                            onClick={this.handleFeedsClose}>My feeds</LinkMenuItem>)}

            <LinkMenuItem to="/feeds/all/"
                          icon="list"
                          onClick={this.handleFeedsClose}>All feeds</LinkMenuItem>

            <LinkMenuItem to="/feeds/browse/"
                          icon="folder-open"
                          onClick={this.handleFeedsClose}>Browse</LinkMenuItem>

          </bs.NavDropdown>

      </bs.Nav>

          {authenticated && user && (
            <bs.Nav pullRight>
             <LinkNavItem to="/settings/" icon="cog" onClick={this.handleClose}>Settings</LinkNavItem>
             <bs.NavItem href="#" onClick={this.handleLogout}>
                <Icon name="sign-out" /> Logout
              </bs.NavItem>
            </bs.Nav>)}

          {!authenticated && (
          <bs.Nav pullRight>
            <LinkNavItem to="/login/" icon="sign-in" onClick={this.handleClose}>Login</LinkNavItem>
            <LinkNavItem to="/join/" icon="user-plus" onClick={this.handleClose}>Join</LinkNavItem>
          </bs.Nav>)}

      </bs.Navbar.Collapse>
      </bs.Navbar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
