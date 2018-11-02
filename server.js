const express = require('express');

const app = express();


// Server Routes go above app.get('*') or if statement
// Database connections
// Api connections
// app.get('/hello', (req, res) => res.send({hi: 'there'}));

// to run in production the next line
// NODE_ENV=production node server.js

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
// procees.env.PORT will run whatever port is needed by service like cloud9, aws, etc
app.listen(process.env.PORT || 3050, () => console.log('Listening'));