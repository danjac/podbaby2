import React, { Component, PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
import { Link } from 'react-router';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';


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
                  onClick={this.handleClick}>
              <Icon name='headphones' /> Podbaby
            </Link>
          </bs.Navbar.Brand>
          <bs.Navbar.Toggle />
        </bs.Navbar.Header>
        <bs.Navbar.Collapse>
          <bs.Nav>
            <IndexLinkContainer to="/">
              <bs.NavItem onClick={this.handleClick}>
                <Icon name="list" /> Podcasts
              </bs.NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/feeds">
              <bs.NavItem><Icon name="rss" /> Feeds</bs.NavItem>
            </LinkContainer>
          </bs.Nav>
          {isLoggedIn && currentUser && (
            <bs.Nav pullRight>
              <bs.NavItem href="#">
                <Icon name="user" /> {currentUser.username}
              </bs.NavItem>
              <bs.NavItem href="#" onClick={this.handleLogout}>
                <Icon name="sign-out" /> Logout
              </bs.NavItem>
            </bs.Nav>
          )}
          {!isLoggedIn && (
          <bs.Nav pullRight>
            <LinkContainer to="/login/">
              <bs.NavItem onClick={this.handleClick}>
                <Icon name="sign-in" /> Login
              </bs.NavItem>
            </LinkContainer>
            <LinkContainer to="/signup/">
              <bs.NavItem>
                <Icon name="user-plus" /> Join
              </bs.NavItem>
            </LinkContainer>
          </bs.Nav>
          )}
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
