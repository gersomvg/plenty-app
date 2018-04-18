import React from 'react';
import {NavigationActions} from 'react-navigation';
import _ from 'lodash';

import Search from './Search';

import productsApi from 'api/products';
import makeCancelable from 'utils/makeCancelable';

export default class SearchContainer extends React.Component {
    state = {
        searchValue: null,
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
        if (this.fetch) this.fetch.cancel();
        if (this.fetchMore) this.fetchMore.cancel();
    }

    loadProducts = async () => {
        if (this.state.fetchStatus === 'loading') return;

        try {
            this.setState({fetchStatus: 'loading'});
            this.fetch = makeCancelable(productsApi.get({name: this.state.searchValue}));
            const data = await this.fetch.promise;
            this.setState({fetchStatus: 'loaded', products: data.items, nextLink: data.nextLink});
        } catch (e) {
            if (e.isCanceled) return;
            this.setState({fetchStatus: 'error'});
        }
    };

    loadMoreProducts = async ({retryAfterError = false} = {}) => {
        const {fetchStatus, fetchMoreStatus, nextLink} = this.state;
        const blockedOnLoading = fetchStatus !== 'loaded' || fetchMoreStatus === 'loading';
        const blockedOnError = fetchMoreStatus === 'error' && !retryAfterError;
        if (blockedOnLoading || blockedOnError || !nextLink) return;

        try {
            this.setState({fetchMoreStatus: 'loading'});
            this.fetchMore = makeCancelable(productsApi.get({nextLink: nextLink}));
            const data = await this.fetchMore.promise;
            this.setState(state => ({
                ...state,
                fetchMoreStatus: 'loaded',
                products: _.uniqBy(state.products.concat(data.items), item => item.id),
                nextLink: data.nextLink,
            }));
        } catch (e) {
            if (e.isCanceled) return;
            this.setState({fetchMoreStatus: 'error'});
        }
    };

    handleOnPressProduct = ({product}) => {
        const goToProduct = NavigationActions.navigate({
            routeName: 'Product',
            params: {productId: product.id},
        });
        this.props.navigation.dispatch(goToProduct);
    };

    handleOnPressBack = () => {
        const goBack = NavigationActions.back();
        this.props.navigation.dispatch(goBack);
    };

    handleOnSearch = searchValue => {
        this.setState({searchValue});
        this.loadProductsDebounced();
    };

    render() {
        return (
            <Search
                {...this.state}
                onPressProduct={this.handleOnPressProduct}
                onPressBack={this.handleOnPressBack}
                onSearch={this.handleOnSearch}
                onLoad={this.loadProducts}
                onLoadMore={this.loadMoreProducts}
            />
        );
    }
}
