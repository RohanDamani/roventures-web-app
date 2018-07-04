import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Glyphicon } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import TextSection from './TextSection';

class VideoViewer extends React.Component {
  isShowingSubset() {
    const { media, videos } = this.props;
    if (media.videos.length === media.videoSubSet.length) {
      return false;
    }
    return videos.length !== media.videos.length;
  }

  renderHeader() {
    const { showInViewer } = this.props;

    return (
      <Col xs={12} className="text-center">
        <h1 className="viewer-header">
          {showInViewer.album} {showInViewer.type}
        </h1>
      </Col>
    );
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
    const { videos, showInViewer, toggleShowType, history } = this.props;
    return (
      <div>
        {this.renderHeader()}
        {videos.length > 0 &&
          videos.map((video, index) => {
            return (
              <Col
                key={index}
                xs={12}
              >
                <ReactPlayer
                  url={video}
                  width="100%"
                  height="100%"
                  playing={index === 0}
                  controls
                />
              </Col>
            );
          })}
        {videos.length === 0 && (
          <TextSection
            showInViewer={showInViewer}
            toggleShowType={toggleShowType}
            history={history}
          />
        )}
        {this.renderThrottledRefreshButton()}
      </div>
    );
  }
}

VideoViewer.propTypes = {
  videos: PropTypes.array.isRequired,
  media: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  showInViewer: PropTypes.object.isRequired,
  onScroll: PropTypes.func.isRequired,
  toggleShowType: PropTypes.func.isRequired,
  showRefreshButton: PropTypes.bool.isRequired,
};

export default VideoViewer;
