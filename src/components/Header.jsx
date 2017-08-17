import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';

import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSearch.bind(this);
    }

    onSearch(ev) {
        ev.preventDefault();

        this.props.history.push(`/list/${ this.search.value }`);
    }

    render() {
        return (
            <header className="header">
                <Link to="/" className="header-logo"><img src="/logo.png" alt="Mercado Libre" /></Link>
                <form action="/list/" className="header-form" onSubmit={ this.onSubmit }>
                    <input type="text" name="search" ref={ search => (this.search = search) } placeholder="Nunca dejes de buscar" className="header-input" />
                    <button type="submit" className="header-submit">buscar</button>
                </form>
            </header>
        );
    }
}

export default withRouter(Header);
