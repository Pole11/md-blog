import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import HomePage from './components/home-page.component';
import ArticlesList from './components/articles-list.component';
import Article from './components/article.component';
import AddArticle from './components/add-article.component';
import UpdateArticle from './components/update-article.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route exact path='/' component = { HomePage } />
        <Route exact path='/articles/' component = { ArticlesList } />
        <Route exact path='/articles/read/:id' component = { Article } />
        <Route exact path='/articles/add' component = { AddArticle } />
        <Route exact path='/articles/update/:id' component = { UpdateArticle } />
      </div>
    </Router>
  );
}

export default App;
