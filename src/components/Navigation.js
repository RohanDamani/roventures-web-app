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
import { VIEWER } from '../constants';

class Navigation extends React.Component {
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

  toggleAboutSection() {
    const { history } = this.props;
    history.push('/About');
  }

  isAboutSection() {
    const { showInViewer } = this.props;
    const { album } = showInViewer;
    console.log(`Navigation:38 (isAboutSection) - album, (album === 'Albums'):`, album, (album === 'Albums'))
    return album === 'Albums';
  }

  render() {
    const { toggleShowType, toggleShowCount, showInViewer } = this.props;
    const { type, count, album } = showInViewer;
    return (
      <Navbar inverse collapseOnSelect staticTop>

        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">RoVentures</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav className={'margin-left-nav-section'}>

            <NavDropdown eventKey={1} title={album} id="albums" className='font-color-white'>
              {this.renderAlbumList()}
              <MenuItem divider />
            </NavDropdown>

            {!this.isAboutSection() && (
              <NavDropdown eventKey={2} title={count} id="count">
                {count === VIEWER.MULTIPLE && (
                  <MenuItem
                    eventKey={2.1}
                    onClick={() => toggleShowCount(VIEWER.SINGLE)}
                  >
                    Single
                  </MenuItem>
                )}
                {count === VIEWER.SINGLE && (
                  <MenuItem
                    eventKey={2.1}
                    onClick={() => toggleShowCount(VIEWER.MULTIPLE)}
                  >
                    Multiple
                  </MenuItem>
                )}
              </NavDropdown>
            )}

            {!this.isAboutSection() && (
              <NavDropdown eventKey={3} title={type} id="type">
                {type === VIEWER.VIDEOS && (
                  <MenuItem
                    eventKey={3.1}
                    onClick={() => toggleShowType(VIEWER.PHOTOS)}
                  >
                    Photos
                  </MenuItem>
                )}

                {type === VIEWER.PHOTOS && (
                  <MenuItem
                    eventKey={3.1}
                    onClick={() => toggleShowType(VIEWER.VIDEOS)}
                  >
                    Videos
                  </MenuItem>
                )}

              </NavDropdown>
            )}

          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={() => this.toggleAboutSection()}>
              About
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  bucket: PropTypes.object,
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
