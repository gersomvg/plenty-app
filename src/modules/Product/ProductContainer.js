import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Product from './Product';
import { withFetch } from 'hocs';

@withFetch
@connect(({ auth }) => ({
    isAuthorized: auth.status === 'AUTHORIZED',
}))
class ProductContainer extends React.Component {
    state = {
        fetchStatus: 'initial',
        product: null,
    };

    static getDerivedStateFromProps(props, state) {
        const product = props.navigation.getParam('product');
        if (
            (!state.product && product) ||
            (product && state.product && state.product.updatedAt !== product.updatedAt)
        ) {
            return {
                product: props.navigation.state.params.product,
                fetchStatus: 'loaded',
            };
        }
        return null;
    }

    componentDidMount() {
        if (!this.state.product) this.loadProduct();
    }

    loadProduct = async () => {
        if (this.state.fetchStatus === 'loading') return;

        try {
            this.setState({ fetchStatus: 'loading' });
            let data;
            if (this.props.navigation.state.params.productId) {
                data = await this.props.fetch.products.getOne({
                    id: this.props.navigation.state.params.productId,
                }).promise;
            } else {
                data = await this.props.fetch.products.getOneByBarcode({
                    barcode: this.props.navigation.state.params.barcode,
                }).promise;
            }
            this.setState({ fetchStatus: 'loaded', product: data });
        } catch (e) {
            if (e.isCanceled) return;
            const fetchStatus = e.status === 404 ? 'notfound' : 'error';
            this.setState({ fetchStatus });
        }
    };

    handleOnPressBack = () => {
        this.props.navigation.pop();
    };

    handleOnPressEdit = () => {
        this.props.navigation.push('ProductEditor', {
            product: this.state.product,
            prevRouteKey: this.props.navigation.state.key,
        });
    };

    render() {
        return (
            <Product
                {...this.state}
                onPressBack={this.handleOnPressBack}
                onPressEdit={this.handleOnPressEdit}
                onReload={this.loadProduct}
                isAuthorized={this.props.isAuthorized}
            />
        );
    }
}

export { ProductContainer };
