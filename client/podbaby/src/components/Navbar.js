import React, { Component, PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
import { Link } from 'react-router';
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
    React.PropTypes.string,
    React.PropTypes.object,
  ]).isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};


const LinkMenuItem = ({ to, icon, onClick, children }) => (
  <LinkContainer to={to}>
    <bs.MenuItem onClick={onClick}>
      <Icon name={icon} /> {children}
      </bs.MenuItem>
  </LinkContainer>
);

LinkMenuItem.propTypes = {
  to: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]).isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  handleClose() {
    this.setState({ expanded: false });
  }

  handleLogout() {
    this.setState({ expanded: false });
    this.props.onLogout();
  }

  render() {

    const { authenticated, user } = this.props;
    const { expanded } = this.state;

    return (
      <bs.Navbar fixedTop
                 inverse
                 expanded={expanded}
                 onToggle={this.handleToggle}>
        <bs.Navbar.Header>
          <bs.Navbar.Brand>
            <Link to={{ pathname: '/', query: { page: 1 }}}
                  onClick={this.handleClose}> Podbaby
            </Link>
          </bs.Navbar.Brand>
          <bs.Navbar.Toggle />
        </bs.Navbar.Header>
        <bs.Navbar.Collapse>
          <bs.Nav>

            {authenticated && (
              <bs.NavDropdown title={<span><Icon name="headphones" /> Podcasts</span>} id="podcasts-dropdown">
                <LinkMenuItem to="/podcasts/me/" icon="user" onClick={this.handleClose}>My podcasts</LinkMenuItem>
                <LinkMenuItem to="/podcasts/all/" icon="list" onClick={this.handleClose}>All podcasts</LinkMenuItem>
                <LinkMenuItem to="/podcasts/bookmarks/" icon="bookmark" onClick={this.handleClose}>Bookmarks</LinkMenuItem>
                <LinkMenuItem to="/podcasts/history/" icon="history" onClick={this.handleClose}>History</LinkMenuItem>
              </bs.NavDropdown>)}

            {!authenticated && <LinkNavItem to="/podcasts/all/" icon="headphones">Podcasts</LinkNavItem>}

            <bs.NavDropdown title={<span><Icon name="rss" /> Feeds</span>} id="feeds-dropdown">
              {authenticated && <LinkMenuItem to="/feeds/me/" icon="user" onClick={this.handleClose}>My feeds</LinkMenuItem>}
              <LinkMenuItem to="/feeds/all/" icon="list" onClick={this.handleClose}>All feeds</LinkMenuItem>
              <LinkMenuItem to="/feeds/browse/" icon="folder-open" onClick={this.handleClose}>Browse</LinkMenuItem>
            </bs.NavDropdown>

          </bs.Nav>

          {authenticated && user && (
            <bs.Nav pullRight>
              <bs.NavDropdown title={<span><Icon name="user" /> {user.username}</span>} id="user-dropdown">
              </bs.NavDropdown>
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
  onLogout: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default Navbar;
