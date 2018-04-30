import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import { fetchAlbum, toggleShowAlbum } from '../actions/actions';
import { VIEWER } from '../utils/constants';
import About from '../components/About';
import PhotoViewer from '../components/PhotoViewer';
import VideoViewer from '../components/VideoViewer';
import ScrollTop from '../components/ScrollTop';
import Loader from '../components/Loader';

class Viewer extends React.Component {
  state = {
    photos: [],
    videos: [],
    didScroll: false,
    showRefreshButton: false,
    loading: false,
  };

  componentWillMount() {
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
    const { fetchAlbum, toggleShowAlbum, match, bucket } = this.props;
    const urlParam = match.params.item;
    const nextUrlParam = nextProps.match.params.item;

    if (urlParam !== nextUrlParam && nextUrlParam !== VIEWER.ABOUT) {
      fetchAlbum(bucket, nextUrlParam);
      this.setState({ loading: true });
    }
    if (urlParam !== nextUrlParam && nextUrlParam === VIEWER.ABOUT) {
      toggleShowAlbum(VIEWER.ALBUMS);
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
    const { fetchAlbum, match, bucket } = this.props;

    if (!this.isShowingAboutSection()) {
      fetchAlbum(bucket, match.params.item);
      this.setState({ loading: true });
    }
    if (this.isShowingAboutSection()) {
      toggleShowAlbum(VIEWER.ALBUMS);
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
    const { showInViewer, media, history } = this.props;
    const { photos, videos, showRefreshButton, loading } = this.state;
    const { type } = showInViewer;
    return (
      <Grid fluid>
        <Row>
          <About
            history={history}
            isShowingAboutSection={this.isShowingAboutSection.bind(this)}
          />

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
                onScroll={this.onScroll.bind(this)}
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
                showInViewer={showInViewer}
                showRefreshButton={showRefreshButton}
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
  bucket: PropTypes.object.isRequired,
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
      bucket: state.bucket,
      media: state.media,
      showInViewer: state.showInViewer,
    }),
    {
      fetchAlbum,
      toggleShowAlbum,
    },
  )(Viewer),
);
