import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import videos from '../videos';

class VideoViewer extends React.Component {
  componentWillMount() {
    this.videos = videos.find(this.findVideo);
  }

  componentWillUpdate(nextProps) {
    const findVideo = video => {
      const { album } = nextProps.showInViewer;
      if (video.label === album) {
        return video;
      }
    };

    if (this.props.showInViewer.album !== nextProps.showInViewer.album) {
      this.videos = videos.find(findVideo);
    }
  }

  findVideo = video => {
    const { album } = this.props.showInViewer;
    if (video.label === album) {
      return video;
    }
  };

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

VideoViewer.propTypes = {
  showInViewer: PropTypes.object.isRequired,
};

export default VideoViewer;
