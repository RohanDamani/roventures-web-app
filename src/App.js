import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-select/dist/react-select.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from './reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import Routes from './Routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
);

const App = () => {
    //needed for material-ui
    injectTapEventPlugin();

    return (
        <MuiThemeProvider>
            <HashRouter>
                <Provider store={store}>
                    <Routes />
                </Provider>
            </HashRouter>
        </MuiThemeProvider>
    );
};

export default App;
