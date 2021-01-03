import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const Article = props => (
    <div className='card mt-4'>
      <div className="card-body">
        <h4 className='card-title'>{props.article.title}</h4>
        <div className='card-text mb-2'>{props.article.description}</div>
        <Link to={'update/' + props.article._id} className='btn btn-secondary'>update</Link> <Link to={ 'read/' + props.article._id} className='btn btn-primary'>read more</Link> <button onClick={() => {props.deleteArticle(props.article._id)}} className='btn btn-danger' >delete</button>
      </div>
    </div>
)

export default class ArticlesList extends Component {
  constructor(props) {
    super(props);

    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = { articles: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/articles/')
      .then(response => {
        this.setState({ articles: response.data })
      })
      .catch(err => console.log(err));
  }

  deleteArticle(id) {
    axios.delete('http://localhost:5000/articles/delete/' + id)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));

    this.setState({ articles: this.state.articles.filter(el => el._id !== id)})
  }

  articlesList() {
    return this.state.articles.map(article => {
      return <Article article={article} deleteArticle={this.deleteArticle} key={article._id} />
    })
      .reverse();
  }

  render() {
    return(
      <div>
        { this.articlesList() }
      </div>
    );
  }
}