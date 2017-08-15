import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import App from './App';
import Template from './Template';
import routes from './routes';

const server = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.use(express.static('public'));

server.use('*', (req, res, next) => {
    const promises = [];

    routes.some(route => {
        const match = matchPath(req.originalUrl, route);

        if (match) {
            promises.push(route.loadData(match))
        }

        return match
    });

    Promise.all(promises)
    .then(data => {
        const context = { initialStore: data };
        const markup = renderToString(
            <StaticRouter location={ req.originalUrl } context={ context }>
                <App />
            </StaticRouter>
        );

        res.send(Template(markup, data));
    })
    .catch(next);

});

server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.info(`Server running on http://localhost:${port} [${env}]`);
});
