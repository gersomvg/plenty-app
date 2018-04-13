import React from 'react';
import RN from 'react-native';

import Root from 'common/Root';
import Box from 'common/Box';
import Separator from 'common/Separator';
import ProductsFiltering from './components/ProductsFiltering';
import Products from './components/Products';

export default class Search extends React.PureComponent {
    handleOnPressProduct = () => {
        RN.Keyboard.dismiss();
    };

    render() {
        return (
            <Root>
                {this.renderFiltering()}
                <Separator />
                {this.renderProducts()}
            </Root>
        );
    }

    renderFiltering = () => {
        return (
            <Box safeTop left="none">
                <ProductsFiltering
                    onPressBack={this.props.onPressBack}
                    onSearch={this.props.onSearch}
                    searchValue={this.props.searchValue}
                />
            </Box>
        );
    };

    renderProducts = () => {
        return (
            <Products
                products={this.props.products}
                fetchStatus={this.props.fetchStatus}
                fetchMoreStatus={this.props.fetchMoreStatus}
                onPressProduct={this.handleOnPressProduct}
                onLoad={this.props.onLoad}
                onLoadMore={this.props.onLoadMore}
            />
        );
    };
}
