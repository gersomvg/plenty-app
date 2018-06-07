import React from 'react';
import RN from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

import productsApi from 'api/products';
import { makeCancelable, getSafeTopHeight } from 'utils';
import { ElevatedHeader } from 'common';
import { ProductsFiltering, Products } from './components';

const initialState = {
    searchValue: null,
    fetchStatus: 'initial',
    fetchMoreStatus: 'initial',
    products: [],
    nextLink: null,
    showFilterModal: false,
    filters: null,
};

class Search extends React.Component {
    state = initialState;

    constructor() {
        super();
        this.loadProductsDebounced = _.debounce(this.loadProducts, 200);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.filters === null) {
            return {
                filters: {
                    shopCode: null,
                    categoryId: _.get(props, 'navigation.state.params.categoryId') || null,
                },
            };
        }
        return null;
    }

    componentDidMount() {
        this.loadProducts();
    }

    componentWillUnmount() {
        if (this.fetch) this.fetch.cancel();
        if (this.fetchMore) this.fetchMore.cancel();
    }

    loadProducts = async () => {
        try {
            if (this.fetch) this.fetch.cancel();
            if (this.fetchMore) this.fetchMore.cancel();
            this.setState({
                fetchStatus: 'loading',
                fetchMoreStatus: 'initial',
                products: [],
                nextLink: null,
            });
            this.fetch = makeCancelable(
                productsApi.get({
                    name: this.state.searchValue,
                    categoryId: this.state.filters.categoryId,
                    shopCode: this.state.filters.shopCode,
                }),
            );
            const data = await this.fetch.promise;
            this.setState({ fetchStatus: 'loaded', products: data.items, nextLink: data.nextLink });
        } catch (e) {
            if (e.isCanceled) return;
            this.setState({ fetchStatus: 'error' });
        }
    };

    loadMoreProducts = async ({ retryAfterError = false } = {}) => {
        const { fetchStatus, fetchMoreStatus, nextLink } = this.state;
        const blockedOnLoading = fetchStatus !== 'loaded' || fetchMoreStatus === 'loading';
        const blockedOnError = fetchMoreStatus === 'error' && !retryAfterError;
        if (blockedOnLoading || blockedOnError || !nextLink) return;

        try {
            this.setState({ fetchMoreStatus: 'loading' });
            this.fetchMore = makeCancelable(productsApi.get({ nextLink: nextLink }));
            const data = await this.fetchMore.promise;
            this.setState(state => ({
                ...state,
                fetchMoreStatus: 'loaded',
                products: _.uniqBy(state.products.concat(data.items), item => item.id),
                nextLink: data.nextLink,
            }));
        } catch (e) {
            if (e.isCanceled) return;
            this.setState({ fetchMoreStatus: 'error' });
        }
    };

    handleOnPressProduct = ({ product }) => {
        RN.Keyboard.dismiss();
        this.props.navigation.push('Product', { productId: product.id });
    };

    handleOnPressBack = () => {
        this.props.navigation.pop();
    };

    handleOnPressFilter = () => {
        this.setState({ showFilterModal: true });
    };

    handleOnSearch = searchValue => {
        this.setState({ searchValue });
        this.loadProductsDebounced();
    };

    render() {
        const isAnyFilterActive = !!(this.state.filters.categoryId || this.state.filters.shopCode);
        return (
            <RN.KeyboardAvoidingView behavior="padding" style={styles.screen}>
                <ElevatedHeader style={styles.header}>
                    <ProductsFiltering
                        onPressBack={this.handleOnPressBack}
                        onPressFilter={this.handleOnPressFilter}
                        isAnyFilterActive={isAnyFilterActive}
                        onSearch={this.handleOnSearch}
                        searchValue={this.state.searchValue}
                        autoFocus={!!_.get(this.props.navigation.state, 'params.autoFocus')}
                    />
                </ElevatedHeader>
                <Products
                    style={styles.products}
                    products={this.state.products}
                    fetchStatus={this.state.fetchStatus}
                    fetchMoreStatus={this.state.fetchMoreStatus}
                    onPressProduct={this.handleOnPressProduct}
                    onLoad={this.loadProducts}
                    onLoadMore={this.loadMoreProducts}
                />
            </RN.KeyboardAvoidingView>
        );
    }
}

const styles = RN.StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        zIndex: 2,
    },
    products: {
        zIndex: 1,
        marginTop: ProductsFiltering.HEIGHT + getSafeTopHeight(),
    },
});

export { Search };
