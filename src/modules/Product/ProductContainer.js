import React from 'react';
import {NavigationActions} from 'react-navigation';
import _ from 'lodash';

import Product from './Product';

import productsApi from 'api/products';
import {makeCancelable} from 'utils';

export default class ProductContainer extends React.Component {
    state = {
        fetchStatus: 'initial',
        product: null,
    };

    componentDidMount() {
        this.loadProduct();
    }

    componentWillUnmount() {
        if (this.fetch) this.fetch.cancel();
    }

    loadProduct = async () => {
        if (this.state.fetchStatus === 'loading') return;

        try {
            this.setState({fetchStatus: 'loading'});
            this.fetch = makeCancelable(
                productsApi.getOne({id: this.props.navigation.state.params.productId}),
            );
            const data = await this.fetch.promise;
            this.setState({fetchStatus: 'loaded', product: data});
        } catch (e) {
            if (e.isCanceled) return;
            this.setState({fetchStatus: 'error'});
        }
    };

    handleOnPressBack = () => {
        const goBack = NavigationActions.back();
        this.props.navigation.dispatch(goBack);
    };

    render() {
        if (!this.state.product) return null;
        return <Product {...this.state} onPressBack={this.handleOnPressBack} />;
    }
}
