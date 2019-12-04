import React from 'react';
import { Row, Col, Thumbnail } from 'react-bootstrap';
import videos from '../videos';
import thumbnails from '../thumbnails';
import { PATH, VIEW_MORE } from '../utils/constants';

class ViewMore extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <Row className="text-center view-more-title-row">
          <Col md={8} mdOffset={2} xs={12}>
            {VIEW_MORE.VIDEO_TITLE}
          </Col>
        </Row>
        <Row className="text-center view-more-media-row">
          {!history.location.pathname.includes('photo') && <Col md={1}> </Col>}
          {videos.map((video, i) => {
            if (!history.location.pathname.includes(video.label)) {
              return (
                <Col key={i} md={3} xs={12}>
                  <Thumbnail
                    src={video.image}
                    className="view-more-thumbnail"
                    onClick={() =>
                      history.push(PATH.VIDEOS + '/' + video.label)
                    }
                  >
                    {video.label.toUpperCase()}
                  </Thumbnail>
                </Col>
              );
            }
            return null;
          })}
        </Row>
        <Row className="text-center view-more-title-row photos">
          <Col md={8} mdOffset={2} xs={12}>
            {VIEW_MORE.PHOTO_TITLE}
          </Col>
        </Row>
        <Row className="text-center view-more-media-row photos">
          {thumbnails.map((thumb, i) => {
              const imageRequest = JSON.stringify({
                  "bucket": "roventures-pictures",
                  "key": thumb.image,
                  "edits": {
                      "resize": {
                          "width": 900,
                          "height": 900,
                          "fit": "contain",
                      },
                      "rotate": null
                  }
              })

              const url = `https://d1ces9xr9kdl0s.cloudfront.net/${btoa(imageRequest)}`;

            return (
              <Col key={i} md={3} xs={12}>
                <Thumbnail
                  src={url}
                  className="view-more-thumbnail"
                  onClick={() => history.push(PATH.PHOTOS + '/' + thumb.label)}
                >
                  {thumb.label.toUpperCase()}
                </Thumbnail>
              </Col>
            );
          })}
        </Row>
      </React.Fragment>
    );
  }
}

export default ViewMore;
