import React, { Component, PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  handleClick() {
    this.setState({ expanded: false });
  }

  handleLogout() {
    this.setState({ expanded: false });
    this.props.onLogout();
  }

  render() {

    const { auth: { isLoggedIn, currentUser } } = this.props;
    const { expanded } = this.state;

    return (
      <bs.Navbar fixedTop
                 expanded={expanded}
                 onToggle={this.handleToggle}>
        <bs.Navbar.Header>
          <bs.Navbar.Brand>
            <Link to={{ pathname: '/', query: { page: 1 }}}
                  onClick={this.handleClick}> Podbaby
            </Link>
          </bs.Navbar.Brand>
          <bs.Navbar.Toggle />
        </bs.Navbar.Header>
        <bs.Navbar.Collapse>
          <bs.Nav>

            {isLoggedIn && (
              <bs.NavDropdown title={<span><Icon name="headphones" /> Podcasts</span>} id="podcasts-dropdown">
                <LinkContainer to="/podcasts/me/">
                  <bs.MenuItem><Icon name="user" /> My feeds</bs.MenuItem>
                </LinkContainer>
                <LinkContainer to="/podcasts/all/">
                  <bs.MenuItem><Icon name="list" /> All podcasts</bs.MenuItem>
                </LinkContainer>
                <LinkContainer to="/podcasts/starred/">
                  <bs.MenuItem><Icon name="star" /> Starred</bs.MenuItem>
                </LinkContainer>
                <bs.MenuItem><Icon name="history" /> History</bs.MenuItem>
              </bs.NavDropdown>)}

            {!isLoggedIn && (
            <LinkContainer to="/podcasts/all/">
              <bs.NavItem>
                <Icon name="headphones" /> Podcasts
              </bs.NavItem>
            </LinkContainer>)}

            <bs.NavDropdown title={<span><Icon name="rss" /> Feeds</span>} id="feeds-dropdown">
              {isLoggedIn && (
              <LinkContainer to="/feeds/me/">
                <bs.MenuItem><Icon name="user" /> My feeds</bs.MenuItem>
              </LinkContainer>)}
              <LinkContainer to="/feeds/all/">
                <bs.MenuItem><Icon name="list" /> All feeds</bs.MenuItem>
              </LinkContainer>
              <LinkContainer to="/feeds/browse/">
                <bs.MenuItem><Icon name="folder" /> Browse</bs.MenuItem>
              </LinkContainer>
            </bs.NavDropdown>

          </bs.Nav>
          {isLoggedIn && currentUser && (
            <bs.Nav pullRight>
              <bs.NavDropdown title={<span><Icon name="user" /> {currentUser.username}</span>} id="user-dropdown">
              </bs.NavDropdown>
              <bs.NavItem href="#" onClick={this.handleLogout}>
                <Icon name="sign-out" /> Logout
              </bs.NavItem>
            </bs.Nav>)}
          {!isLoggedIn && (
          <bs.Nav pullRight>
            <LinkContainer to="/account/login/">
              <bs.NavItem onClick={this.handleClick}>
                <Icon name="sign-in" /> Login
              </bs.NavItem>
            </LinkContainer>
            <LinkContainer to="/account/signup/">
              <bs.NavItem>
                <Icon name="user-plus" /> Join
              </bs.NavItem>
            </LinkContainer>
          </bs.Nav>)}
      </bs.Navbar.Collapse>
      </bs.Navbar>
    );
  }
}

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default Navbar;
