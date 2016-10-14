import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export class Feeds extends Component {

  render() {

    const { isLoggedIn, children } = this.props;

    return (
      <div>
        <bs.Nav bsStyle="tabs" style={{ marginBottom: 20 }}>
          <IndexLinkContainer to="/feeds/">
            <bs.NavItem>All feeds</bs.NavItem>
          </IndexLinkContainer>
          {isLoggedIn && (<LinkContainer to="/feeds/me/">
            <bs.NavItem>My feeds</bs.NavItem>
          </LinkContainer>)}
          <LinkContainer to="/feeds/browse/">
            <bs.NavItem>Browse categories</bs.NavItem>
          </LinkContainer>
        </bs.Nav>
        {children}
      </div>
    );
  }
}

Feeds.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};


const mapStateToProps = state => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps)(withRouter(Feeds));
