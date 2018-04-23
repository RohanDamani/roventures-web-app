import React from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import ReactPlayer from 'react-player';

class Viewer extends React.Component {
  render() {
    return (
      <Grid fluid>
        <div className="margin-top-20">
          <Row>
            {/*<Col>*/}
              {/*{props.showHomepage &&*/}
              {/*!props.photos.length && (*/}
              {/*<div className="padding-top-20">*/}
              {/*<h2>Select an album to get started.</h2>*/}
              {/*<h2>Click a photo to enlarge.</h2>*/}
              {/*</div>*/}
              {/*)}*/}
              <div>test
                {/*{this.props.photos.map((photo, index) => {*/}
                  {/*return (*/}
                    {/*<Col key={index} lg={3} md={6}>*/}
                      {/*<Thumbnail src={photo} alt={photo} />*/}
                    {/*</Col>*/}
                  {/*);*/}
                {/*})}*/}
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
              {/*{props.showVideos &&*/}
              {/*props.videos && (*/}
              {/*<div*/}
              {/*className={props.showOptions ? 'margin-top-120' : null}*/}
              {/*>*/}
              {/*{props.videos.map((video, index) => {*/}
              {/*return (*/}
              {/*<Col key={index} lg={6}>*/}
              {/*<ReactPlayer*/}
              {/*url={video}*/}
              {/*width={460}*/}
              {/*height={300}*/}
              {/*controls*/}
              {/*/>*/}
              {/*</Col>*/}
              {/*);*/}
              {/*})}*/}
              {/*</div>*/}
              {/*)}*/}
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

export default Viewer;
