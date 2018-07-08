import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';

class VideoViewer extends React.Component {

  render() {
    return (
      <div>
        <Col xs={12}>
          <ReactPlayer
            className="react-player"
            url={
              'https://s3-us-west-1.amazonaws.com/roventures-videos-hls/Seychelles/seychelles-hls-2M.m3u8'
            }
            width="100%"
            height="100%"
            playing={false}
            file={{ forceHLS: true }}
            fileConfig={{
              attributes: {
                poster:
                  'https://s3-us-west-1.amazonaws.com/rohan-pictures/Seychelles/G0530431.jpg',
              },
            }}
            controls
          />
        </Col>
      </div>
    );
  }
}

VideoViewer.propTypes = {
  // videos: PropTypes.array.isRequired,
};

export default VideoViewer;
