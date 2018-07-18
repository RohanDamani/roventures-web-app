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
            <Route path="/videos/:video?" component={VideoViewer} />
            <Route path="/photos/:photo?" component={PhotoViewer} />
            {/*<Route path="/about" component={Viewer}/>*/}
            <Redirect from="/" to="/videos" />
          </Switch>{' '}
        </Main>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
