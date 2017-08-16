import 'isomorphic-fetch';

import Home from './views/Home';
import List from './views/List';
import Item from './views/Item';

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/items/:id',
        component: Item,
        exact: true
    },
    {
        path: '/list/:query',
        component: List,
        exact: true
    }
];

export default routes;
