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
        path: '/items',
        component: Result,
        exact: true
    },
    {
        path: '/items/:id',
        component: Detail,
        exact: true
    }
];

export default routes;
