import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { Text } from 'common';

@connect(state => ({
    shops: state.shops.items,
}))
class Shops extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
    };

    render() {
        return (
            <RN.View style={styles.container}>
                <Text weight="heavier" size="smaller" font="brand">
                    VERKOOPPUNTEN
                </Text>
                {this.props.product.shops.length ? (
                    this.renderShops()
                ) : (
                    <Text style={styles.noShops} size="smaller" color="lighter">
                        Dit product is niet te koop bij een van de verkooppunten waar Plenty
                        momenteel kennis van heeft.
                    </Text>
                )}
            </RN.View>
        );
    }

    renderShops = () => {
        return (
            <React.Fragment>
                <RN.View style={styles.shops}>
                    {this.props.product.shops.map(this.renderShop)}
                </RN.View>
                <Text size="smaller" color="lighter" style={styles.subtitle}>
                    Informatie is beschikbaar van{' '}
                    {this.props.shops.map(shop => shop.name).join(', ')}. Binnenkort zullen andere
                    supermarkten volgen.
                </Text>
            </React.Fragment>
        );
    };

    renderShop = (shop, index) => {
        return (
            <RN.View style={styles.shopContainer} key={index}>
                <RN.Image style={styles.shopImage} source={{ uri: shop.imageUrl }} />
            </RN.View>
        );
    };
}

const styles = RN.StyleSheet.create({
    container: {
        paddingTop: 32,
        paddingBottom: 16,
    },
    noShops: {
        marginTop: 16,
        marginHorizontal: 16,
        marginBottom: 32,
    },
    shops: {
        paddingHorizontal: 8,
        marginTop: 32,
        marginBottom: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    subtitle: {
        marginBottom: 32,
        paddingHorizontal: 16,
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
});

export { Shops };
