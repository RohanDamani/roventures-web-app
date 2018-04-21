import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Get from 'lodash/get';

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
    albumList,
    form: formReducer
});

export default reducers;
