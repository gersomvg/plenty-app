import React from 'react';
import RN from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

import { withFetch } from 'hocs';
import { getSafeTopHeight } from 'utils';
import { ElevatedHeader } from 'common';
import { FilterTools, Products, FilterModal } from './components';

@withFetch
class Search extends React.PureComponent {
    state = {
        searchValue: null,
        fetchStatus: 'initial',
        fetchMoreStatus: 'initial',
        products: [],
        nextLink: null,
        showFilterModal: false,
        filters: null,
    };

    static getDerivedStateFromProps(props, state) {
        if (state.filters === null) {
            return {
                filters: {
                    shopCode: null,
                    categoryId: _.get(props, 'navigation.state.params.categoryId') || null,
                    classifications:
                        _.get(props, 'navigation.state.params.classifications') || null,
                },
            };
        }
        return null;
    }

    componentDidMount() {
        this.loadProducts();
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
            this.fetch = this.props.fetch('products.get')({
                name: this.state.searchValue,
                categoryId: this.state.filters.categoryId,
                shopCode: this.state.filters.shopCode,
                classifications: this.state.filters.classifications,
            });
            const data = await this.fetch.promise;
            this.setState({ fetchStatus: 'loaded', products: data.items, nextLink: data.nextLink });
        } catch (e) {
            if (!e.isCanceled) this.setState({ fetchStatus: 'error' });
        }
    };
    loadProductsDebounced = _.debounce(this.loadProducts, 200);

    loadMoreProducts = async ({ retryAfterError = false } = {}) => {
        const { fetchStatus, fetchMoreStatus, nextLink } = this.state;
        const blockedOnLoading = fetchStatus !== 'loaded' || fetchMoreStatus === 'loading';
        const blockedOnError = fetchMoreStatus === 'error' && !retryAfterError;
        if (blockedOnLoading || blockedOnError || !nextLink) return;

        try {
            this.setState({ fetchMoreStatus: 'loading' });
            this.fetchMore = this.props.fetch('products.get')({ nextLink: nextLink });
            const data = await this.fetchMore.promise;
            this.setState(state => ({
                ...state,
                fetchMoreStatus: 'loaded',
                products: _.uniqBy(state.products.concat(data.items), item => item.id),
                nextLink: data.nextLink,
            }));
        } catch (e) {
            if (!e.isCanceled) this.setState({ fetchMoreStatus: 'error' });
        }
    };

    handleOnPressProduct = ({ product }) => {
        RN.Keyboard.dismiss();
        this.props.navigation.push('Product', { product });
    };

    handleOnPressBack = () => {
        this.props.navigation.pop();
    };

    openFilterModal = () => {
        this.setState({ showFilterModal: true });
    };

    closeFilterModal = () => {
        this.setState({ showFilterModal: false });
    };

    handleOnChangeFilters = async filters => {
        await this.setState({ filters });
        this.loadProducts();
    };

    handleOnRemoveFilter = async filterKey => {
        await this.setState(state => ({
            ...state,
            filters: { ...state.filters, [filterKey]: null },
        }));
        this.loadProducts();
    };

    handleOnSearch = searchValue => {
        this.setState({ searchValue });
        this.loadProductsDebounced();
    };

    render() {
        const isAnyFilterActive = !!(
            this.state.filters.categoryId ||
            this.state.filters.shopCode ||
            this.state.filters.classifications
        );
        return (
            <RN.KeyboardAvoidingView
                behavior={RN.Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.screen}
            >
                <ElevatedHeader style={styles.header}>
                    <FilterTools
                        onPressBack={this.handleOnPressBack}
                        onPressFilter={this.openFilterModal}
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
                    reachedBottom={!this.state.nextLink}
                    filters={this.state.filters}
                    onPressFilter={this.openFilterModal}
                    onRemoveFilter={this.handleOnRemoveFilter}
                    isAnyFilterActive={isAnyFilterActive}
                />
                {this.state.showFilterModal && (
                    <FilterModal
                        filters={this.state.filters}
                        onChange={this.handleOnChangeFilters}
                        onClose={this.closeFilterModal}
                    />
                )}
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
        marginTop: FilterTools.HEIGHT + getSafeTopHeight(),
    },
});

export { Search };
