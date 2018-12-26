import { createStore, compose, applyMiddleware } from 'redux';
import {routerMiddleware} from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { History } from '../utils/history';
import { USE_REDUX_LOG } from '../constants/config';
import createRootReducer  from '../reducers';
import api from '../middleware/api';

const stores = (initState={}) => {
    
    const middleware = [
        routerMiddleware(History),
        thunk,
        api,
    ];
    if (USE_REDUX_LOG) {
        middleware.push(createLogger({collapsed: true, diff: true}));
    }

    const enhancers = [];
    let composeEnhancers = compose;
  
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }

    const store = createStore(
        createRootReducer,
        initState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers,
        ),
    );
    store.asyncReducers = {};
    
    if (module.hot) {
        module.hot.accept('../reducers', () => {
          const reducers = require('../reducers').default;
          store.replaceReducer(reducers(store.asyncReducers));
        });
    }
    return store;
};

export default stores;

