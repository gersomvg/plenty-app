import React from 'react';
import {NavigationActions} from 'react-navigation';
import _ from 'lodash';

import Search from './Search';

import productsApi from 'api/products';
import makeCancelable from 'utils/makeCancelable';

export default class SearchContainer extends React.PureComponent {
    state = {
        searchValue: '',
        fetchStatus: 'initial',
        fetchMoreStatus: 'initial',
        products: [],
        nextLink: null,
    };

    constructor() {
        super();
        this.loadProductsDebounced = _.debounce(this.loadProducts, 200);
    }

    componentDidMount() {
        this.loadProducts();
    }

    componentWillUnmount() {
        if (this.request) this.request.cancel();
    }

    loadProducts = async () => {
        try {
            this.setState({fetchStatus: 'loading'});
            this.request = makeCancelable(productsApi.get());
            const data = await this.request.promise;
            this.setState({fetchStatus: 'loaded', products: data.items});
        } catch (e) {
            if (e.isCanceled) return;
            this.setState({fetchStatus: 'error'});
        }
    };

    handleOnPressBack = () => {
        const goBack = NavigationActions.back();
        this.props.navigation.dispatch(goBack);
    };

    handleOnSearch = searchValue => {
        this.setState({searchValue});
    };

    render() {
        return (
            <Search
                {...this.state}
                onPressBack={this.handleOnPressBack}
                onSearch={this.handleOnSearch}
            />
        );
    }
}
