import 'isomorphic-fetch';

import Home from './views/Home';
import Result from './views/Result';
import Detail from './views/Detail';

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/items/:id',
        component: Detail,
        loadData: args => loadData(args),
        exact: true
    },
    {
        path: '/list/:query',
        component: Result,
        loadData: args => loadData(args),
        exact: true
    }
];

const loadData = args => {
    const { id, query } = args.params;
    let url;

    if (id) {
        url = `https://api.mercadolibre.com/items/${ id }`
    }
    else if (query) {
        url = `https://api.mercadolibre.com/sites/MLA/search?q=${ query }`
    }

    if (!url) {
        return {};
    }

    return fetch(url)
    .then(res => res.json())
    .catch(error => console.error(error));
};

export default routes;
