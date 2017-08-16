import proxy from 'http-proxy-middleware';
import modifyResponse from 'node-http-proxy-json';

import { formatListCategories, formatListItems, formatItem } from './formatter';
const isList = path => path.includes('?q=');

const API_TARGET = {
    HOST: 'https://api.mercadolibre.com',
    LIST: '/sites/MLA/search',
    ITEM: '/items'
};

export const proxyMiddleware = proxy({
    target: API_TARGET.HOST,
    headers: {
        accept: 'application/json'
    },
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(req.baseUrl, isList(req.originalUrl) ? API_TARGET.LIST : API_TARGET.ITEM),
    onProxyRes(proxyRes, req, res) {
        delete proxyRes.headers['content-length'];

        modifyResponse(res, proxyRes.headers['content-encoding'], body => {
            if (body) {
                if (isList(req.originalUrl)) {
                    return {
                        author: {
                            name: "",
                            lastname: ""
                        },
                        categories: formatListCategories(body),
                        items: formatListItems(body, 4)
                    };
                }
                else {
                    return {
                        author: {
                            name: "",
                            lastname: ""
                        },
                        item: formatItem(body)
                    };
                }
            }
            return { "error": "Formatter" };
        });
    }
});
