import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Box, Text, BackButton} from 'common';
import {getStatusBarHeight} from 'utils';
import {styling} from 'config';

export default class Header extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
        onPressBack: PT.func.isRequired,
    };

    render() {
        return (
            <Box safeTop bottom="bigger">
                <RN.Image
                    style={styles.gradient}
                    source={require('assets/ui/product-gradient-background.png')}
                />
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
                <BackButton style={styles.backButton} onPress={this.props.onPressBack} />
            </Box>
        );
    }
}

const styles = RN.StyleSheet.create({
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: 'auto',
        height: 128,
        resizeMode: 'stretch',
    },
    imageContainer: {
        width: 148,
        height: 148,
        padding: 10,
        alignSelf: 'center',
    },
    imageShadow: {
        position: 'absolute',
        width: 148,
        height: 148,
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
    backButton: {
        position: 'absolute',
        top: 16 + getStatusBarHeight(),
    },
});
