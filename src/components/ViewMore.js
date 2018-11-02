import React from 'react';
import { Row, Col, Button, Thumbnail, Image } from 'react-bootstrap';
import videos from '../videos';
import thumbnails from '../thumbnails';
import { PATH, VIEW_MORE } from '../utils/constants';

class ViewMore extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <div className="view-more-container">
          <Row className="text-center view-more-title-row">
            <Col md={8} mdOffset={2} xs={12}>
              {VIEW_MORE.VIDEO_TITLE}
            </Col>
          </Row>
          <Row className="text-center view-more-media-row">
            <Col md={1}> </Col>
            {videos.map((video, i) => {
              if (video.image) {
                return (
                  <Col key={i} md={3} xs={12}>
                    <Thumbnail
                      onClick={() =>
                        history.push(PATH.VIDEOS + '/' + video.label)
                      }
                    >
                      <Button className="view-more-button" block>
                        Watch {video.label.toUpperCase()}
                      </Button>
                      <Image
                        key={i}
                        responsive
                        className="margin-auto"
                        src={video.image}
                        onClick={() =>
                          history.push(PATH.VIDEOS + '/' + video.label)
                        }
                      />
                    </Thumbnail>
                  </Col>
                );
              }
            })}
          </Row>
        </div>
        <div className="view-more-container">
          <Row className="text-center view-more-title-row">
            <Col md={8} mdOffset={2} xs={12}>
              {VIEW_MORE.PHOTO_TITLE}
            </Col>
          </Row>
          <Row className="text-center view-more-media-row">
            {thumbnails.map((thumb, i) => {
              return (
                <Col key={i} md={3} xs={12}>
                  <Thumbnail
                    onClick={() =>
                      history.push(PATH.PHOTOS + '/' + thumb.label)
                    }
                  >
                    <Button className="view-more-button" block>
                      View {thumb.label.toUpperCase()}
                    </Button>
                    <Image
                      key={i}
                      responsive
                      className="margin-auto"
                      src={thumb.image}
                      onClick={() =>
                        history.push(PATH.PHOTOS + '/' + thumb.label)
                      }
                    />
                  </Thumbnail>
                </Col>
              );
            })}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewMore;
