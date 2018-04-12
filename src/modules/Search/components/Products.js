import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import Product from './Product';

import getBottomSafeHeight from 'utils/getBottomSafeHeight';

export default class Products extends React.PureComponent {
    static propTypes = {
        products: PT.array.isRequired,
        onPressProduct: PT.func.isRequired,
    };

    keyExtractor = item => item.id.toString();

    getItemLayout = (data, index) => ({
        length: Product.height,
        offset: index * Product.height + 8,
        index,
    });

    render() {
        return (
            <RN.FlatList
                contentContainerStyle={styles.contentContainer}
                data={this.props.products}
                renderItem={this.renderItem}
                getItemLayout={this.getItemLayout}
                keyExtractor={this.keyExtractor}
                windowSize={3}
                keyboardShouldPersistTaps="handled"
            />
        );
    }

    renderItem = ({item}) => {
        const onPress = () => this.props.onPressProduct(item);
        return <Product product={item} onPress={onPress} />;
    };
}

const styles = RN.StyleSheet.create({
    contentContainer: {
        paddingTop: 8,
        paddingBottom: 8 + getBottomSafeHeight(),
    },
});
