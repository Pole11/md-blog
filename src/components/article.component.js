import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import ReactHtmlParser from 'react-html-parser'; 

export default class Article extends Component {
  constructor(props) {
    super(props);

    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = {
      title: '',
      description: '',
      sanitizedHtml: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/articles/read/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          sanitizedHtml: response.data.sanitizedHtml
        })
      })
      .catch(err => console.log(err))
  }

  deleteArticle(id) {
    axios.delete('http://localhost:5000/articles/delete/' + id)
      .then(response => {
        console.log(response.data);
        window.location = '/articles/'
      })
      .catch(err => console.log(err));
    
  }

  render() {
    return (
      <div>
        <h3>{ this.state.title }</h3>
        <h6>{ this.state.description }</h6>
        <div id='content'>
          { ReactHtmlParser(this.state.sanitizedHtml) }
        </div>
        <div>
        <Link to={'/articles/update/' + this.props.match.params.id} className='btn btn-secondary'>update</Link> <button onClick={() => {this.deleteArticle(this.props.match.params.id)}} className='btn btn-danger' >delete</button>
        </div>
      </div>
    );
  }
}