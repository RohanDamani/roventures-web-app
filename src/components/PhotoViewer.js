import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Thumbnail, Glyphicon } from 'react-bootstrap';
import { VIEWER } from '../utils/constants';
import TextSection from './TextSection';
import { authenticateBucket } from '../utils/awsUtil';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchAlbum, fetchAlbumList, toggleShowAlbum, toggleShowType} from "../actions/actions";

class PhotoViewer extends React.Component {

    state = {
        photos: [],
        didScroll: false,
        showRefreshButton: false,
    };


  componentWillMount() {
    // authenticate the AWS-SDK s3 bucket and dynamodb object using AWS Cognito user pool
    this.bucket = authenticateBucket;
  }

    componentDidMount() {
        this.loadAlbum();
        this.initializeScrollListener();
        this.initializeRefreshButtonThrottle();
    }

    componentWillReceiveProps(nextProps) {
        this.addSubSetsToState(nextProps);
    }

    componentWillUpdate(nextProps) {
        this.watchForUrlChanges(nextProps);
        this.watchForTypeChanges(nextProps);
    }

    // update to watch showInViewer.album
    watchForUrlChanges(nextProps) {
        const { fetchAlbum, match } = this.props;
        const urlParam = match.params.photo;
        const nextUrlParam = nextProps.match.params.photo;

        if (urlParam !== nextUrlParam && nextUrlParam !== VIEWER.ABOUT) {
            fetchAlbum(this.bucket, nextUrlParam);
        }

    }

    watchForTypeChanges(nextProps) {
        const { showInViewer } = this.props;

        if (
            showInViewer.type !== nextProps.showInViewer.type &&
            nextProps.showInViewer.type === VIEWER.PHOTOS
        ) {
            this.initializeRefreshButtonThrottle();
            this.initializeScrollListener();

            this.setState({
                photos: nextProps.media.photoSubSet,
                showRefreshButton: false,
                didScroll: false,
            });
        }
    }

    loadAlbum() {
        const { fetchAlbum, match } = this.props;
            fetchAlbum(this.bucket, match.params.photo);
    }

    initializeRefreshButtonThrottle() {
        window.setTimeout(() => {
            this.setState({ showRefreshButton: true });
        }, 3000);
    }

    initializeScrollListener() {
        window.addEventListener(VIEWER.SCROLL, this.handleScroll);
    }

    handleScroll = () => {
        if (window.pageYOffset > 100 && !this.state.didScroll) this.onScroll();
    };

    onScroll() {
        this.setState({
            photos: this.props.media.photos,
            showRefreshButton: false,
            didScroll: true,
        });
    }

    addSubSetsToState(nextProps) {
        const { media } = this.props;

        if (media !== nextProps.media) {
            this.setState({
                photos: nextProps.media.photoSubSet,
                didScroll: false,
                showRefreshButton: false,
            });
            this.initializeRefreshButtonThrottle();
        }
    }





  isShowingSubset() {
    const { media } = this.props;
    const { photos } = this.state;
    if (media.photos.length === media.photoSubSet.length) {
      return false;
    }
    return photos.length !== media.photos.length;
  }

  isViewerCountSingle() {
    const { showInViewer } = this.props;
    return showInViewer.count === VIEWER.SINGLES;
  }

  lgCol() {
    return this.isViewerCountSingle() ? 12 : 3;
  }

  smCol() {
    return this.isViewerCountSingle() ? 12 : 6;
  }

  xsCol() {
    return this.isViewerCountSingle() ? 12 : 6;
  }

  renderHeader() {
    const { showInViewer } = this.props;

    return (
      <Col xs={12} className="text-center">
        <h1 className="viewer-header">
          {showInViewer.album} {showInViewer.type}
        </h1>
      </Col>
    );
  }

  renderPhotos() {
    const { photos } = this.state;

    return photos.map((photo, index) => {
      return (
        <Col
          key={index}
          className="no-padding"
          lg={this.lgCol()}
          sm={this.smCol()}
          xs={this.xsCol()}
        >
          <Thumbnail src={photo} alt={photo} />
        </Col>
      );
    });
  }

  renderThrottledRefreshButton() {
    const { showRefreshButton, onScroll } = this.props;

    if (this.isShowingSubset() && showRefreshButton) {
      return (
        <Col lg={this.lgCol()} sm={this.smCol()} xs={this.xsCol()}>
          <Button
            bsStyle={'link'}
            bsSize={'lg'}
            onClick={() => onScroll()}
            block
          >
            <Glyphicon glyph="refresh" />
          </Button>
        </Col>
      );
    }
  }

  render() {
    const { showInViewer, toggleShowType, history } = this.props;
    const { photos } = this.state;

    return (
      <div>
        {this.renderHeader()}
        {photos.length > 0 && this.renderPhotos()}
        {photos.length > 0 && this.renderThrottledRefreshButton()}
        {photos.length === 0 && (
          <TextSection
            showInViewer={showInViewer}
            toggleShowType={toggleShowType}
            history={history}
          />
        )}
      </div>
    );
  }
}

PhotoViewer.propTypes = {
  photos: PropTypes.array,
  showInViewer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  toggleShowType: PropTypes.func.isRequired,
  media: PropTypes.object.isRequired,
  onScroll: PropTypes.func.isRequired,
};

export default withRouter(
    connect(
        state => ({
            media: state.media,
            showInViewer: state.showInViewer,
        }),
        {
            fetchAlbumList,
            fetchAlbum,
            toggleShowAlbum,
            toggleShowType,
        },
    )(PhotoViewer),
);

