import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Get from 'lodash/get';
//
// const isLeftNavOpen = (state = true, action) => {
//     switch (action.type) {
//         case 'TOGGLE_LEFT_NAV':
//             return !state;
//         default:
//             return state;
//     }
// };
//
// const isRightNavOpen = (state = false, action) => {
//     switch (action.type) {
//         case 'TOGGLE_RIGHT_NAV':
//             return !state;
//         case 'UPDATE_RIGHT_NAV':
//             return true;
//         default:
//             return state;
//     }
// };
//
// const rightNavData = (state = {}, action) => {
//     switch (action.type) {
//         case 'UPDATE_RIGHT_NAV':
//             return action.data;
//         default:
//             return state;
//     }
// };
//
// const stockQuotes = (state = [], action) => {
//     switch (action.type) {
//         case 'RECEIVE_STOCK_QUOTES':
//             return action.quotes;
//         default:
//             return state;
//     }
// };
//
// const companyFinancials = (state = [], action) => {
//     switch (action.type) {
//         case 'RECEIVE_COMPANY_FINANCIALS':
//             return action.financials;
//         default:
//             return state;
//     }
// };
//
// const openSection = (state = 1, action) => {
//     switch (action.type) {
//         case 'UPDATE_OPEN_SECTION':
//             return action.section;
//         default:
//             return state;
//     }
// };
//
// const compare = (state = [], action) => {
//     switch (action.type) {
//         case 'ADD_TO__COMPARE':
//             return [...state, action.record];
//         case 'REMOVE_FROM_COMPARE':
//             const index = state.findIndex(n => n.cik === action.record.cik);
//             return [...state.slice(0, index), ...state.slice(index + 1)];
//         default:
//             return state;
//     }
// };
//
// const searchOptions = (
//     state = [{ label: 'Start typing to add options...', value: '' }],
//     action,
// ) => {
//     switch (action.type) {
//         case 'RECEIVE_SEARCH_OPTIONS':
//             return action.options.map(option => ({
//                 label: option,
//                 value: option,
//             }));
//         case 'SELECT_SEARCH_TYPE':
//             return [{ label: 'Start typing to add options...', value: '' }];
//         default:
//             return state;
//     }
// };
//
// const searchResults = (state = {}, action) => {
//     switch (action.type) {
//         case 'RECEIVE_SEARCH_REQUEST':
//             return action.payload;
//         default:
//             return state;
//     }
// };
//
// const treeRecords = (state = {}, action) => {
//     switch (action.type) {
//         case 'RECEIVE_TREES':
//             return action.payload;
//         default:
//             return state;
//     }
// };
//
// const chartRecords = (state = [], action) => {
//     switch (action.type) {
//         case 'RECEIVE_CHART':
//             return action.payload.items;
//         default:
//             return state;
//     }
// };
//
// const searchTerms = (state = [], action) => {
//     switch (action.type) {
//         case 'RECEIVE_SEARCH_TERM':
//             return action.terms;
//         case 'SELECT_SEARCH_TYPE':
//             return [];
//         default:
//             return state;
//     }
// };
//
// const searchType = (state = 'cik_company', action) => {
//     switch (action.type) {
//         case 'SELECT_SEARCH_TYPE':
//             return action.searchType;
//         default:
//             return state;
//     }
// };
//
// const filters = (state = {}, action) => {
//     switch (action.type) {
//         case 'UPDATE__TERM_FILTERS':
//             const termFilterName = action.filterName;
//             const termValue = action.value;
//             const filterValue = state[termFilterName];
//
//             if (filterValue) {
//                 if (filterValue.includes(termValue)) {
//                     const index = filterValue.indexOf(termValue);
//                     filterValue.splice(index, 1);
//                 } else {
//                     filterValue.push(termValue);
//                 }
//                 if (filterValue.length === 0) {
//                     delete state[termFilterName];
//                 }
//                 return { ...state };
//             } else {
//                 state[termFilterName] = [termValue];
//                 return { ...state };
//             }
//
//         case 'UPDATE__RANGE_FILTERS':
//             const rangeFilterName = action.filterName;
//             const rangeValue = action.value;
//             const filterItem = state[rangeFilterName];
//
//             if (filterItem) {
//                 let rangeIncluded = -1;
//                 filterItem.forEach((range, index) => {
//                     for (let i = range.length; i--; ) {
//                         if (range[i] === rangeValue[i]) rangeIncluded = index;
//                     }
//                 });
//                 if (rangeIncluded >= 0) {
//                     filterItem.splice(rangeIncluded, 1);
//                 } else {
//                     filterItem.push(rangeValue);
//                 }
//                 if (filterItem.length === 0) {
//                     delete state[rangeFilterName];
//                 }
//                 return { ...state };
//             } else {
//                 state[rangeFilterName] = [rangeValue];
//                 return { ...state };
//             }
//
//         case 'SELECT_SEARCH_TYPE':
//             return {};
//         default:
//             return state;
//     }
// };
//
// const filterCollapse = (state = [], action) => {
//     switch (action.type) {
//         case 'TOGGLE_FILTER_COLLAPSE':
//             let exists = false;
//             if (state.includes(action.index)) {
//                 const i = state.indexOf(action.index);
//                 state.splice(i, 1);
//                 exists = true;
//             }
//             if (exists) {
//                 return [...state];
//             } else {
//                 return [...state, action.index];
//             }
//         default:
//             return state;
//     }
// };
//
// const activeFrameworkView = (state = 'welcomeIntro', action) => {
//     switch (action.type) {
//         case 'UPDATE_FRAMEWORK_VIEW':
//             return action.view;
//         default:
//             return state;
//     }
// };
//
// const frameworkOptions = (state = {}, action) => {
//     switch (action.type) {
//         case 'RECEIVE_FRAMEWORKS_OPTIONS':
//             let options = [];
//             if (action.options.buyers) {
//                 options.push(action.options.buyers);
//             } else if (action.options.market_size) {
//                 options.push(action.options.market_size);
//             } else {
//                 action.options.records.forEach(option => {
//                     options.push({ label: option.title, value: option.id });
//                 });
//             }
//             return { ...state, [action.name]: options };
//         case 'DELETE_FRAMEWORKS_OPTIONS_RESULTS':
//             delete state.results;
//             return { ...state };
//         case 'DELETE_FRAMEWORKS_OPTIONS':
//             return {};
//         default:
//             return state;
//     }
// };
//
// export const frameworkOptionsSelector = (state, propertyName) => {
//     return Get(
//         state,
//         ['frameworkOptions', propertyName],
//         [{ label: '', value: '' }],
//     );
// };

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
    // auth,
    // isLeftNavOpen,
    // isRightNavOpen,
    // rightNavData,
    // stockQuotes,
    // companyFinancials,
    // openSection,
    // compare,
    // searchOptions,
    // searchResults,
    // treeRecords,
    // chartRecords,
    // searchTerms,
    // searchType,
    // filters,
    // filterCollapse,
    // activeFrameworkView,
    // frameworkOptions,
    form: formReducer,
});

export default reducers;
