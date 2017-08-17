import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import { proxyMiddleware } from './middlewares';

import App from './App';
import Template from './Template';

import configureStore from './store';
const store = configureStore();

import routes from './routes';

const server = express();
const port = process.env.PORT || SERVER_PORT;
const env = process.env.NODE_ENV || 'production';

server.use(express.static('public'));

server.use('/api/items', proxyMiddleware);

server.use('*', (req, res, next) => {
    const promises = [];
    const url = req.originalUrl;

    routes.some(route => {
        const match = matchPath(url, route);

        if (match) {
            const fetchData = route.component.fetchData;
            const { params } = match;

            if (fetchData instanceof Function) {
                promises.push(fetchData(store, params));
            }
        }

        return match;
    });

    Promise.all(promises)
    .then(data => {
        const context = {};

        const markup = renderToString(
            <Provider store={ store }>
                <StaticRouter location={ url } context={ context }>
                    <App />
                </StaticRouter>
            </Provider>
        );

        res.send(Template(markup, store.getState()));
    })
    .catch(next);
});

server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.info(`Server running on http://localhost:${port} [${env}]`);
});
