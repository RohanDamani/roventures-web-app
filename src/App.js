import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import reducers from './reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import Routes from './Routes';
import Main from './components/Main';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

const App = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Main>
          <Routes />
        </Main>
      </Provider>
    </HashRouter>
  );
};

export default App;
