import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Thumbnail, Glyphicon } from 'react-bootstrap';
import { VIEWER } from '../utils/constants';
import TextSection from './TextSection';

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
    return showInViewer.count === VIEWER.SINGLES;
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

    renderHeader() {
        const { showInViewer } = this.props;

            return (
                <Col xs={12} className="text-center">
                  <h1 className="viewer-header">{showInViewer.album} {showInViewer.type}</h1>
                </Col>
            );
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
      const { showInViewer, toggleShowType, history, photos } = this.props;

      return (
      <div>
          {this.renderHeader()}
        {photos.length > 0 && this.renderPhotos()}
        {photos.length > 0 && this.renderThrottledRefreshButton()}
          {photos.length === 0 &&
              <TextSection
                  showInViewer={showInViewer}
                  toggleShowType={toggleShowType}
                  history={history}
              />
          }
      </div>
    );
  }
}

PhotoViewer.propTypes = {
  photos: PropTypes.array.isRequired,
  showRefreshButton: PropTypes.bool.isRequired,
  showInViewer: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    toggleShowType: PropTypes.func.isRequired,
  media: PropTypes.object.isRequired,
  isShowingAboutSection: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
};

export default PhotoViewer;
