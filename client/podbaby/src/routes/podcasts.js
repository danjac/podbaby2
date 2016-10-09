import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export class Podcasts extends Component {

  render() {

    console.log("PROPS", this.props);
    const { isLoggedIn, children } = this.props;

    const navbar = isLoggedIn && (
      <bs.Nav bsStyle="tabs" style={{ marginBottom: 20 }}>
        <IndexLinkContainer to="/">
          <bs.NavItem>Latest</bs.NavItem>
        </IndexLinkContainer>
        <LinkContainer to="/playlist/">
          <bs.NavItem>Playlist</bs.NavItem>
        </LinkContainer>
        <LinkContainer to="/history/">
          <bs.NavItem>History</bs.NavItem>
        </LinkContainer>
      </bs.Nav>);

    return (
      <div>
        {navbar}
        {children}
      </div>
    );
  }
}

Podcasts.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};


const mapStateToProps = state => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps)(withRouter(Podcasts));
