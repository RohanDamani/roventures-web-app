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

    isViewerCountSingle() {
        const { showInViewer } = this.props;
        return showInViewer.count === VIEWER.SINGLE;
    }

    smCol() {
        return this.isViewerCountSingle() ? 10 : 6;
    }

    smColOffset() {
        return this.isViewerCountSingle() ? 1 : 0;
    }

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
        const { showInViewer, videos, isShowingAboutSection } = this.props;
        const { type } = showInViewer
        return (
            <div>
                {videos &&
                type === VIEWER.VIDEOS &&
                !isShowingAboutSection() && (
                    <div>
                        {videos.map((video, index) => {
                            return (
                                <Col key={index} xs={12} sm={this.smCol()} smOffset={this.smColOffset()}>
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
    showInViewer: PropTypes.object.showInViewer,
    isShowingAboutSection: PropTypes.func.isRequired,
};

export default VideoViewer;
