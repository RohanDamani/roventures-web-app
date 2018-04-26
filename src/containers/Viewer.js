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

class Viewer extends React.Component {
  state = {
    photos: [],
    didScroll: false,
    showRefreshButton: false,
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
  }

  watchForUrlChanges(nextProps) {
    const { fetchAlbum, toggleShowAlbum, match, bucket } = this.props;
    const urlParam = match.params.item;
    const nextUrlParam = nextProps.match.params.item;

    if (urlParam !== nextUrlParam && nextUrlParam !== VIEWER.ABOUT) {
      fetchAlbum(bucket, nextUrlParam);
    }
    if (urlParam !== nextUrlParam && nextUrlParam === VIEWER.ABOUT) {
      toggleShowAlbum(VIEWER.ALBUMS);
    }
  }

  loadAlbum() {
    const { fetchAlbum, match, bucket } = this.props;

    if (!this.isShowingAboutSection()) {
      fetchAlbum(bucket, match.params.item);
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
    this.setState({ photos: this.props.media.photos, didScroll: true });
  }

  addSubSetsToState(nextProps) {
    const { media } = this.props;

    if (media.photos !== nextProps.media.photos) {
      this.setState({
        photos: nextProps.media.photoSubSet,
        didScroll: false,
        showRefreshButton: false,
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
    const { photos, showRefreshButton } = this.state;
    const { type } = showInViewer;
    const { videos } = media;
    return (
      <Grid fluid>
        <Row>
          <About history={history} isShowingAboutSection={this.isShowingAboutSection.bind(this)} />

          <PhotoViewer
            isShowingAboutSection={this.isShowingAboutSection.bind(this)}
            showInViewer={showInViewer}
            photos={photos}
            media={media}
            onScroll={this.onScroll.bind(this)}
            showRefreshButton={showRefreshButton}
          />

          <VideoViewer
            videos={videos}
            showInViewer={showInViewer}
            isShowingAboutSection={this.isShowingAboutSection.bind(this)}
          />
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
