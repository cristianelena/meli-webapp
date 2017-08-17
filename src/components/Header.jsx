import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <form action="/list/">
                    <input type="text" name="search" placeholder="Nunca dejes de buscar" />
                    <button type="submit">buscar</button>
                </form>
            </header>
        );
    }
}

export default Header;
