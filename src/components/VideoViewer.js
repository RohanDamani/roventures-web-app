import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Glyphicon } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { VIEWER } from '../utils/constants';

class VideoViewer extends React.Component {
  isShowingSubset() {
    const { media, videos } = this.props;
    if (media.videos.length === media.videoSubSet.length) {
      return false;
    }
    return videos.length !== media.videos.length;
  }

  isViewerCountSingle() {
    const { showInViewer } = this.props;
    return showInViewer.count === VIEWER.SINGLE;
  }

  smCol() {
    return this.isViewerCountSingle() ? 10 : 6;
  }

  smColOffset() {
    return this.isViewerCountSingle() ? 1 : 0;
  }

  // renderPhotos() {
  //     const { photos } = this.props;
  //
  //     return photos.map((photo, index) => {
  //         return (
  //             <Col key={index} lg={this.lgCol()} sm={this.smCol()} xs={this.xsCol()}>
  //                 <Thumbnail src={photo} alt={photo} />
  //             </Col>
  //         );
  //     });
  // }

  renderThrottledRefreshButton() {
    const { showRefreshButton, onScroll } = this.props;

    if (this.isShowingSubset() && showRefreshButton) {
      return (
        <Col xs={12} sm={this.smCol()} smOffset={this.smColOffset()}>
          <Button
            bsStyle={'link'}
            bsSize={'lg'}
            onClick={() => onScroll()}
            block
          >
            <Glyphicon glyph="refresh" />
          </Button>
        </Col>
      );
    }
  }

  render() {
    const { videos } = this.props;
    return (
      <div>
        {videos.map((video, index) => {
          return (
            <Col
              key={index}
              xs={12}
              sm={this.smCol()}
              smOffset={this.smColOffset()}
            >
              <ReactPlayer
                url={video}
                width="100%"
                height="100%"
                playing={index === 0}
                muted={index === 0}
                controls
              />
            </Col>
          );
        })}
        {this.renderThrottledRefreshButton()}
      </div>
    );
  }
}

VideoViewer.propTypes = {
  videos: PropTypes.array.isRequired,
  media: PropTypes.object.isRequired,
  showInViewer: PropTypes.object.isRequired,
  onScroll: PropTypes.func.isRequired,
  showRefreshButton: PropTypes.bool.isRequired,
};

export default VideoViewer;
