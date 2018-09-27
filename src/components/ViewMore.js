import React from 'react';
import { Row, Col, Button, Thumbnail } from 'react-bootstrap';
import videos from '../videos';
import thumbnails from '../thumbnails';
import { PATH, VIEW_MORE } from '../utils/constants';

class ViewMore extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="view-more-container">
        <Row className="text-center view-more-title-row">
          <Col md={8} mdOffset={2} xs={12}>
            {VIEW_MORE.VIDEO_TITLE}
          </Col>
        </Row>
        <Row className="text-center view-more-media-row">
          <Col md={2}> </Col>
          {videos.map((video, i) => {
            return (
              <Col key={i} md={3} mdOffset={1} xs={12}>
                <Thumbnail
                  key={i}
                  src={video.image}
                  className="margin-all-5"
                  onClick={() => history.push(PATH.VIDEOS + '/' + video.label)}
                >
                  <Button
                    className="submit-button-color"
                    onClick={() =>
                      history.push(PATH.VIDEOS + '/' + video.label)
                    }
                    block
                  >
                    {video.label}
                  </Button>
                </Thumbnail>
              </Col>
            );
          })}
        </Row>
        <Row className="text-center view-more-title-row">
          <Col md={8} mdOffset={2} xs={12}>
            {VIEW_MORE.PHOTO_TITLE}
          </Col>
        </Row>
        <Row className="text-center view-more-media-row">
          {thumbnails.map((thumb, i) => {
            if (i < 4) {
              return (
                <Col key={i} md={3} xs={12}>
                  <Thumbnail
                    key={i}
                    src={thumb.image}
                    className="margin-all-5"
                    onClick={() =>
                      history.push(PATH.PHOTOS + '/' + thumb.label)
                    }
                  >
                    <Button
                      className="submit-button-color"
                      onClick={() =>
                        history.push(PATH.PHOTOS + '/' + thumb.label)
                      }
                      block
                    >
                      {thumb.label}
                    </Button>
                  </Thumbnail>
                </Col>
              );
            } else {
              return null;
            }
          })}
        </Row>
      </div>
    );
  }
}

export default ViewMore;
