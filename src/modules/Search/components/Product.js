import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text, Emoji } from 'common';
import { styling } from 'config';

class Product extends React.PureComponent {
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
                {uri && <RN.Image source={{ uri }} style={styles.image} />}
                <Emoji style={styles.emoji} type={this.props.product.classification} />
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
        borderWidth: 0,
        paddingRight: 16,
        paddingVertical: 4,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    emoji: {
        position: 'absolute',
        bottom: 0,
        right: 12,
        marginHorizontal: 0,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        marginBottom: 2,
    },
});

export { Product };
