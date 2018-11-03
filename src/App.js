import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import reducers from './reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import Main from './containers/Main';
import VideoViewer from './components/VideoViewer';
import PhotoViewer from './components/PhotoViewer';
import Info from './components/Info';
import { PATH } from './utils/constants';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Main>
          <Switch>
            <Redirect from="/" exact to={PATH.VIDEOS + PATH.WELCOME_PARAM} />
            <Redirect
              from="/videos"
              exact
              to={PATH.VIDEOS + PATH.WELCOME_PARAM}
            />
            <Route
              path={`${PATH.VIDEOS}${PATH.VIDEO_PARAM}?`}
              component={VideoViewer}
            />
            <Route
              path={`${PATH.PHOTOS}${PATH.PHOTO_PARAM}?`}
              component={PhotoViewer}
            />
            <Route path={PATH.INFO} component={Info} />
            <Redirect from="/*" to={PATH.VIDEOS + PATH.WELCOME_PARAM} />
          </Switch>
        </Main>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
