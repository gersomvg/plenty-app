import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { Text, IconButton, RadioBox, CheckBox, Button } from 'common';
import { styling } from 'config';
import { getSafeTopHeight, getSafeBottomHeight, xor } from 'utils';

@connect(state => ({
    allTags: state.tags.items,
    allShops: state.shops.items,
}))
class FilterDropdown extends React.PureComponent {
    static propTypes = {
        activeFilter: PT.oneOf(['shop', 'classification', 'admin']),
        onClose: PT.func.isRequired,

        shopCode: PT.string,
        onChangeShop: PT.func.isRequired,

        classifications: PT.string,
        onChangeClassifications: PT.func.isRequired,

        withoutTag: PT.bool,
        onChangeWithoutTag: PT.func.isRequired,

        withoutBarcode: PT.bool,
        onChangeWithoutBarcode: PT.func.isRequired,
    };

    render() {
        let filters;
        switch (this.props.activeFilter) {
            case 'shop':
                filters = this.renderShops();
                break;
            case 'classification':
                filters = this.renderClassifications();
                break;
            case 'admin':
                filters = this.renderAdmin();
                break;
        }
        return (
            <RN.View style={this.props.style}>
                <RN.View style={styles.scrollWrapper}>
                    <RN.ScrollView
                        style={styles.scroller}
                        contentContainerStyle={styles.scrollContainer}
                        alwaysBounceVertical={false}
                    >
                        {filters}
                    </RN.ScrollView>
                </RN.View>
                <RN.TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.windowBottom}
                    onPress={this.props.onClose}
                />
            </RN.View>
        );
    }

    handleShopChange = shopCode => {
        if (this.props.shopCode === shopCode) {
            this.props.onChangeShop(null);
        } else {
            this.props.onChangeShop(shopCode);
        }
        this.props.onClose();
    };
    renderShops = () => {
        return (
            <RN.View style={styles.shops}>
                {this.props.allShops.map(shop => (
                    <RN.TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.shop}
                        key={shop.code}
                        onPress={() => this.handleShopChange(shop.code)}
                    >
                        <RN.View style={styles.shopContainer}>
                            <RN.Image style={styles.shopImage} source={{ uri: shop.imageUrl }} />
                        </RN.View>
                        <RadioBox checked={shop.code === this.props.shopCode} />
                    </RN.TouchableOpacity>
                ))}
            </RN.View>
        );
    };

    handleClassificationChange = classification => {
        const cls = this.props.classifications;
        const arr = [];
        ['YES', 'MAYBE', 'NO'].forEach(
            c => xor(cls && cls.includes(c), classification === c) && arr.push(c),
        );
        this.props.onChangeClassifications(arr.join(','));
    };
    renderClassifications = () => {
        const c = this.props.classifications;
        const options = [
            { label: 'Ja', value: 'YES' },
            { label: 'Misschien', value: 'MAYBE' },
            { label: 'Nee', value: 'NO' },
        ];
        return (
            <RN.View style={styles.classifications}>
                {options.map(option => (
                    <RN.TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.classification}
                        onPress={() => this.handleClassificationChange(option.value)}
                        key={option.value}
                    >
                        <CheckBox checked={!!c && c.includes(option.value)} />
                        <Text style={styles.classificationText} size="smaller">
                            {option.label}
                        </Text>
                    </RN.TouchableOpacity>
                ))}
            </RN.View>
        );
    };

    renderAdmin = () => {
        return (
            <RN.View style={styles.classifications}>
                <RN.TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.classification}
                    onPress={() => this.props.onChangeWithoutTag(!this.props.withoutTag)}
                >
                    <CheckBox checked={this.props.withoutTag} />
                    <Text style={styles.classificationText} size="smaller">
                        Ongecategoriseerd
                    </Text>
                </RN.TouchableOpacity>
                <RN.TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.classification}
                    onPress={() => this.props.onChangeWithoutBarcode(!this.props.withoutBarcode)}
                >
                    <CheckBox checked={this.props.withoutBarcode} />
                    <Text style={styles.classificationText} size="smaller">
                        Zonder barcode
                    </Text>
                </RN.TouchableOpacity>
            </RN.View>
        );
    };
}

const styles = RN.StyleSheet.create({
    scrollWrapper: {
        marginBottom: getSafeBottomHeight(),
    },
    scroller: {
        backgroundColor: 'white',
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    windowBottom: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        marginTop: -getSafeBottomHeight(),
        marginBottom: -getSafeBottomHeight(),
    },

    shops: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: -16,
    },
    shop: {
        alignItems: 'center',
        marginBottom: 16,
        marginRight: 10,
    },
    shopContainer: {
        marginBottom: 8,
        height: 44,
        width: 58,
        borderRadius: 4,
        overflow: 'hidden',
    },
    shopImage: {
        height: 44,
        width: 58,
        resizeMode: 'contain',
    },

    classifications: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    classification: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        marginRight: 24,
    },
    classificationText: {
        marginLeft: 8,
    },
});

export { FilterDropdown };
