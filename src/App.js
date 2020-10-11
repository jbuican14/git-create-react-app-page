import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import NavBar from './NavBar';
import HomePage from './pages/HopmePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticleSingle from './pages/ArticleSingle';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div id="page-body">
        <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/about" component={AboutPage} />
          <Route path="/articles" component={ArticlesListPage} />
          <Route path="/article/:name" component={ArticleSingle} />
          <Route component={PageNotFound} />
        </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;
