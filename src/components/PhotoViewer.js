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

  render() {
    const {
      showInViewer,
      photos,
      showRefreshButton,
      onScroll,
      isShowingAboutSection,
    } = this.props;
    const { type, count } = showInViewer;
    return (
      <div>
        {photos &&
          type === VIEWER.PHOTOS &&
          !isShowingAboutSection() && (
            <div>
              {photos.map((photo, index) => {
                return (
                  <Col
                    key={index}
                    lg={count === VIEWER.SINGLE ? 12 : 3}
                    sm={count === VIEWER.SINGLE ? 12 : 4}
                    xs={count === VIEWER.SINGLE ? 12 : 6}
                  >
                    <Thumbnail src={photo} alt={photo} />
                  </Col>
                );
              })}
              {this.isShowingSubset() &&
                showRefreshButton && (
                  <Col
                    lg={count === VIEWER.SINGLE ? 12 : 3}
                    sm={count === VIEWER.SINGLE ? 12 : 4}
                    xs={count === VIEWER.SINGLE ? 12 : 6}
                  >
                    <Button
                      bsStyle={'link'}
                      bsSize={'lg'}
                      onClick={() => onScroll()}
                      block
                    >
                      <Glyphicon glyph="refresh" />
                    </Button>
                  </Col>
                )}
            </div>
          )}
      </div>
    );
  }
}

PhotoViewer.propTypes = {
  bucket: PropTypes.object,
};

export default PhotoViewer;
