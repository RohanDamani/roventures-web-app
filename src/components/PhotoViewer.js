import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  ButtonGroup,
  Button,
  Thumbnail,
  Glyphicon,
  Row,
} from 'react-bootstrap';
import { VIEWER } from '../utils/constants';
import { authenticatePhotoBucket } from '../utils/awsUtil';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import window from 'window-or-global';
import {
  fetchAlbum,
  updatePhotoSet,
  toggleIsShowingSingle,
  toggleDidScroll,
  toggleShowRefreshButton,
  addLoading,
  removeLoading,
} from '../actions/actions';
import Loader from './Loader';
import ToggleButton from 'react-toggle-button';
// import {Image} from 'cloudinary-react'

class PhotoViewer extends React.Component {
  componentWillMount() {
    // authenticate the AWS-SDK s3 bucket using AWS Cognito user pool
    this.bucket = authenticatePhotoBucket;
  }

  componentDidMount() {
    this.loadAlbum();
    this.initializeScrollListener();
    window.scrollTo(0, 0);

      // cloudinary test api
      // fetch('http://res.cloudinary.com/roventures/image/list/photo.json').then(res => res.json()).then(r => console.log(`PhotoViewer:40 (anon) - :`, r.resources ))
  }

  componentWillReceiveProps(nextProps) {
    this.addSubSetsToState(nextProps);
  }

  componentWillUpdate(nextProps) {
    this.watchForUrlChanges(nextProps);
  }

  componentWillUnmount() {
    window.removeEventListener(VIEWER.SCROLL, this.handleScroll);
  }

  watchForUrlChanges(nextProps) {
    const { fetchAlbum, match: { params: { photo } }, addLoading } = this.props;
    const urlParam = photo;
    const nextUrlParam = nextProps.match.params.photo;

    if (urlParam !== nextUrlParam && nextUrlParam !== VIEWER.ABOUT) {
      addLoading();
      fetchAlbum(this.bucket, nextUrlParam);
      window.scrollTo(0, 0);
    }
  }

  loadAlbum() {
    const { fetchAlbum, match, addLoading } = this.props;
    addLoading();
    fetchAlbum(this.bucket, match.params.photo);
  }

  initializeRefreshButtonThrottle() {
    window.setTimeout(() => {
      this.props.toggleShowRefreshButton(true);
    }, 3000);
  }

  initializeScrollListener() {
    window.addEventListener(VIEWER.SCROLL, this.handleScroll);
  }

  handleScroll = () => {
    const { didScroll } = this.props.photoViewer;
    if (window.pageYOffset > 100 && !didScroll) this.onScroll();
  };

  onScroll = () => {
    const {
      media,
      updatePhotoSet,
      toggleShowRefreshButton,
      toggleDidScroll,
    } = this.props;
    updatePhotoSet(media.photos);
    toggleShowRefreshButton(false);
    toggleDidScroll(true);
  };

  addSubSetsToState(nextProps) {
    const {
      media,
      updatePhotoSet,
      toggleShowRefreshButton,
      toggleDidScroll,
      removeLoading,
    } = this.props;
    if (media !== nextProps.media) {
      updatePhotoSet(nextProps.media.photoSubSet);
      removeLoading();
      toggleShowRefreshButton(false);
      toggleDidScroll(false);
      this.initializeRefreshButtonThrottle();
    }
  }

  lgCol() {
    return this.props.photoViewer.isShowingSingle ? 12 : 3;
  }

  mdCol() {
    return this.props.photoViewer.isShowingSingle ? 12 : 4;
  }

  smCol() {
    return this.props.photoViewer.isShowingSingle ? 12 : 6;
  }

  xsCol() {
    return this.props.photoViewer.isShowingSingle ? 12 : 6;
  }

