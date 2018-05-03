import React from 'react';
import RN from 'react-native';

import {ElevatedHeader} from 'common';
import {ProductsFiltering, Products} from './components';
import {getSafeTopHeight} from 'utils';

export default class Search extends React.PureComponent {
    handleOnPressProduct = ({product}) => {
        RN.Keyboard.dismiss();
        this.props.onPressProduct({product});
    };

    render() {
        return (
            <RN.KeyboardAvoidingView behavior="padding" style={styles.screen}>
                <ElevatedHeader style={styles.header}>
                    <ProductsFiltering
                        onPressBack={this.props.onPressBack}
                        onSearch={this.props.onSearch}
                        searchValue={this.props.searchValue}
                    />
                </ElevatedHeader>
                <Products
                    style={styles.products}
                    products={this.props.products}
                    fetchStatus={this.props.fetchStatus}
                    fetchMoreStatus={this.props.fetchMoreStatus}
                    onPressProduct={this.handleOnPressProduct}
                    onLoad={this.props.onLoad}
                    onLoadMore={this.props.onLoadMore}
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
