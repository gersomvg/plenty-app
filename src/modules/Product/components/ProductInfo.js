import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text, ProductThumb } from 'common';

class ProductInfo extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
    };

    render() {
        return (
            <RN.View style={styles.container}>
                <ProductThumb source={{ uri: this.props.product.imageUrl }} />
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
        paddingTop: 32 - ProductThumb.shadowSize,
        paddingBottom: 32,
    },
    productName: {
        marginTop: 16,
    },
    brandName: {
        marginTop: 8,
    },
});

export { ProductInfo };
