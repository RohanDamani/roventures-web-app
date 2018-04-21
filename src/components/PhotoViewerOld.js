import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import AWS from 'aws-sdk';
import { Glyphicon, Modal, Image } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-up';
import ButtonSection from './ButtonSection';
import PhotoSection from './PhotoSection';
import OptionSection from './OptionSection';
import Homepage from './Homepage';

class PhotoViewerOld extends Component {
  state = {
    albums: [],
    photos: [],
    videos: [],
    showMenu: true,
    showOptions: true,
    showModal: false,
    showVideos: false,
    showHomepage: true,
    isLoading: false,
  };

  componentDidMount() {
    const cognitoRegion = process.env.REACT_APP_COGNITO_REGION;
    const identityPoolId = process.env.REACT_APP_IDENTITY_POOL_ID;
    const bucketRegion = process.env.REACT_APP_BUCKET_REGION;
    const bucketName = process.env.REACT_APP_BUCKET_NAME;

    AWS.config.update({
      region: cognitoRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
      }),
    });

    this.s3 = new AWS.S3({
      region: bucketRegion,
      apiVersion: '2006-03-01',
      params: { Bucket: bucketName },
    });

    this.listAlbums();
  }

  listAlbums() {
    this.s3.listObjects({ Delimiter: '/' }, (err, data) => {
      if (err) {
        return alert('There was an error listing your albums: ' + err.message);
      }
      const album = data.CommonPrefixes.map(commonPrefix => {
        const prefix = commonPrefix.Prefix;
        return decodeURIComponent(prefix.replace('/', ''));
      });
      this.setState({ albums: album });
    });
  }

  viewAlbum = album => {
    const bucketRegion = process.env.REACT_APP_BUCKET_REGION;
    const bucketName = process.env.REACT_APP_BUCKET_NAME;

    this.toggleHomepage(false);
    this.setState({ photos: [], videos: [] });
    this.toggleLoading(true);

    this.s3.listObjects({ Prefix: album }, (err, data) => {
      if (err) {
        return alert('There was an error viewing your album: ' + err.message);
      }
      const bucketUrl = `https://s3-${bucketRegion}.amazonaws.com/${bucketName}/`;
      const photoUrlArray = [];
      const videoUrlArray = [];
      data.Contents.forEach(photo => {
        if (photo.Size > 0) {
          const photoKey = photo.Key;
          if (photoKey.includes('MP4') || photoKey.includes('m4v')) {
            videoUrlArray.push(bucketUrl + photoKey);
          } else {
            photoUrlArray.push(bucketUrl + photoKey);
          }
        }
      });
      this.setState({
        photos: photoUrlArray,
        videos: videoUrlArray,
        isLoading: false,
      });
    });
  };

  toggleHomepage = bool => {
    this.setState({ showHomepage: bool });
  };

  toggleOptions = bool => {
    this.setState({ showOptions: bool });
  };

  toggleLoading = bool => {
    this.setState({ isLoading: bool });
  };

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  toggleVideos = () => {
    this.setState({ showVideos: !this.state.showVideos });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = photo => {
    this.setState({ showModal: photo });
  };

  render() {
    return (
        <div>
          {!this.state.albums.length && (
            <CircularProgress
              className="progress-margin-top"
              size={80}
              thickness={5}
            />
          )}
          {this.state.albums.length > 0 && (
            <div>
              <ButtonSection
                albums={this.state.albums}
                viewAlbum={this.viewAlbum}
                toggleMenu={this.toggleMenu}
                showMenu={this.state.showMenu}
                toggleVideos={this.toggleVideos}
                toggleOptions={this.toggleOptions}
                showOptions={this.state.showOptions}
                toggleHomepage={this.toggleHomepage}
                showHomepage={this.state.showHomepage}
              />

              {this.state.showHomepage && (
                <Homepage showMenu={this.state.showMenu} />
              )}

              {!this.state.showHomepage &&
                this.state.showOptions && (
                  <OptionSection
                    toggleMenu={this.toggleMenu}
                    showMenu={this.state.showMenu}
                    toggleVideos={this.toggleVideos}
                    showVideos={this.state.showVideos}
                    toggleOptions={this.toggleOptions}
                  />
                )}

              {!this.state.showHomepage && (
                <PhotoSection
                  photos={this.state.photos}
                  videos={this.state.videos}
                  openModal={this.openModal}
                  showMenu={this.state.showMenu}
                  toggleMenu={this.toggleMenu}
                  toggleVideos={this.toggleVideos}
                  showVideos={this.state.showVideos}
                  showOptions={this.state.showOptions}
                  showHomepage={this.state.showHomepage}
                  isLoading={this.state.isLoading}
                />
              )}

              <Modal
                show={this.state.showModal !== false}
                onHide={this.closeModal}
              >
                <Image src={this.state.showModal} alt={this.state.showModal} />
              </Modal>

              <ScrollToTop showUnder={100}>
                <div className="scroll-up-button">
                  <Glyphicon glyph="arrow-up" className="scroll-up-icon" />
                </div>
              </ScrollToTop>
            </div>
          )}
        </div>
    );
  }
}

export default PhotoViewerOld;
