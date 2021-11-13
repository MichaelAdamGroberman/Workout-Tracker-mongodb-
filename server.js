const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb+srv://<user>:<password>@<server>?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

require('./routes/htmlroutes')(app);
require('./routes/apiroutes')(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
