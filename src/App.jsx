import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import "./App.css";
import Header from './components/Header';

const App = () => {
    return (
        <Switch>
            { routes.map((route, i) => <Route key={i} {...route} />) }
        </Switch>
    );
};

export default App;
