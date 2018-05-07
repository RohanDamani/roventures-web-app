import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Col,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
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
          <Col xs={12} className="hidden-xs large">
            {MAIN.ROVENTURES}
          </Col>
          <Col xs={12} className="hidden-sm hidden-md hidden-lg">
            {MAIN.ROVENTURES}
          </Col>
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

  dropdownTitle() {
    return (
      <div>
        <Col xs={12} className="hidden-xs margin-bottom-8">
          <span className="glyphicon glyphicon-book" />
          <span className="glyphicon-class">{VIEWER.ALBUMS}</span>
        </Col>
        <Col xs={12} className="hidden-sm hidden-md hidden-lg">
          <span className="glyphicon glyphicon-book" />
          <span className="glyphicon-class small">{VIEWER.ALBUMS}</span>
        </Col>
      </div>
    );
  }

  renderAlbumDropdown() {
    return (
      <NavDropdown
        eventKey={1}
        title={this.dropdownTitle()}
        id="albums"
        noCaret
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
        <Nav className={showInViewer.type === VIEWER.VIDEOS ? 'hidden-xs' : ''}>
          {!this.isCountSingle() && (
            <NavItem onClick={() => toggleShowCount(VIEWER.SINGLE)}>
              <Col xs={12} className="hidden-xs margin-bottom-8">
                <span className="glyphicon glyphicon-stop" />
                <span className="glyphicon-class">{VIEWER.SINGLE}</span>
              </Col>
              <Col xs={12} className="hidden-sm hidden-md hidden-lg">
                <span className="glyphicon glyphicon-stop" />
                <span className="glyphicon-class small">{VIEWER.SINGLE}</span>
              </Col>
            </NavItem>
          )}
          {this.isCountSingle() && (
            <NavItem onClick={() => toggleShowCount(VIEWER.MULTIPLE)}>
              <Col xs={12} className="hidden-xs margin-bottom-8">
                <span className="glyphicon glyphicon-th-large" />
                <span className="glyphicon-class">{VIEWER.MULTIPLE}</span>
              </Col>
              <Col xs={12} className="hidden-sm hidden-md hidden-lg">
                <span className="glyphicon glyphicon-th-large" />
                <span className="glyphicon-class small">{VIEWER.MULTIPLE}</span>
              </Col>
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
              <Col xs={12} className="hidden-xs margin-bottom-8">
                <span className="glyphicon glyphicon-camera" />
                <span className="glyphicon-class">{VIEWER.PHOTOS}</span>
              </Col>
              <Col xs={12} className="hidden-sm hidden-md hidden-lg">
                <span className="glyphicon glyphicon-camera" />
                <span className="glyphicon-class small">{VIEWER.PHOTOS}</span>
              </Col>
            </NavItem>
          )}

          {showInViewer.type === VIEWER.PHOTOS && (
            <NavItem onClick={() => toggleShowType(VIEWER.VIDEOS)}>
              <Col xs={12} className="hidden-xs margin-bottom-8">
                <span className="glyphicon glyphicon-facetime-video" />
                <span className="glyphicon-class">{VIEWER.VIDEOS}</span>
              </Col>
              <Col xs={12} className="hidden-sm hidden-md hidden-lg">
                <span className="glyphicon glyphicon-facetime-video" />
                <span className="glyphicon-class small">{VIEWER.VIDEOS}</span>
              </Col>
            </NavItem>
          )}
        </Nav>
      );
    }
  }

  renderAboutButton() {
    return (
      <NavItem eventKey={1} onClick={() => this.toggleAboutSection()}>
          <Col xs={12} className="hidden-xs margin-bottom-8">
              <span className="glyphicon glyphicon-question-sign" />
              <span className="glyphicon-class about"> {VIEWER.ABOUT}</span>
          </Col>
          <Col xs={12} className="hidden-sm hidden-md hidden-lg">
              <span className="glyphicon glyphicon-question-sign" />
              <span className="glyphicon-class small"> {VIEWER.ABOUT}</span>
          </Col>
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
