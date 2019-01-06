import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, matchPath } from 'react-router-dom';
import {
  Col,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Image,
} from 'react-bootstrap';
import { fetchAlbumList } from '../actions/actions';
import videos from '../videos';
import { VIEWER, PATH } from '../utils/constants';

class Navigation extends React.Component {
  toggleInfoSection() {
    const { history, location } = this.props;
    if (location.pathname === PATH.INFO) {
      history.push(PATH.VIDEOS);
      return;
    }
    history.push(PATH.INFO);
  }

  renderLogo() {
    return (
      <Navbar.Header className="margin-bottom-0">
        <Navbar.Brand onClick={() => this.toggleInfoSection()}>
          <Col xs={12} className="hidden-xs large main-logo">
            <Image
              src={require('../roventures_logo.svg')}
              alt="openfit"
              width="300px"
              height="50px"
            />
          </Col>
          <Col xs={12} className="hidden-sm hidden-md hidden-lg main-logo">
            <Image
              src={require('../roventures_logo.svg')}
              alt="openfit"
              width="200px"
              height="25px"
            />
          </Col>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    );
  }

  renderVideoDropdownList() {
    const { history } = this.props;
    const match = matchPath(history.location.pathname, {
      path: `${PATH.VIDEOS}${PATH.VIDEO_PARAM}`,
    });

    return videos.map((video, i) => {
      if (
        match &&
        match.params &&
        match.params.video &&
        video.label === match.params.video
      ) {
        return null;
      }
      return (
        <MenuItem
          key={i}
          eventKey={`1.${i}`}
          onClick={() => {
            history.push(`${PATH.VIDEOS}/${video.label}`);
          }}
        >
          {video.label}
        </MenuItem>
      );
    });
  }

  renderVideoDropdownTitle() {
    return (
      <div>
        <Col xs={12} className="hidden-xs margin-bottom-10 nav-item">
          <span className="glyphicon glyphicon-facetime-video font-size-25" />
          <span className="glyphicon-class">{VIEWER.VIDEOS}</span>
        </Col>
        <Col xs={12} className="hidden-sm hidden-md hidden-lg nav-item">
          <span className="glyphicon glyphicon-facetime-video" />
          <span className="glyphicon-class small">{VIEWER.VIDEOS}</span>
        </Col>
      </div>
    );
  }

  renderVideoDropdown() {
    return (
      <NavDropdown
        eventKey={1}
        title={this.renderVideoDropdownTitle()}
        id="albums"
        noCaret
      >
        {this.renderVideoDropdownList()}
      </NavDropdown>
    );
  }

  renderPhotoDropdownList() {
    const { albumList, history } = this.props;

    const match = matchPath(history.location.pathname, {
      path: `${PATH.PHOTOS}${PATH.PHOTO_PARAM}`,
    });

    return albumList.map((album, i) => {
      if (
        match &&
        match.params &&
        match.params.photo &&
        album === match.params.photo
      ) {
        return null;
      }

      return (
        <MenuItem
          key={i}
          eventKey={`1.${i}`}
          onClick={() => {
            history.push(`${PATH.PHOTOS}/${album}`);
          }}
        >
          {album}
        </MenuItem>
      );
    });
  }

  renderPhotoDropdownTitle() {
    return (
      <div>
        <Col xs={12} className="hidden-xs margin-bottom-10 nav-item">
          <span className="glyphicon glyphicon-camera font-size-25" />
          <span className="glyphicon-class">{VIEWER.PHOTOS}</span>
        </Col>
        <Col xs={12} className="hidden-sm hidden-md hidden-lg nav-item">
          <span className="glyphicon glyphicon-camera" />
          <span className="glyphicon-class small">{VIEWER.PHOTOS}</span>
        </Col>
      </div>
    );
  }

  renderPhotoDropdown() {
    return (
      <NavDropdown
        eventKey={1}
        title={this.renderPhotoDropdownTitle()}
        id="albums"
        noCaret
      >
        {this.renderPhotoDropdownList()}
        <MenuItem divider />
      </NavDropdown>
    );
  }

  renderInfoButton() {
    return (
      <NavItem eventKey={1} onClick={() => this.toggleInfoSection()}>
        <Col
          xs={12}
          className="hidden-xs margin-bottom-10 nav-item padding-left-0"
        >
          <span className="glyphicon glyphicon-question-sign font-size-25" />
          <span className="glyphicon-class info"> {VIEWER.INFO}</span>
        </Col>
        <Col
          xs={12}
          className="hidden-sm hidden-md hidden-lg nav-item padding-left-0"
        >
          <span className="glyphicon glyphicon-question-sign" />
          <span className="glyphicon-class small"> {VIEWER.INFO}</span>
        </Col>
      </NavItem>
    );
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        {this.renderLogo()}
        <Navbar.Collapse>
          <Nav pullRight>
            {this.renderVideoDropdown()}
            {this.renderPhotoDropdown()}
            {this.renderInfoButton()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  albumList: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchAlbumList: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    state => ({ albumList: state.albumList, showInViewer: state.showInViewer }),
    {
      fetchAlbumList,
    },
  )(Navigation),
);
