import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Thumbnail, Glyphicon } from 'react-bootstrap';
import { VIEWER } from '../utils/constants';
import { authenticateBucket } from '../utils/awsUtil';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchAlbum,
  fetchAlbumList,
  updatePhotoSet,
  toggleIsShowingSingle,
  toggleDidScroll,
  toggleShowRefreshButton,
} from '../actions/actions';

class PhotoViewer extends React.Component {
  componentWillMount() {
    // authenticate the AWS-SDK s3 bucket and dynamodb object using AWS Cognito user pool
    this.bucket = authenticateBucket;
  }

  componentDidMount() {
    this.loadAlbum();
    this.initializeScrollListener();
    this.initializeRefreshButtonThrottle();
  }

  componentWillReceiveProps(nextProps) {
    this.addSubSetsToState(nextProps);
  }

  componentWillUpdate(nextProps) {
    this.watchForUrlChanges(nextProps);
  }

  watchForUrlChanges(nextProps) {
    const { fetchAlbum, match: { params: { photo }} } = this.props;
    const urlParam = photo;
    const nextUrlParam = nextProps.match.params.photo;

    if (urlParam !== nextUrlParam && nextUrlParam !== VIEWER.ABOUT) {
      fetchAlbum(this.bucket, nextUrlParam);
    }
  }

  loadAlbum() {
    const { fetchAlbum, match } = this.props;
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

  onScroll() {
    const {
      media,
      updatePhotoSet,
      toggleShowRefreshButton,
      toggleDidScroll,
    } = this.props;
    updatePhotoSet(media.photos);
    toggleShowRefreshButton(false);
    toggleDidScroll(true);
  }

  addSubSetsToState(nextProps) {
    const {
      media,
      updatePhotoSet,
      toggleShowRefreshButton,
      toggleDidScroll,
    } = this.props;
    if (media !== nextProps.media) {
      updatePhotoSet(nextProps.media.photoSubSet);
      toggleShowRefreshButton(false);
      toggleDidScroll(false);
      this.initializeRefreshButtonThrottle();
    }
  }

  lgCol() {
    return this.props.photoViewer.isShowingSingle ? 12 : 3;
  }

  smCol() {
    return this.props.photoViewer.isShowingSingle ? 12 : 6;
  }

  xsCol() {
    return this.props.photoViewer.isShowingSingle ? 12 : 6;
  }

  renderHeader() {
    const { match: { params: { photo }} } = this.props;

    return (
      <Col xs={12} className="text-center">
        {/*<h1 className="viewer-header">{photo} Photos</h1>*/}
      </Col>
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
    const { photoViewer: { isShowingRefreshButton} } = this.props;

    if (this.isShowingSubset() && isShowingRefreshButton) {
      return (
        <Col lg={this.lgCol()} sm={this.smCol()} xs={this.xsCol()}>
          <Button
            bsStyle={'link'}
            bsSize={'lg'}
            onClick={this.onScroll}
            block
          >
            <Glyphicon glyph="refresh" />
          </Button>
        </Col>
      );
    }
  }

  renderPhotos() {
    const { photoViewer: { photoSet } } = this.props;

    return photoSet.map((photo, index) => {
      return (
        <Col
          key={index}
          className="no-padding"
          lg={this.lgCol()}
          sm={this.smCol()}
          xs={this.xsCol()}
        >
          <Thumbnail src={photo} alt={photo} />
        </Col>
      );
    });
  }

  render() {
    const { photoViewer: { photoSet } } = this.props;

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
  photos: PropTypes.array,
  photoViewer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  toggleShowType: PropTypes.func.isRequired,
  media: PropTypes.object.isRequired,
  onScroll: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    state => ({
      media: state.media,
      photoViewer: state.photoViewer,
    }),
    {
      fetchAlbumList,
      fetchAlbum,
      updatePhotoSet,
      toggleIsShowingSingle,
      toggleDidScroll,
      toggleShowRefreshButton,
    },
  )(PhotoViewer),
);
