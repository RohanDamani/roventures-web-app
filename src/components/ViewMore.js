import React from 'react';
import { Image } from 'react-bootstrap';
import videos from '../videos';
import thumbnails from '../thumbnails';
import { PATH, VIEW_MORE } from '../utils/constants';

class ViewMore extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="view-more-container">
        <section className="view-more-section">
          <header className="view-more-header">{VIEW_MORE.VIDEO_TITLE}</header>
          <main className="view-more-main">
            {videos.map(video => {
              if (!history.location.pathname.includes(video.label)) {
                return (
                  <div key={video.label} className="view-more-item">
                    <Image
                      src={video.image}
                      className="view-more-image"
                      onClick={() => history.push(PATH.VIDEOS + '/' + video.label)}
                    />
                    <label className="view-more-image-label">{video.label}</label>
                  </div>
                );
              }
              return null;
            })}
          </main>
        </section>
        <section className="view-more-section">
          <header className="view-more-header">{VIEW_MORE.PHOTO_TITLE}</header>
          <main className="view-more-main">
            {thumbnails.map((thumb, i) => {
              const imageRequest = JSON.stringify({
                bucket: 'roventures-pictures',
                key: thumb.image,
                edits: {
                  resize: {
                    width: 261,
                    height: 261,
                    // fit: 'contain',
                  },
                  rotate: null,
                },
              });

              const url = `https://d1ces9xr9kdl0s.cloudfront.net/${btoa(imageRequest)}`;

              return (
                <div key={thumb.label} className="view-more-item">
                  <Image
                    src={url}
                    className="view-more-image"
                    onClick={() => history.push(PATH.PHOTOS + '/' + thumb.label)}
                  />
                  <label className="view-more-image-label">{thumb.label}</label>
                </div>
              );
            })}
          </main>
        </section>
      </div>
    );
  }
}

export default ViewMore;
