import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {
  fetchAlbumList,
  toggleShowType,
  toggleShowCount,
} from '../actions/actions';
import { VIEWER, MAIN } from '../utils/constants';

class Navigation extends React.Component {
  toggleAboutSection() {
    const { history } = this.props;

    if (this.isAboutSection()) {
      history.push(MAIN.INITIAL_ALBUM);
      return;
    }
    history.push(MAIN.ABOUT_ROUTE);
  }

  isAboutSection() {
    const { showInViewer } = this.props;
    const { album } = showInViewer;
    return album === VIEWER.ABOUT;
  }

  renderLogo() {
    return (
      <Navbar.Header>
        <Navbar.Brand onClick={() => this.toggleAboutSection()}>
          {MAIN.ROVENTURES}
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    );
  }

  renderAlbumList() {
    const { albumList, history } = this.props;

    return albumList.map((album, i) => {
      return (
        <MenuItem
          key={i}
          eventKey={`1.${i}`}
          onClick={() => history.push(`/${album}`)}
        >
          {album}
        </MenuItem>
      );
    });
  }

  renderAlbumDropdown() {
    return (
      <NavDropdown
        eventKey={1}
        title={VIEWER.ALBUMS}
        id="albums"
        className="font-color-white"
      >
        {this.renderAlbumList()}
        <MenuItem divider />
      </NavDropdown>
    );
  }

  isCountSingle() {
    const { showInViewer } = this.props;
    return showInViewer.count === VIEWER.SINGLE;
  }

  renderCountDropdown() {
    const { toggleShowCount, showInViewer } = this.props;

    if (!this.isAboutSection()) {
      return (
        <Nav
          className={showInViewer.type === VIEWER.VIDEOS ? 'hidden-xs' : ''}
        >
          {!this.isCountSingle() && (
            <NavItem
              onClick={() => toggleShowCount(VIEWER.SINGLE)}
            >
              {VIEWER.SINGLE}
            </NavItem>
          )}
          {this.isCountSingle() && (
            <NavItem
              onClick={() => toggleShowCount(VIEWER.MULTIPLE)}
            >
              {VIEWER.MULTIPLE}
            </NavItem>
          )}
        </Nav>
      );
    }
  }

  renderTypeDropdown() {
    const { showInViewer, toggleShowType } = this.props;

    if (!this.isAboutSection()) {
      return (
        <Nav>
          {showInViewer.type === VIEWER.VIDEOS && (
            <NavItem onClick={() => toggleShowType(VIEWER.PHOTOS)}>
              {VIEWER.PHOTOS}
            </NavItem>
          )}

          {showInViewer.type === VIEWER.PHOTOS && (
            <NavItem onClick={() => toggleShowType(VIEWER.VIDEOS)}>
              {VIEWER.VIDEOS}
            </NavItem>
          )}
        </Nav>
      );
    }
  }

  renderAboutButton() {
    return (
      <NavItem eventKey={1} onClick={() => this.toggleAboutSection()}>
        {VIEWER.ABOUT}
      </NavItem>
    );
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        {this.renderLogo()}
        <Navbar.Collapse>
          <Nav className={'margin-dropdown-nav-section'}>
            {this.renderAlbumDropdown()}

            {this.renderCountDropdown()}

            {this.renderTypeDropdown()}
          </Nav>
          <Nav pullRight>{this.renderAboutButton()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  albumList: PropTypes.array.isRequired,
  showInViewer: PropTypes.object.isRequired,
  fetchAlbumList: PropTypes.func.isRequired,
  toggleShowType: PropTypes.func.isRequired,
  toggleShowCount: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    state => ({ albumList: state.albumList, showInViewer: state.showInViewer }),
    {
      fetchAlbumList,
      toggleShowType,
      toggleShowCount,
    },
  )(Navigation),
);
