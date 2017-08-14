import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import routes from './routes';
import "./App.css";
import Header from './components/Header';

const App = () => {
    return (
        <div className="app">
            <Header />
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/items?search=iphone">Búsqueda</Link></li>
                <li><Link to="/items/1234">Detalle</Link></li>
            </ul>
            <Switch>
                { routes.map((route, i) => <Route key={i} {...route} />) }
            </Switch>
        </div>
    );
};

export default App;
