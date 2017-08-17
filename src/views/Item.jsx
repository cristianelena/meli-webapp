import React, { Component } from "react";
import "./Item.css";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchItem } from '../reducers';

class Detail extends Component {
    static fetchData(store, params) {
        const { id } = params;

        return store.dispatch(fetchItem(id));
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchItem(id);
    }

    render() {
        return (
            <div className="detail">
                Detalle: { JSON.stringify(this.props.item) }
            </div>
        );
    }
}

const mapStateToProps = state => ({ item: state.item });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
