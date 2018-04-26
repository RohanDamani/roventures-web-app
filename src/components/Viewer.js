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
    const { fetchAlbum, match, bucket } = this.props;

    // use the URL parameter to fetch the initial album
    if (!this.isShowingAboutSection()) {
      fetchAlbum(bucket, match.params.item);
    }
    if (this.isShowingAboutSection()) {
      toggleShowAlbum(VIEWER.ALBUMS);
    }

    // load full set of media on scroll
    window.addEventListener('scroll', this.handleScroll);

    // show backup refresh button to load full set of media after timeout
    window.setTimeout(() => {
      this.setState({ showRefreshButton: true });
    }, 3001);
  }

  componentWillReceiveProps(nextProps) {
    const { media } = this.props;

    // if the photos change, set the local array of media to show to the subset of media
    if (media.photos !== nextProps.media.photos) {
      this.setState({
        photos: nextProps.media.photoSubSet,
        didScroll: false,
        showRefreshButton: false,
      });
    }
  }

  componentWillUpdate(nextProps) {
    const { fetchAlbum, toggleShowAlbum, match, bucket } = this.props;

    // each time the URL parameter changes, fetch the album using the new parameter
    if (
      match.params.item !== nextProps.match.params.item &&
      nextProps.match.params.item !== 'About'
    ) {
      fetchAlbum(bucket, nextProps.match.params.item);
      window.setTimeout(() => {
        this.setState({ showRefreshButton: true });
      }, 3000);
    }
    // if URL is About - toggle showInViewer.album to 'Albums'
    if (
      match.params.item !== nextProps.match.params.item &&
      nextProps.match.params.item === 'About'
    ) {
      toggleShowAlbum(VIEWER.ALBUMS);
    }
  }

  handleScroll = () => {
    if (window.pageYOffset > 100 && !this.state.didScroll) this.onScroll();
  };

  onScroll() {
    this.setState({ photos: this.props.media.photos, didScroll: true });
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
  bucket: PropTypes.object,
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
