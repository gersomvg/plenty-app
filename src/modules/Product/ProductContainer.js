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
    constructor(props) {
        super(props);
        this.state = {
            fetchStatus: this.product ? 'loaded' : 'initial',
        };
    }

    get product() {
        return this.props.navigation.getParam('product');
    }

    componentDidMount() {
        if (!this.product) this.loadProduct();
    }

    loadProduct = async () => {
        if (this.state.fetchStatus === 'loading') return;

        try {
            this.setState({ fetchStatus: 'loading' });
            let data;
            const id = this.props.navigation.getParam('productId');
            if (id) {
                data = await this.props.fetch('products.getOne')({ id }).promise;
            } else {
                const barcode = this.props.navigation.getParam('barcode');
                data = await this.props.fetch('products.getOneByBarcode')({ barcode }).promise;
            }
            this.props.navigation.setParams({ product });
            this.setState({ fetchStatus: 'loaded' });
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
            product: this.product,
            onUpdate: product => this.props.navigation.setParams({ product }),
        });
    };

    render() {
        return (
            <Product
                fetchStatus={this.state.fetchStatus}
                product={this.product}
                requestedBarcode={this.props.navigation.getParam('barcode')}
                onPressBack={this.handleOnPressBack}
                onPressEdit={this.handleOnPressEdit}
                onReload={this.loadProduct}
                isAuthorized={this.props.isAuthorized}
            />
        );
    }
}

export { ProductContainer };
