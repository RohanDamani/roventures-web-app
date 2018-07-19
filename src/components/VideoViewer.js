import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import videos from '../videos';

class VideoViewer extends React.Component {
  componentWillMount() {
    const { video } = this.props.match.params;
    const videoObj = videos.find(item => {
      if (item.label === video) {
        return item;
      }
    });
    if (videoObj) {
      this.videos = videoObj;
    } else {
      this.videos = videos[0];
    }
  }

  componentWillUpdate(nextProps) {
    const { video } = this.props.match.params;
    const nextVideo = nextProps.match.params.video;

    if (video !== nextVideo) {
      const videoObj = videos.find(item => {
        if (item.label === nextVideo) {
          return item;
        }
      });

      if (videoObj) {
        this.videos = videoObj;
      } else {
        this.videos = videos[0];
      }
    }
  }

  render() {
    return (
        <Col xs={12}>
          <ReactPlayer
            className="react-player"
            url={this.videos.url}
            width="100%"
            height="100%"
            playing={false}
            file={{ forceHLS: true }}
            config={{
              file: {
                attributes: { poster: this.videos.image },
              },
            }}
            controls
          />
        </Col>
    );
  }
}

VideoViewer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default VideoViewer;
