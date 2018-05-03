import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text} from 'common';

class ProductInfo extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
    };

    render() {
        return (
            <RN.View style={styles.container}>
                <RN.View style={styles.imageContainer}>
                    <RN.Image
                        style={styles.imageShadow}
                        source={require('assets/ui/product-image-shadow.png')}
                    />
                    <RN.View style={styles.imageClipper}>
                        <RN.Image
                            style={styles.image}
                            source={{uri: this.props.product.imageUrl}}
                        />
                    </RN.View>
                </RN.View>
                <Text style={styles.productName} size="bigger">
                    {this.props.product.name}
                </Text>
                <Text style={styles.brandName} color="lighter">
                    {this.props.product.brand.name}
                </Text>
            </RN.View>
        );
    }
}

const shadowSize = 10;
const styles = RN.StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 32 - shadowSize,
        paddingBottom: 32,
    },
    imageContainer: {
        width: 128 + 2 * shadowSize,
        height: 128 + 2 * shadowSize,
        padding: shadowSize,
        alignSelf: 'center',
    },
    imageShadow: {
        position: 'absolute',
        width: 128 + 2 * shadowSize,
        height: 128 + 2 * shadowSize,
    },
    imageClipper: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    image: {
        width: 128,
        height: 128,
    },
    productName: {
        marginTop: 16,
    },
    brandName: {
        marginTop: 8,
    },
});

export {ProductInfo};
