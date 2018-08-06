import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text, IconButton, Button } from 'common';
import { styling } from 'config';

class Message extends React.PureComponent {
    static propTypes = {
        message: PT.object.isRequired,
        onPressProduct: PT.func.isRequired,
        onPressCreate: PT.func.isRequired,
        onPressArchive: PT.func.isRequired,
    };

    render() {
        const iconType = this.props.message.archived ? 'unarchive' : 'archive';
        return (
            <RN.View style={styles.row}>
                <RN.View style={styles.messageWrapper}>
                    <Text align="left" size="smaller" style={styles.message}>
                        {this.props.message.message}
                    </Text>
                    <IconButton
                        label="Archiveer"
                        onPress={() => this.props.onPressArchive(this.props.message.id)}
                        icon={iconType}
                    />
                </RN.View>
                {this.renderProduct()}
                {this.renderCreateWithBarcode()}
            </RN.View>
        );
    }

    renderProduct() {
        const { product } = this.props.message;
        if (!product) return null;
        const uri = product.thumbUrl;
        return (
            <RN.TouchableOpacity
                style={styles.productContainer}
                activeOpacity={0.5}
                onPress={() => this.props.onPressProduct(product)}
            >
                <RN.View style={styles.imageContainer}>
                    {uri && <RN.Image source={{ uri }} style={styles.image} />}
                </RN.View>
                <RN.View style={styles.textContainer}>
                    <Text
                        style={styles.name}
                        align="left"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        size="smaller"
                    >
                        {product.name}
                    </Text>
                    <Text
                        align="left"
                        size="smaller"
                        color="lighter"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {product.brand.name}
                    </Text>
                </RN.View>
            </RN.TouchableOpacity>
        );
    }

    renderCreateWithBarcode = () => {
        const { barcode } = this.props.message;
        if (!barcode) return null;
        return (
            <RN.View style={styles.barcodeContainer}>
                <Text size="smaller" style={styles.barcode} selectable>
                    Barcode: {barcode}
                </Text>
                <Button
                    label={`Maak product met barcode`}
                    tint="light"
                    onPress={() => this.props.onPressCreate(barcode)}
                />
            </RN.View>
        );
    };
}

const styles = RN.StyleSheet.create({
    row: {
        paddingVertical: 16,
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderColor: styling.COLOR_BORDER_LIGHT,
    },
    messageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    message: {
        flex: 1,
        marginRight: 8,
        paddingVertical: 8,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 16,
    },
    imageContainer: {
        borderRadius: 3,
        overflow: 'hidden',
        borderWidth: 0,
        marginRight: 16,
    },
    image: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
    },
    name: {
        marginBottom: 2,
    },
    barcodeContainer: {
        marginRight: 16,
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    barcode: {
        marginVertical: 8,
    },
});

export { Message };
