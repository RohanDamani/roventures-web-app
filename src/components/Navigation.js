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
import { VIEWER, MAIN } from '../constants';

class Navigation extends React.Component {
  toggleAboutSection() {
    const { history } = this.props;
    history.push(MAIN.ABOUT_ROUTE);
  }

  isAboutSection() {
    const { showInViewer } = this.props;
    const { album } = showInViewer;
    return album === VIEWER.ALBUMS;
  }

  renderLogo() {
    return (
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">{MAIN.ROVENTURES}</a>
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
    const { showInViewer } = this.props;

    return (
      <NavDropdown
        eventKey={1}
        title={showInViewer.album}
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
        <NavDropdown eventKey={2} title={showInViewer.count} id="count">
          {!this.isCountSingle() && (
            <MenuItem
              eventKey={2.1}
              onClick={() => toggleShowCount(VIEWER.SINGLE)}
            >
                {VIEWER.SINGLE}
            </MenuItem>
          )}
          {this.isCountSingle() && (
            <MenuItem
              eventKey={2.1}
              onClick={() => toggleShowCount(VIEWER.MULTIPLE)}
            >
                {VIEWER.MULTIPLE}
            </MenuItem>
          )}
        </NavDropdown>
      );
    }
  }

  renderTypeDropdown() {
    const { showInViewer, toggleShowType } = this.props;
    if (!this.isAboutSection()) {
      return (
        <NavDropdown eventKey={3} title={showInViewer.type} id="type">
          {showInViewer.type === VIEWER.VIDEOS && (
            <MenuItem
              eventKey={3.1}
              onClick={() => toggleShowType(VIEWER.PHOTOS)}
            >
                {VIEWER.PHOTOS}
            </MenuItem>
          )}

          {showInViewer.type === VIEWER.PHOTOS && (
            <MenuItem
              eventKey={3.1}
              onClick={() => toggleShowType(VIEWER.VIDEOS)}
            >
                {VIEWER.VIDEOS}
            </MenuItem>
          )}
        </NavDropdown>
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
  bucket: PropTypes.object.isRequired,
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
