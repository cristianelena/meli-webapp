import React, { Component } from "react";
import "./List.css";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchList } from '../reducers';

class Result extends Component {
    static fetchData(store) {
        return store.dispatch(fetchList());
    }

    componentDidMount() {
        this.props.fetchList();
    }

    render() {
        let list;

        if (this.props.list) {
            const { items } = this.props.list;

            list = items.map(item => {
                return (
                    <div key={ item.id } >
                        <span>{ item.title }</span>
                        <hr />
                    </div>
                )
            });
        }

        return (
            <div className="result">
                { list }
            </div>
        );
    }
}

const mapStateToProps = state => ({ list: state.list });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Result);
