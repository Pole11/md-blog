const  express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost/md-blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Server is connected to the MongoDB!')
});

// REQUIRE ALL THE ROUTES
const articleRouter = require('./articles.router')

// USE ALL THE ROUTES
app.use('/articles', articleRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});

