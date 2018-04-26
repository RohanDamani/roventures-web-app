import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Thumbnail, Glyphicon } from 'react-bootstrap';
import { VIEWER } from '../constants';

class PhotoViewer extends React.Component {
  isShowingSubset() {
    const { media, photos } = this.props;
    if (media.photos.length === media.photoSubSet.length) {
      return false;
    }
    return photos.length !== media.photos.length;
  }

  isViewerCountSingle() {
    const { showInViewer } = this.props;
    return showInViewer.count === VIEWER.SINGLE;
  }

  lgCol() {
    return this.isViewerCountSingle() ? 12 : 3;
  }

  smCol() {
    return this.isViewerCountSingle() ? 12 : 6;
  }

  xsCol() {
    return this.isViewerCountSingle() ? 12 : 6;
  }

  renderPhotos() {
    const { photos } = this.props;

    return photos.map((photo, index) => {
      return (
        <Col key={index} lg={this.lgCol()} sm={this.smCol()} xs={this.xsCol()}>
          <Thumbnail src={photo} alt={photo} />
        </Col>
      );
    });
  }

  renderThrottledRefreshButton() {
    const { showRefreshButton, onScroll } = this.props;

    if (this.isShowingSubset() && showRefreshButton) {
      return (
        <Col lg={this.lgCol()} sm={this.smCol()} xs={this.xsCol()}>
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
    const { showInViewer, photos, isShowingAboutSection } = this.props;
    const { type } = showInViewer;
    return (
      <div>
        {photos &&
          type === VIEWER.PHOTOS &&
          !isShowingAboutSection() && (
            <div>
              {this.renderPhotos()}
              {this.renderThrottledRefreshButton()}
            </div>
          )}
      </div>
    );
  }
}

PhotoViewer.propTypes = {
  photos: PropTypes.array.isRequired,
  showRefreshButton: PropTypes.bool.isRequired,
  showInViewer: PropTypes.object.isRequired,
  media: PropTypes.object.isRequired,
  isShowingAboutSection: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
};

export default PhotoViewer;
