import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-up';
import ReactPlayer from 'react-player';
import { fetchAlbum, toggleShowAlbum } from '../actions/actions';
import { VIEWER } from '../constants';
import About from './About';
import PhotoViewer from './PhotoViewer';

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

  isShowingSubset() {
    const { media } = this.props;
    if (media.photos.length === media.photoSubSet.length) {
      return false;
    }
    const { photos } = this.state;
    return photos !== media.photos;
  }

  isShowingAboutSection() {
    const { match } = this.props;
    const { params: { item } } = match;
    return item === 'About';
  }

  render() {
    const { showInViewer, media, history } = this.props;
    const { photos, showRefreshButton } = this.state;
    const { type } = showInViewer;
    const { videos } = media;
    return (
      <Grid fluid>
        <Row>
          {this.isShowingAboutSection() && <About history={history} />}

          <PhotoViewer
            isShowingAboutSection={this.isShowingAboutSection.bind(this)}
            showInViewer={showInViewer}
            photos={photos}
            media={media}
            onScroll={this.onScroll.bind(this)}
            showRefreshButton={showRefreshButton}
          />

          {videos &&
            type === VIEWER.VIDEOS &&
            !this.isShowingAboutSection() && (
              <div>
                {videos.map((video, index) => {
                  return (
                    <Col key={index} xs={12}>
                      <ReactPlayer
                        url={video}
                        width={460}
                        height={300}
                        controls
                      />
                    </Col>
                  );
                })}
              </div>
            )}
          {/*{!props.showHomepage &&*/}
          {/*!props.isLoading &&*/}
          {/*props.showVideos &&*/}
          {/*!props.videos.length && (*/}
          {/*<Col md={3} sm={7} smOffset={5}>*/}
          {/*<div*/}
          {/*className={props.showOptions ? 'margin-top-120' : null}*/}
          {/*>*/}
          {/*<h2>*/}
          {/*No videos here, check out the*/}
          {/*<button*/}
          {/*className="btn btn-link"*/}
          {/*onClick={() => props.toggleVideos()}*/}
          {/*>*/}
          {/*photos!*/}
          {/*</button>*/}
          {/*</h2>*/}
          {/*</div>*/}
          {/*</Col>*/}
          {/*)}*/}
          {/*</Col>*/}
        </Row>
        <ScrollToTop showUnder={4000} duration={0}>
          <div className="scroll-up-button">
            <Glyphicon glyph="arrow-up" className="scroll-up-icon" />
          </div>
        </ScrollToTop>
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
