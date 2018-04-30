import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text} from 'common';

export default class Shops extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
    };

    render() {
        return (
            <RN.View style={styles.container}>
                <Text>Winkels</Text>
                {this.renderShops()}
                {this.renderScope()}
            </RN.View>
        );
    }

    renderShops = () => {
        return (
            <RN.View style={styles.shops}>{this.props.product.shops.map(this.renderShop)}</RN.View>
        );
    };

    renderShop = (shop, index) => {
        return (
            <RN.View style={styles.shopContainer} key={index}>
                <RN.Image style={styles.shopImage} source={{uri: shop.imageUrl}} />
            </RN.View>
        );
    };

    renderScope = () => {
        return (
            <Text color="lighter" size="smaller" style={styles.scope}>
                De volgende winkels worden momenteel meegenomen in de winkelinformatie:
            </Text>
        );
    };
}

const styles = RN.StyleSheet.create({
    container: {
        paddingVertical: 32,
    },
    shops: {
        paddingHorizontal: 8,
        marginTop: 32,
        marginBottom: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    shopContainer: {
        marginHorizontal: 8,
        marginBottom: 16,
        height: 60,
        width: 80,
        borderRadius: 6,
        overflow: 'hidden',
    },
    shopImage: {
        height: 60,
        width: 80,
        resizeMode: 'contain',
    },
    scope: {
        paddingHorizontal: 16,
    },
});
