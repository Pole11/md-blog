const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: false,
    minlength: 5,
    trim: true
  },
  markdown: { // this is the actual content of the article
    type: String,
    required: true,
    minlength: 5
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }  
},
{
  timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
