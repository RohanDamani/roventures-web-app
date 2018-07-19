import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { getBucketUrl } from '../utils/awsUtil';
// import Get from 'lodash/get';

const initialStatePhotoViewer = {
    photoSet: [],
    isShowingSingle: false,
    didScroll: false,
    showRefreshButton: false,
};

const photoViewer = (state = initialStatePhotoViewer, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTO_SET':
        return { ...state, photoSet: action.photoSet };
    case 'TOGGLE_IS_SHOWING_SINGLE':
      return { ...state, isShowingSingle: action.isShowingSingle };
    case 'TOGGLE_DID_SCROLL':
      return { ...state, didScroll: action.didScroll };
    case 'TOGGLE_SHOW_REFRESH_BUTTON':
      return { ...state, showRefreshButton: action.showRefreshButton };
    default:
      return state;
  }
};

const initialStateEmailState = {
  loading: false,
  error: false,
  success: false,
};

const emailState = (state = initialStateEmailState, action) => {
  switch (action.type) {
    case 'TOGGLE_EMAIL_LOADING':
      return { ...state, loading: action.loading };
    case 'TOGGLE_EMAIL_ERROR':
      return { ...state, error: action.error };
    case 'TOGGLE_EMAIL_SUCCESS':
      return { ...state, success: action.success };
    default:
      return state;
  }
};

const media = (
  state = { photos: [], videos: [], photoSubSet: [], videoSubSet: [] },
  action,
) => {
  switch (action.type) {
    case 'RECEIVE_ALBUM_DATA':
      const bucketUrl = getBucketUrl;
      const photoUrlArray = [];
      const videoUrlArray = [];

      // split up the photos and videos
      action.payload.Contents.forEach(photo => {
        if (photo.Size > 0) {
          const photoKey = photo.Key;
          if (photoKey.includes('MP4') || photoKey.includes('m4v')) {
            videoUrlArray.push(bucketUrl + photoKey);
          } else {
            photoUrlArray.push(bucketUrl + photoKey);
          }
        }
      });

      // for faster loading
      const photoSubArray = photoUrlArray.slice(0, 20);
      const videoSubArray = videoUrlArray.slice(0, 4);
      return {
        ...state,
        photos: photoUrlArray,
        videos: videoUrlArray,
        photoSubSet: photoSubArray,
        videoSubSet: videoSubArray,
      };
    default:
      return state;
  }
};

const albumList = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_ALBUM_LIST':
      return action.albumList;
    default:
      return state;
  }
};

// const isLoading = (state = {}, action) => {
//     const oldValue = state[action.propertyName] || 0;
//     switch (action.type) {
//       case 'ADD_LOADING':
//         return {...state, [action.propertyName]: oldValue + 1}
//       case 'REMOVE_LOADING':
//         return {...state, [action.propertyName]: oldValue - 1}
//       default:
//         return state
//     }
//   }

//   export const isLoadingSelector = (state, propertyName) => {
//     return Get(state, ['isLoading', propertyName], 0);
//   }

const reducers = combineReducers({
  photoViewer,
  emailState,
  media,
  albumList,
  form: formReducer,
});

export default reducers;
