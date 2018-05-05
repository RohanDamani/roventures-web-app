import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import {
  fetchAlbumList,
  fetchAlbum,
  toggleShowAlbum,
  toggleShowType,
} from '../actions/actions';
import { VIEWER } from '../utils/constants';
import About from '../components/About';
import PhotoViewer from '../components/PhotoViewer';
import VideoViewer from '../components/VideoViewer';
import ScrollTop from '../components/ScrollTop';
import Loader from '../components/Loader';
import { authenticateBucket, dynamodb } from '../utils/awsUtil';

class Viewer extends React.Component {
  state = {
    photos: [],
    videos: [],
    didScroll: false,
    showRefreshButton: false,
    loading: false,
  };

  componentWillMount() {
    // authenticate the AWS-SDK s3 bucket object using AWS Cognito user pool
    this.bucket = authenticateBucket;
    // fetch the full list of albums from the bucket to populate the Navigation drop down
    this.props.fetchAlbumList(this.bucket);

      // authenticate the AWS-SDK s3 bucket and dynamodb object using AWS Cognito user pool
      this.bucket = authenticateBucket;
      this.dynamodb = dynamodb;

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
    this.watchForTypeChanges(nextProps);
  }

  watchForUrlChanges(nextProps) {
    const { fetchAlbum, toggleShowAlbum, match } = this.props;
    const urlParam = match.params.item;
    const nextUrlParam = nextProps.match.params.item;

    if (urlParam !== nextUrlParam && nextUrlParam !== VIEWER.ABOUT) {
      fetchAlbum(this.bucket, nextUrlParam);
      this.setState({ loading: true });
    }
    if (urlParam !== nextUrlParam && nextUrlParam === VIEWER.ABOUT) {
      toggleShowAlbum(VIEWER.ABOUT);
    }
  }

  watchForTypeChanges(nextProps) {
    const { showInViewer } = this.props;

    if (showInViewer.type !== nextProps.showInViewer.type) {
      this.initializeRefreshButtonThrottle();
      this.initializeScrollListener();

      this.setState({
        photos: nextProps.media.photoSubSet,
        videos: nextProps.media.videoSubSet,
        showRefreshButton: false,
        didScroll: false,
      });
    }
  }

  loadAlbum() {
    const { fetchAlbum, match } = this.props;

    if (!this.isShowingAboutSection()) {
      fetchAlbum(this.bucket, match.params.item);
      this.setState({ loading: true });
    }
    if (this.isShowingAboutSection()) {
      toggleShowAlbum(VIEWER.ABOUT);
    }
  }

  initializeRefreshButtonThrottle() {
    window.setTimeout(() => {
      this.setState({ showRefreshButton: true });
    }, 3000);
  }

  initializeScrollListener() {
    window.addEventListener(VIEWER.SCROLL, this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 100 && !this.state.didScroll) this.onScroll();
  };

  onScroll() {
    this.setState({
      photos: this.props.media.photos,
      videos: this.props.media.videos,
      showRefreshButton: false,
      didScroll: true,
    });
  }

  addSubSetsToState(nextProps) {
    const { media } = this.props;

    if (media !== nextProps.media) {
      this.setState({
        photos: nextProps.media.photoSubSet,
        videos: nextProps.media.videoSubSet,
        didScroll: false,
        showRefreshButton: false,
        loading: false,
      });
      this.initializeRefreshButtonThrottle();
    }
  }

  isShowingAboutSection() {
    const { match } = this.props;
    const { params: { item } } = match;
    return item === VIEWER.ABOUT;
  }

  render() {
    const { showInViewer, toggleShowType, media, history } = this.props;
    const { photos, videos, showRefreshButton, loading } = this.state;
    const { type } = showInViewer;
    return (
      <Grid fluid>
        <Row>
          {this.isShowingAboutSection() && <About history={history} dynamodb={this.dynamodb} />}

          {loading &&
            !this.isShowingAboutSection() && <Loader loading={loading} />}

          {photos &&
            !loading &&
            type === VIEWER.PHOTOS &&
            !this.isShowingAboutSection() && (
              <PhotoViewer
                isShowingAboutSection={this.isShowingAboutSection.bind(this)}
                showInViewer={showInViewer}
                photos={photos}
                media={media}
                history={history}
                onScroll={this.onScroll.bind(this)}
                toggleShowType={toggleShowType}
                showRefreshButton={showRefreshButton}
              />
            )}

          {videos &&
            !loading &&
            type === VIEWER.VIDEOS &&
            !this.isShowingAboutSection() && (
              <VideoViewer
                videos={videos}
                media={media}
                history={history}
                showInViewer={showInViewer}
                showRefreshButton={showRefreshButton}
                toggleShowType={toggleShowType}
                onScroll={this.onScroll.bind(this)}
              />
            )}
        </Row>

        <ScrollTop />
      </Grid>
    );
  }
}

Viewer.propTypes = {
  showInViewer: PropTypes.object.isRequired,
  media: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchAlbum: PropTypes.func.isRequired,
  toggleShowAlbum: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    state => ({
      media: state.media,
      showInViewer: state.showInViewer,
    }),
    {
      fetchAlbumList,
      fetchAlbum,
      toggleShowAlbum,
      toggleShowType,
    },
  )(Viewer),
);
