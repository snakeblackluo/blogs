import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { History } from './utils/history';
import Store from './stores';
import { getRoute } from './utils/urls';
import Layouts from './views/Layouts';
import LoginUser from './views/Users/LoginUser';

const store = Store();

const BasicRouter = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={History}>
        <Switch>
          <Route path="/" component={Layouts} ></Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default BasicRouter;