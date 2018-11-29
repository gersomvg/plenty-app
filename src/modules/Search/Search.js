import React from 'react';
import RN from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import { withNavigationFocus } from 'react-navigation';

import { withFetch } from 'hocs';
import { getSafeTopHeight, logger } from 'utils';
import { ElevatedHeader } from 'common';
import { Header, Products, FilterDropdown } from './components';
import { styling } from 'config';

@withNavigationFocus
@withFetch
class Search extends React.PureComponent {
    state = {
        fetchStatus: 'initial',
        fetchMoreStatus: 'initial',
        products: [],
        nextLink: null,

        // One of null, 'shop', 'classification', 'admin'
        activeFilterDropdown: null,

        collapseSubTags: false,

        // Filters
        name: '',
        shopCode: null,
        classifications: null,
        withoutTag: false,
        withoutBarcode: false,
        archived: false,

        copiedParams: false,
    };

    get tagId() {
        return _.get(this.props, 'navigation.state.params.tagId');
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.copiedParams) {
            const { params } = props.navigation.state;
            return {
                name: _.get(params, 'name') || '',
                shopCode: _.get(params, 'shopCode') || null,
                classifications: _.get(params, 'classifications') || null,
                collapseSubTags: _.get(params, 'collapseSubTags') || false,
                copiedParams: true,
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
                name: this.state.name,
                tagId: this.tagId,
                shopCode: this.state.shopCode,
                classifications: this.state.classifications,
                withoutTag: this.state.withoutTag,
                withoutBarcode: this.state.withoutBarcode,
                archived: this.state.archived,
            });
            const data = await this.fetch.promise;
            this.setState({ fetchStatus: 'loaded', products: data.items, nextLink: data.nextLink });
        } catch (e) {
            if (!e.isCanceled) {
                logger.error(e);
                this.setState({ fetchStatus: 'error' });
            }
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

    handleOnPressSubTag = tagId => {
        RN.Keyboard.dismiss();
        this.props.navigation.push('Search', {
            tagId,
            name: this.state.name,
            shopCode: this.state.shopCode,
            classifications: this.state.classifications,
        });
    };

    handleOnPressBack = () => {
        this.props.navigation.pop();
    };

    openFilterDropdown = type => {
        this.setState(state => ({
            activeFilterDropdown: state.activeFilterDropdown === type ? null : type,
        }));
    };

    closeFilterDropdown = () => {
        this.setState({ activeFilterDropdown: null });
    };

    handleOnSearch = name => {
        this.setState({ name, collapseSubTags: true });
        this.loadProductsDebounced();
    };

    handleChangeShop = shopCode => {
        this.setState({ shopCode }, this.loadProducts);
    };
    handleChangeClassifications = classifications => {
        this.setState({ classifications }, this.loadProducts);
    };
    handleChangeWithoutTag = withoutTag => {
        this.setState({ withoutTag }, this.loadProducts);
    };
    handleChangeWithoutBarcode = withoutBarcode => {
        this.setState({ withoutBarcode }, this.loadProducts);
    };
    handleChangeArchived = archived => {
        this.setState({ archived }, this.loadProducts);
    };
    toggleCollapseSubTags = () => {
        this.setState(state => ({ collapseSubTags: !state.collapseSubTags }));
    };
    render() {
        return (
            <RN.KeyboardAvoidingView
                behavior={RN.Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.screen}
            >
                {this.props.isFocused && (
                    <RN.StatusBar
                        backgroundColor={styling.COLOR_PRIMARY}
                        barStyle="light-content"
                    />
                )}
                <ElevatedHeader style={styles.header} contentContainerStyle={styles.headerContent}>
                    <Header
                        onPressBack={this.handleOnPressBack}
                        onPressFilter={this.openFilterDropdown}
                        onPressSearch={this.closeFilterDropdown}
                        onSearch={this.handleOnSearch}
                        autoFocus={!!_.get(this.props.navigation.state, 'params.autoFocus')}
                        name={this.state.name}
                        classifications={this.state.classifications}
                        shopCode={this.state.shopCode}
                        withoutTag={this.state.withoutTag}
                        withoutBarcode={this.state.withoutBarcode}
                        archived={this.state.archived}
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
                    collapseSubTags={this.state.collapseSubTags}
                    onToggleCollapse={this.toggleCollapseSubTags}
                    tagId={this.tagId}
                    onPressTag={this.handleOnPressSubTag}
                />
                {this.state.activeFilterDropdown && (
                    <FilterDropdown
                        style={styles.filterDropdown}
                        activeFilter={this.state.activeFilterDropdown}
                        onClose={this.closeFilterDropdown}
                        shopCode={this.state.shopCode}
                        onChangeShop={this.handleChangeShop}
                        classifications={this.state.classifications}
                        onChangeClassifications={this.handleChangeClassifications}
                        withoutTag={this.state.withoutTag}
                        onChangeWithoutTag={this.handleChangeWithoutTag}
                        withoutBarcode={this.state.withoutBarcode}
                        onChangeWithoutBarcode={this.handleChangeWithoutBarcode}
                        archived={this.state.archived}
                        onChangeArchived={this.handleChangeArchived}
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
        zIndex: 3,
    },
    headerContent: {
        backgroundColor: styling.COLOR_PRIMARY,
        borderColor: styling.COLOR_PRIMARY,
    },
    products: {
        zIndex: 1,
        marginTop: Header.HEIGHT + getSafeTopHeight(),
    },
    filterDropdown: {
        zIndex: 2,
        position: 'absolute',
        top: Header.HEIGHT + getSafeTopHeight(),
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export { Search };
