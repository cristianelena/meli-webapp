import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';
import Template from './Template';

const server = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.use(express.static('public'));

server.use('/', (req, res) => {
    const markup = renderToString(<App />);

    res.send(Template(markup));
});

server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.info(`Server running on http://localhost:${port} [${env}]`);
});
