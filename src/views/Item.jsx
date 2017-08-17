import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import './Item.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchItem } from '../reducers';

import Loader from 'components/Loader';

class Item extends Component {
    static fetchData(store, params) {
        const { id } = params;

        return store.dispatch(fetchItem(id));
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchItem(id);
    }

    render() {
        let itemMarkup = <Loader />;

        if (this.props.item) {
            const { item } = this.props.item;
            const { id, title, price, picture, shipping } = item;

            const imgShipping = shipping ? <img src="/shipping.png" width="18" height="18" className="list-shipping" alt="envio gratuito"/> : null;

            itemMarkup = (
                <div className="item">
                    <Helmet>
                        <title>{ title } { price.amount.toFixed(price.decimals) } en Mercado Libre</title>
                    </Helmet>
                    <div className="item-image">
                        <img src={ picture } width="100%" alt={ title } />
                    </div>
                    <div className="item-info">
                        <h2 className="item-title">{ title }</h2>
                        <div className="item-price">{ price.currency } { price.amount.toFixed(price.decimals) }{ imgShipping }</div>
                        <button className="item-buy">Comprar</button>
                    </div>

                    <div className="item-description">
                        <h3 className="item-description-title">Descripción del producto</h3>
                        <p className="item-description-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere auctor neque id elementum. Aenean diam odio, maximus non interdum id, mattis eu dolor. Maecenas aliquam ornare imperdiet. Vivamus sit amet ex eget elit luctus congue id non erat. Fusce a elit est. Morbi et nunc congue ex porttitor faucibus at eget tellus. Curabitur mauris est, laoreet et ipsum a, vulputate accumsan augue. Integer eu massa ut nibh blandit accumsan. Curabitur placerat facilisis dolor sit amet aliquet.<br /><br />
                            Phasellus tempor finibus turpis non tristique. Etiam viverra ipsum non nibh rhoncus, nec venenatis ex volutpat. Quisque at eleifend ipsum. Nulla ut lectus id turpis feugiat posuere sit amet quis sem. Curabitur augue nisl, viverra at erat eu, finibus posuere ante. Quisque sed eros ultrices nisl ultricies ornare. Praesent non efficitur purus, eu auctor dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc pulvinar rutrum nisl in ornare. Duis sollicitudin at enim nec iaculis. In venenatis porta quam, eu dignissim neque.
                        </p>
                    </div>
                </div>
            );
        }

        return itemMarkup;
    }
}

const mapStateToProps = state => ({ item: state.item });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Item);
