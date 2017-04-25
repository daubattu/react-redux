import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute , browserHistory} from 'react-router';
import App from './components/App.js';
import Greetings from './components/Greetings.js';
import Signup from './components/Signup.js';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Greetings}></IndexRoute>
        <Route path='/signup' component={Signup}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
