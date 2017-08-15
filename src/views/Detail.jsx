import React, { Component } from "react";
import "./Detail.css";

class Detail extends Component {
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
            <div className="detail">
                Detalle: { JSON.stringify(this.state.store) }
            </div>
        );
    }
}

export default Detail;
