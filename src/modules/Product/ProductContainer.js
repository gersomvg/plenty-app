import React from 'react';
import _ from 'lodash';

import Product from './Product';
import { withFetch } from 'hocs';

@withFetch
class ProductContainer extends React.Component {
    state = {
        fetchStatus: 'initial',
        product: null,
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.product && props.navigation.state.params.product) {
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

    render() {
        return (
            <Product
                {...this.state}
                onPressBack={this.handleOnPressBack}
                onReload={this.loadProduct}
            />
        );
    }
}

export { ProductContainer };
