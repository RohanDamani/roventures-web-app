import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { VIEWER } from '../constants';
// import Get from 'lodash/get';

const initialState = {
  type: VIEWER.PHOTOS,
  count: VIEWER.MULTIPLE,
  album: VIEWER.ALBUMS,
};

const showInViewer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_TYPE':
      return { ...state, type: action.newType };
    case 'TOGGLE_SHOW_COUNT':
      return { ...state, count: action.count };
      case 'TOGGLE_SHOW_ALBUM':
          return { ...state, album: action.album };
    default:
      return state;
  }
};

const bucket = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_BUCKET':
      return action.bucket;
    default:
      return state;
  }
};

const media = (state = { photos: [], videos: [], photoSubSet: [] }, action) => {
  switch (action.type) {
    case 'RECEIVE_ALBUM_DATA':
      const bucketRegion = process.env.REACT_APP_BUCKET_REGION;
      const bucketName = process.env.REACT_APP_BUCKET_NAME;

      const bucketUrl = `https://s3-${bucketRegion}.amazonaws.com/${bucketName}/`;
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
      return { ...state, photos: photoUrlArray, videos: videoUrlArray, photoSubSet: photoSubArray };
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
  bucket,
  showInViewer,
  media,
  albumList,
  form: formReducer,
});

export default reducers;
