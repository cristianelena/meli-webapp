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
                <li><Link to="/list/iphone">Búsqueda search=iphone</Link></li>
                <li><Link to="/items/MLA664934899">Detalle ID:MLA664934899</Link></li>
            </ul>
            <Switch>
                { routes.map((route, i) => <Route key={i} {...route} />) }
            </Switch>
        </div>
    );
};

export default App;
