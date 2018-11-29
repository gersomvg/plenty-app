import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text, ProductThumb } from 'common';

class ProductInfo extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
        onPressImage: PT.func.isRequired,
    };

    render() {
        return (
            <RN.View style={styles.container}>
                <RN.TouchableOpacity activeOpacity={0.5} onPress={this.props.onPressImage}>
                    <ProductThumb source={{ uri: this.props.product.imageUrl }} />
                </RN.TouchableOpacity>
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
        paddingTop: 32,
        paddingBottom: 32,
    },
    productName: {
        marginTop: 26,
    },
    brandName: {
        marginTop: 8,
    },
});

export { ProductInfo };
