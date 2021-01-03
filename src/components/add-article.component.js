import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export default class AddArticle extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMarkdown = this.onChangeMarkdown.bind(this);

    this.state = {
      title: '',
      description: '',
      markdown: ''
    }

  }

  componentDidMount() {
    //
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeMarkdown(e) {
    this.setState({
      markdown: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.title.length >= 3 && this.state.description.length >= 5 && this.state.markdown.length >= 5) { // if the input are long enough (based on the article model from the backend)
      const article = {
        title: this.state.title,
        description: this.state.description,
        markdown: this.state.markdown
      };
      axios.post('http://localhost:5000/articles/add', article)
        .then(res => {
          console.log(res.data)
          window.location = '/articles/';
        })
        .catch(err => console.log(err));
  
      this.setState = {
        title: '',
        description: '',
        markdown: ''
      }
    }

  }

  render() {
    return(
      <div>
        <h3>Add article</h3>
        <form onSubmit = {this.onSubmit}>
          <div className = 'form-group'>
            <label>Title of the Article</label>
            <input  type = 'text'
                    className = 'form-control'
                    value = { this.title }
                    onChange = { this.onChangeTitle } />
          </div>
          <div className = 'form-group'>
            <label>Description of the Article</label>
            <input  type = 'text'
                    className = 'form-control'
                    value = { this.description }
                    onChange = { this.onChangeDescription } />
          </div>
          <div className = 'form-group'>
            <label>Content (markdown) of the Article</label>
            <textarea type = 'text'
                      className = 'form-control'
                      value = { this.markdown }
                      onChange = { this.onChangeMarkdown } />
          </div>
          <div className='form-group'>
            <input type='submit' value='Add Article' className='btn btn-primary'/>
          </div>  
        </form>
      </div>
    );
  }
}