import React, { Component } from "react";
import "./Result.css";

class Result extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store: isBROWSER ? window.__initialStore : props.staticContext.initialStore
        };
    }

    componentDidMount() {
        if (!this.state.store) {
            this.setState({
                store: this.props.staticContext.initialStore
            });
        }
    }

    render() {
        return (
            <div className="result">
                Resultados: { JSON.stringify(this.state.store) }
            </div>
        );
    }
}

export default Result;
