import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text} from 'common';
import {styling} from 'config';

export default class Product extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
        onPress: PT.func.isRequired,
    };

    static height = 76;

    render() {
        return (
            <RN.TouchableOpacity
                style={styles.container}
                activeOpacity={0.5}
                onPress={this.props.onPress}
            >
                {this.renderImage()}
                {this.renderInfo()}
            </RN.TouchableOpacity>
        );
    }

    renderImage = () => {
        const uri = this.props.product.thumbUrl;

        return (
            <RN.View style={styles.imageContainer}>
                {uri && <RN.Image source={{uri}} style={styles.image} />}
            </RN.View>
        );
    };

    renderInfo = () => {
        return (
            <RN.View style={styles.textContainer}>
                <Text style={styles.name} align="left" numberOfLines={1} ellipsizeMode="tail">
                    {this.props.product.name}
                </Text>
                <Text
                    align="left"
                    size="smaller"
                    color="lighter"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {this.props.product.brand.name}
                </Text>
            </RN.View>
        );
    };
}

const styles = RN.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Product.height,
        paddingHorizontal: 16,
    },
    imageContainer: {
        borderRadius: 3,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: styling.COLOR_BORDER_LIGHT,
        marginRight: 16,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
    },
    name: {
        marginBottom: 4,
    },
});
