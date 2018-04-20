import React from "react";
import {Grid, Row, Col, Thumbnail} from "react-bootstrap"
import ReactPlayer from 'react-player'
import CircularProgress from 'material-ui/CircularProgress';


const PhotoSection = (props) => {
    return (
        <Grid fluid>
            <div className="margin-top-20">
                <Row>
                    <Col mdOffset={props.showMenu ? 2 : null}>
                        <div className="container">
                            {props.showHomepage && !props.photos.length &&
                            <div className="padding-top-20">
                                <h2>Select an album to get started.</h2>
                                <h2>Click a photo to enlarge.</h2>

                            </div>
                            }
                            {props.isLoading &&
                            <div>
                                <CircularProgress className="progress-margin-top " size={80} thickness={5}/>
                            </div>
                            }
                            {!props.showVideos && props.photos &&

                            <div className={props.showOptions ? "margin-top-120" : null}>
                                {props.photos.map((photo, index) => {
                                    return (
                                        <Col key={index} lg={3} md={6}>
                                            <Thumbnail src={photo} alt={photo} onClick={() => props.openModal(photo)}/>
                                        </Col>
                                    )
                                })}

                            </div>
                            }
                            {!props.showHomepage && !props.isLoading && !props.showVideos && !props.photos.length &&
                            <Col md={3} sm={7} smOffset={5}>
                                <div className={props.showOptions ? "margin-top-120" : null}>

                                    <h2>No photos here, check out the
                                        <button className="btn btn-link" onClick={() => props.toggleVideos()}>videos!
                                        </button>
                                    </h2>
                                </div>
                            </Col>
                            }

                            {props.showVideos && props.videos &&
                            <div className={props.showOptions ? "margin-top-120" : null}>
                                {props.videos.map((video, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <ReactPlayer url={video} width={460} height={300} controls/>
                                        </Col>
                                    )
                                })}
                            </div>
                            }

                            {!props.showHomepage && !props.isLoading && props.showVideos && !props.videos.length &&
                            <Col md={3} sm={7} smOffset={5}>
                                <div className={props.showOptions ? "margin-top-120" : null}>
                                    <h2>No videos here, check out the
                                        <button className="btn btn-link" onClick={() => props.toggleVideos()}>photos!
                                        </button>
                                    </h2>
                                </div>
                            </Col>
                            }

                        </div>
                    </Col>
                </Row>
            </div>
        </Grid>
    )

}

export default PhotoSection