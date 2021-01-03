import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export default class UpdateArticle extends Component {
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
    axios.get('http://localhost:5000/articles/read/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          markdown: response.data.markdown
        });
      })
      .catch(err => console.log(err));

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
      axios.post('http://localhost:5000/articles/update/' + this.props.match.params.id, article)
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
        <h3>Update article</h3>
        <form onSubmit = {this.onSubmit}>
          <div className = 'form-group'>
            <label>Title of the Article</label>
            <input  type = 'text'
                    id = 'title-input'
                    className = 'form-control'
                    value = { this.state.title }
                    onChange = { this.onChangeTitle } />
          </div>
          <div className = 'form-group'>
            <label>Description of the Article</label>
            <input  type = 'text'
                    id = 'description-input'
                    className = 'form-control'
                    value = { this.state.description }
                    onChange = { this.onChangeDescription } />
          </div>
          <div className = 'form-group'>
            <label>Content (markdown) of the Article</label>
            <textarea type = 'text'
                      id = 'markdown-input'
                      className = 'form-control'
                      value = { this.state.markdown }
                      onChange = { this.onChangeMarkdown } />
          </div>
          <div className='form-group'>
            <input type='submit' value='Update Article' className='btn btn-primary'/>
          </div>  
        </form>
      </div>
    );
  }
}