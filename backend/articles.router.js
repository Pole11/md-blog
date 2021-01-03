const router = require('express').Router();
const Article = require('./article.model');
const slugify = require('slugify');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify( new JSDOM().window );

// get      /         (get all the articles)
router.route('/').get((req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get      /read/:id    (get one articles based on the id)
router.route('/read/:id').get((req, res) => {
  Article.findById( req.params.id )
    .then(article => res.json(article))
    .catch(err => res.status(400).json('Error: ' + err));
});

// post     /add
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const markdown = req.body.markdown;
  const slug = slugify(title, { lower: true, strict: true }); // create a slug from the title
  const sanitizedHtml = dompurify.sanitize(marked(markdown)); // assign to the sanitizedHtml value, the sanitized and convert to HTML version of the .md
  
  const newArticle = new Article({
    title,
    description,
    markdown,
    slug,
    sanitizedHtml
  });

  newArticle.save()
    .then(() => res.json('New article added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// post     /update/:id
router.route('/update/:id').post((req, res) => {
  Article.findById( req.params.id )
    .then(article => {
      article.title = req.body.title;
      article.description = req.body.description;
      article.markdown = req.body.markdown;
      article.slug = slugify(article.title, { lower: true, strict: true }); // create a slug from the title
      article.sanitizedHtml = dompurify.sanitize(marked(article.markdown)); // assign to the sanitizedHtml value, the sanitized and convert to HTML version of the .md
      
      article.save()
        .then(() => res.json('Article updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete   /delete/:id
router.route('/delete/:id').delete((req, res) => {
  Article.findByIdAndDelete( req.params.id )
    .then(() => res.json('Article deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
