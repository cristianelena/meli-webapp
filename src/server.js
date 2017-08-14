import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';

const server = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.use(express.static('public'));

server.use('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <head>
        <title>Mercado Libre Web App</title>
        <link rel="stylesheet" href="/styles.css">
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <div id="root">${ renderToString(<App />) }</div>
      </body>
    </html>
  `);
});

server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.info(`Server running on http://localhost:${port} [${env}]`);
});
