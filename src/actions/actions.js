export const updatePhotoSet = photoSet => ({
  type: 'UPDATE_PHOTO_SET',
  photoSet,
});

export const toggleIsShowingSingle = isShowingSingle => ({
  type: 'TOGGLE_IS_SHOWING_SINGLE',
  isShowingSingle,
});

export const toggleDidScroll = didScroll => ({
  type: 'TOGGLE_DID_SCROLL',
  didScroll,
});

export const toggleShowRefreshButton = showRefreshButton => ({
  type: 'TOGGLE_SHOW_REFRESH_BUTTON',
  showRefreshButton,
});

export const toggleEmailLoading = loading => ({
  type: 'TOGGLE_EMAIL_LOADING',
  loading,
});

export const toggleEmailError = error => ({
  type: 'TOGGLE_EMAIL_ERROR',
  error,
});

export const toggleEmailSuccess = success => ({
  type: 'TOGGLE_EMAIL_SUCCESS',
  success,
});

export const addLoading = () => ({
  type: 'ADD_LOADING',
});

export const updateShowScrollTop = (showScrollTop) => ({
    type: 'UPDATE_SHOW_SCROLL_TOP',
    showScrollTop
});

export const removeLoading = () => ({
  type: 'REMOVE_LOADING',
});

const receiveAlbumList = albumList => ({
  type: 'RECEIVE_ALBUM_LIST',
  albumList,
});

const receiveAlbumData = data => ({
  type: 'RECEIVE_ALBUM_DATA',
  payload: data,
});

export const fetchAlbum = (bucket, album) => {
  return dispatch => {
    // AWS-sdk for s3 object
    bucket.listObjects({ Prefix: album }, (err, data) => {
      if (err) {
        return alert('There was an error viewing your album: ' + err.message);
      }
      dispatch(receiveAlbumData(data));
    });
  };
};

export const fetchAlbumList = bucket => {
  return dispatch => {
    // AWS-sdk for s3 object
    bucket.listObjects({ Delimiter: '/' }, (err, data) => {
      if (err) {
        return alert('There was an error listing your albums: ' + err.message);
      }
      const albumList = data.CommonPrefixes.map(commonPrefix => {
        const prefix = commonPrefix.Prefix;
        return decodeURIComponent(prefix.replace('/', ''));
      });
      dispatch(receiveAlbumList(albumList));
    });
  };
};
