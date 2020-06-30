import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import Weather from './components/weather/Weather';

import './index.less';

const App = () => {
  document.title = 'weather';

  return (
    <div className="app-container">
      <Switch>
        <Redirect exact from="/" to="/weather" />
        <Route exact path="/weather" component={Weather} />
      </Switch>

    </div>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'),
);
