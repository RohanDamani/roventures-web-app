import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { VIEWER } from '../utils/constants';

class VideoViewer extends React.Component {
    // isShowingSubset() {
    //     const { media, videos } = this.props;
    //     if (media.videos.length === media.videosSubSet.length) {
    //         return false;
    //     }
    //     return videos.length !== media.videos.length;
    // }
    //
    // isViewerCountSingle() {
    //     const { showInViewer } = this.props;
    //     return showInViewer.count === VIEWER.SINGLE;
    // }
    //
    // lgCol() {
    //     return this.isViewerCountSingle() ? 12 : 3;
    // }
    //
    // smCol() {
    //     return this.isViewerCountSingle() ? 12 : 6;
    // }
    //
    // xsCol() {
    //     return this.isViewerCountSingle() ? 12 : 6;
    // }

    // renderPhotos() {
    //     const { photos } = this.props;
    //
    //     return photos.map((photo, index) => {
    //         return (
    //             <Col key={index} lg={this.lgCol()} sm={this.smCol()} xs={this.xsCol()}>
    //                 <Thumbnail src={photo} alt={photo} />
    //             </Col>
    //         );
    //     });
    // }

    // renderThrottledRefreshButton() {
    //     const { showRefreshButton, onScroll } = this.props;
    //
    //     if (this.isShowingSubset() && showRefreshButton) {
    //         return (
    //             <Col lg={this.lgCol()} sm={this.smCol()} xs={this.xsCol()}>
    //                 <Button
    //                     bsStyle={'link'}
    //                     bsSize={'lg'}
    //                     onClick={() => onScroll()}
    //                     block
    //                 >
    //                     <Glyphicon glyph="refresh" />
    //                 </Button>
    //             </Col>
    //         );
    //     }
    // }

    render() {
        const { type, videos, isShowingAboutSection } = this.props;
        return (
            <div>
                {videos &&
                type === VIEWER.VIDEOS &&
                !isShowingAboutSection() && (
                    <div>
                        {videos.map((video, index) => {
                            return (
                                <Col key={index} xs={12} sm={10} smOffset={1}>
                                    <ReactPlayer
                                        url={video}
                                        width='100%'
                                        height='100%'
                                        playing={index === 0}
                                        muted={index === 0}
                                        controls
                                    />
                                </Col>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

VideoViewer.propTypes = {
    photos: PropTypes.array.isRequired,
    type: PropTypes.object.isRequired,
    isShowingAboutSection: PropTypes.func.isRequired,
};

export default VideoViewer;