  renderHeader() {
    const {
      match: { params: { photo } },
      photoViewer: { isShowingSingle },
      toggleIsShowingSingle,
    } = this.props;

    return (
      <div className="margin-top-20">
        <Col
          xs={12}
          sm={6}
          md={5}
          mdOffset={1}
          lg={4}
          lgOffset={2}
          className="text-center"
        >
          <h1 className="viewer-header">{photo} {VIEWER.PHOTOS}</h1>
        </Col>
        <Col xs={12} sm={6} md={5} lg={4} className="text-center">
          <ButtonGroup>
            <Button
              className="toggle-button-container"
              onClick={() => {
                toggleIsShowingSingle(!isShowingSingle);
              }}
            >
              <span className="glyphicon glyphicon-th-large font-size-25" />
              <span className="glyphicon-class">{VIEWER.MULTIPLE}</span>
            </Button>
            <Button className="toggle-button-container margin-all-8">
              <ToggleButton
                inactiveLabel={''}
                activeLabel={''}
                colors={{
                  activeThumb: {
                    base: 'rgb(250,250,250)',
                  },
                  inactiveThumb: {
                    base: 'rgb(93, 206, 224)',
                  },
                  active: {
                    base: 'rgb(39, 179, 202)',
                    hover: 'rgb(39, 179, 202)',
                  },
                  inactive: {
                    base: 'rgb(65,66,68)',
                    hover: 'rgb(95,96,98)',
                  },
                }}
                thumbStyle={{
                  width: '25px',
                  height: '25px',
                }}
                thumbAnimateRange={[-10, 36]}
                value={isShowingSingle}
                onToggle={value => {
                  toggleIsShowingSingle(!value);
                }}
              />
            </Button>
            <Button
              className="toggle-button-container"
              onClick={() => {
                toggleIsShowingSingle(!isShowingSingle);
              }}
            >
              <span className="glyphicon glyphicon-stop font-size-25" />
              <span className="glyphicon-class">{VIEWER.SINGLES}</span>
            </Button>
          </ButtonGroup>
        </Col>
      </div>
    );
  }

  isShowingSubset() {
    const { media, photoViewer: { photoSet } } = this.props;
    if (media.photos.length === media.photoSubSet.length) {
      return false;
    }
    return photoSet.length !== media.photos.length;
  }

  renderThrottledRefreshButton() {
    const { photoViewer: { showRefreshButton } } = this.props;

    if (this.isShowingSubset() && showRefreshButton) {
      return (
        <Col lg={this.lgCol()} sm={this.smCol()} xs={this.xsCol()}>
          <Button bsStyle={'link'} bsSize={'lg'} onClick={this.onScroll} block>
            <Glyphicon glyph="refresh" />
          </Button>
        </Col>
      );
    }
  }

  renderPhotos() {
    const { photoViewer: { photoSet, isShowingSingle } } = this.props;

    return photoSet.map((photo, index) => {
        const imageRequest = JSON.stringify({
            "bucket": "roventures-pictures",
            "key": photo,
            "edits": {
                "resize": {
                    "width": 900,
                    "height": 900,
                    "fit": "contain",
                },
                "rotate": null
            }
        });

        const url = `https://d1ces9xr9kdl0s.cloudfront.net/${btoa(imageRequest)}`;
      return (
        <Col
          key={index}
          className="no-padding"
          lg={this.lgCol()}
          md={this.mdCol()}
          sm={this.smCol()}
          xs={this.xsCol()}
        >
          <Thumbnail
            className={
              isShowingSingle ? 'background-color-single-thumbnail' : ''
            }
            src={url}
            alt={photo}
          />
        </Col>
      );
    });
  }

  render() {
    const { photoViewer: { photoSet, loading } } = this.props;

    if (loading > 0) {
      return <Loader />;
    }

    return (
      <React.Fragment>
        {this.renderHeader()}
        {photoSet.length > 0 && this.renderPhotos()}
        {photoSet.length > 0 && this.renderThrottledRefreshButton()}
      </React.Fragment>
    );
  }
}

PhotoViewer.propTypes = {
  photoViewer: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  media: PropTypes.object.isRequired,
  fetchAlbum: PropTypes.func.isRequired,
  updatePhotoSet: PropTypes.func.isRequired,
  toggleIsShowingSingle: PropTypes.func.isRequired,
  toggleDidScroll: PropTypes.func.isRequired,
  toggleShowRefreshButton: PropTypes.func.isRequired,
  addLoading: PropTypes.func.isRequired,
  removeLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    state => ({
      media: state.media,
      photoViewer: state.photoViewer,
    }),
    {
      fetchAlbum,
      updatePhotoSet,
      toggleIsShowingSingle,
      toggleDidScroll,
      toggleShowRefreshButton,
      addLoading,
      removeLoading,
    },
  )(PhotoViewer),
);
