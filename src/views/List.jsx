import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./List.css";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchList } from '../reducers';

import Breadcrumb from 'components/Breadcrumb';

class Result extends Component {
    static fetchData(store, params) {
        const { query } = params;

        return store.dispatch(fetchList(query));
    }

    componentDidMount() {
        const { query } = this.props.match.params;

        this.props.fetchList(query);
    }

    componentWillReceiveProps(nextProps) {
        const locationChanged = nextProps.location.key !== this.props.location.key;

        if (locationChanged) {
            const { query } = nextProps.match.params;

            this.props.fetchList(query);
        }
    }

    render() {
        let list;
        let breadcrumb;

        if (this.props.list) {
            const { items, categories } = this.props.list;

            list = items.map(item => {
                const { id, title, price, picture, shipping } = item;
                const url = `/items/${ id }`;

                const imgShipping = shipping ? <img src="/shipping.png" width="18" height="18" className="list-shipping" alt="envio gratuito" /> : null;

                return (
                    <div key={ id } className="list-item">
                        <div className="list-image">
                            <Link to={ url }><img src={ picture } width="180" height="180" alt={ title } /></Link>
                        </div>
                        <div className="list-info">
                            <div className="list-price">{ price.currency } { price.amount.toFixed(price.decimals) }{ imgShipping }</div>
                            <h2 className="list-title"><Link to={ url }>{ title }</Link></h2>
                        </div>
                    </div>
                )
            });

            breadcrumb = <Breadcrumb paths={ categories } />
        }

        return (
            <div className="list">
                { breadcrumb }
                { list }
            </div>
        );
    }
}

const mapStateToProps = state => ({ list: state.list });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Result);
