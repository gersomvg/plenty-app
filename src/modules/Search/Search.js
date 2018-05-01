import React from 'react';
import RN from 'react-native';

import {Separator} from 'common';
import {styling} from 'config';
import ProductsFiltering from './components/ProductsFiltering';
import Products from './components/Products';

export default class Search extends React.PureComponent {
    handleOnPressProduct = ({product}) => {
        RN.Keyboard.dismiss();
        this.props.onPressProduct({product});
    };

    render() {
        return (
            <RN.KeyboardAvoidingView behaviour="padding" style={styling.flexWhite}>
                {this.renderFiltering()}
                <Separator />
                {this.renderProducts()}
            </RN.KeyboardAvoidingView>
        );
    }

    renderFiltering = () => {
        return (
            <ProductsFiltering
                onPressBack={this.props.onPressBack}
                onSearch={this.props.onSearch}
                searchValue={this.props.searchValue}
            />
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
