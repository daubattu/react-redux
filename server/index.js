import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import configWebpack from '../webpack.config.js';
import users from './routes/users.js';

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);

const compiler = webpack(configWebpack);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: configWebpack.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);
