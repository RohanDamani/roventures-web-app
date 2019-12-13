import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import videos from '../videos';
import window from 'window-or-global';
import { VIEWER } from '../utils/constants';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

class VideoViewer extends React.Component {
  state = { loaded: false };

  componentWillMount() {
    window.scrollTo(0, 0);
    // set this.videos equal to to video matching the url parameter
    const { video } = this.props.match.params;
    const videoObj = videos.find(item => {
      if (item.label === video) {
        return item;
      }
      return null;
    });
    if (videoObj) {
      this.videos = videoObj;
    } else {
      this.videos = videos[0];
    }
  }

  componentDidMount() {
    // this is so the welcome video is muted only the first time
    setTimeout(
      function() {
        this.setState({ loaded: true });
      }.bind(this),
      3000,
    );

    ReactGA.initialize('G-69HR23N3TE');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentWillUpdate(nextProps) {
    // set this.videos equal to to video matching the url parameter
    const { video } = this.props.match.params;
    const nextVideo = nextProps.match.params.video;

    if (video !== nextVideo) {
      const videoObj = videos.find(item => {
        if (item.label === nextVideo) {
          return item;
        }
        return null;
      });
      window.scrollTo(0, 0);
      if (videoObj) {
        this.videos = videoObj;
      } else {
        this.videos = videos[0];
      }
    }
  }

  render() {
    const { loaded } = this.state;
    const { video } = this.props.match.params;
    return (
      <React.Fragment>
        <ReactPlayer
          url={this.videos.url}
          width="100%"
          className="video-player"
          playing={true}
          loop={!this.videos.image}
          muted={video === 'Welcome' && !loaded}
          file={{ forceHLS: true }}
          config={{
            file: {
              attributes: { poster: this.videos.image },
            },
          }}
          controls
        />
        <div className="video-info-panel text-center">
          <div className="video-info-panel-title">{this.videos.label}</div>
          <div className="video-info-panel-dates">
            {VIEWER.RECORDED}: {this.videos.recorded}
            <br />
            {VIEWER.PUBLISHED}: {this.videos.published}
          </div>
          <div className="video-info-panel-description">
            {this.videos.description}
          </div>
          <div className="video-info-panel-more">
            <Link to="/info">{VIEWER.MORE_INFORMATION}</Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

VideoViewer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default VideoViewer;
