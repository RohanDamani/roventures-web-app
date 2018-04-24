import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { fetchAlbum } from '../actions/actions';
import { VIEWER } from '../constants';

class Viewer extends React.Component {

    componentWillMount() {
        const { fetchAlbum, match, bucket } = this.props;

        // use the URL parameter to fetch the initial album
        fetchAlbum(bucket, match.params.item)
    }

    componentWillUpdate(nextProps) {
        const { fetchAlbum, match, bucket } = this.props;

        // each time the URL parameter changes, fetch the album using the new parameter
        if (match.params.item !== nextProps.match.params.item) {
            fetchAlbum(bucket, nextProps.match.params.item);
        }
    }


  render() {
    const { showInViewer, media } = this.props;
    const { type, count } = showInViewer;
    const { photos, videos } = media;

    return (
      <Grid fluid>
        <div>
          <Row>
            {/*<Col>*/}
            {/*{props.showHomepage &&*/}
            {/*!props.photos.length && (*/}
            {/*<div className="padding-top-20">*/}
            {/*<h2>Select an album to get started.</h2>*/}
            {/*<h2>Click a photo to enlarge.</h2>*/}
            {/*</div>*/}
            {/*)}*/}
            {photos &&
              type === VIEWER.PHOTOS && (
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
                </div>
              )}
            {/*{!props.showHomepage &&*/}
            {/*!props.isLoading &&*/}
            {/*!props.showVideos &&*/}
            {/*!props.photos.length && (*/}
            {/*<Col md={3} sm={7} smOffset={5}>*/}
            {/*<div*/}
            {/*className={props.showOptions ? 'margin-top-120' : null}*/}
            {/*>*/}
            {/*<h2>*/}
            {/*No photos here, check out the*/}
            {/*<button*/}
            {/*className="btn btn-link"*/}
            {/*onClick={() => props.toggleVideos()}*/}
            {/*>*/}
            {/*videos!*/}
            {/*</button>*/}
            {/*</h2>*/}
            {/*</div>*/}
            {/*</Col>*/}
            {/*)}*/}
            {videos &&
              type === VIEWER.VIDEOS &&
                <div>
                  {videos.map((video, index) => {
                    return (
                      <Col key={index} xs={12}>
                        <ReactPlayer
                          url={video}
                          width={460}
                          height={300}
                          controls
                        />
                      </Col>
                    );
                  })}
                </div>
              }
            {/*{!props.showHomepage &&*/}
            {/*!props.isLoading &&*/}
            {/*props.showVideos &&*/}
            {/*!props.videos.length && (*/}
            {/*<Col md={3} sm={7} smOffset={5}>*/}
            {/*<div*/}
            {/*className={props.showOptions ? 'margin-top-120' : null}*/}
            {/*>*/}
            {/*<h2>*/}
            {/*No videos here, check out the*/}
            {/*<button*/}
            {/*className="btn btn-link"*/}
            {/*onClick={() => props.toggleVideos()}*/}
            {/*>*/}
            {/*photos!*/}
            {/*</button>*/}
            {/*</h2>*/}
            {/*</div>*/}
            {/*</Col>*/}
            {/*)}*/}
            {/*</Col>*/}
          </Row>
        </div>
      </Grid>
    );
  }
}

Viewer.propTypes = {
  bucket: PropTypes.object,
};

export default withRouter(
  connect(state => ({ bucket: state.bucket, media: state.media, showInViewer: state.showInViewer }), {
      fetchAlbum,
  })(Viewer),
);
