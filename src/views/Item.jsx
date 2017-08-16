import React, { Component } from "react";
import "./Item.css";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchItem } from '../reducers';

class Detail extends Component {
    static fetchData(store) {
        return store.dispatch(fetchItem());
    }

    componentDidMount() {
        this.props.fetchItem();
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
