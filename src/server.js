import express from 'express';
import proxy from 'http-proxy-middleware';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Template from './Template';

import configureStore from './store';
const store = configureStore();

import routes from './routes';

const server = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.use(express.static('public'));

// API Proxy
const API_MELI = 'https://api.mercadolibre.com';

const middlewareProxy = proxy({
    target: API_MELI,
    headers: {
        accept: 'application/json'
    },
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: (path, req) => {
        if (path.includes('?q=')) {
            return path.replace('/api/items', '/sites/MLA/search')
        }

        return path.replace('/api/items', '/items')
    }
});

server.use('/api/items', middlewareProxy);
//

server.use('*', (req, res, next) => {
    const promises = [];
    const url = req.originalUrl;

    routes.some(route => {
        const match = matchPath(url, route);

        if (match) {
            const fetchData = route.component.fetchData;

            if (fetchData instanceof Function) {
                promises.push(fetchData(store));
            }
        }

        return match;
    });

    Promise.all(promises)
    .then(data => {
        let context = {};

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
