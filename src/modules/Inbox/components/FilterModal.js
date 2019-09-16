import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, IconButton, RadioBox, Button } from 'common';
import { styling } from 'config';
import { getSafeTopHeight, getSafeBottomHeight } from 'utils';

@connect(state => ({
    categories: state.categories.items,
    shops: state.shops.items,
}))
class FilterModal extends React.PureComponent {
    static propTypes = {
        filters: PT.object.isRequired,
        categories: PT.array.isRequired,
        shops: PT.array.isRequired,
        onChange: PT.func.isRequired,
        onClose: PT.func.isRequired,
    };

    render() {
        const { filters, onPressFilter, onRemoveFilter } = this.props;
        return (
            <RN.Modal
                supportedOrientations={['portrait']}
                onRequestClose={this.props.onClose}
                animationType="fade"
            >
                <RN.ScrollView contentContainerStyle={styles.container}>
                    <Text align="left" font="brand">
                        VEGANISTISCH
                    </Text>
                    {this.renderClassification()}
                    <Text align="left" font="brand">
                        VERKOOPPUNT
                    </Text>
                    {this.renderShops()}
                    <Text align="left" font="brand">
                        CATEGORIE
                    </Text>
                    {this.renderCategories()}
                </RN.ScrollView>
                <IconButton onPress={this.props.onClose} icon="close" style={styles.close} />
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'white']}
                    style={styles.gradient}
                    pointerEvents="none"
                />
                {this.renderApplyButton()}
            </RN.Modal>
        );
    }

    handleClassificationChange = option => {
        const { classifications } = this.props.filters;
        const commaDelimited = { YES: 'YES', MAYBE: 'YES,MAYBE' }[option];
        this.props.onChange({
            ...this.props.filters,
            classifications: commaDelimited === classifications ? null : commaDelimited,
        });
    };
    renderClassification = () => {
        return (
            <RN.View style={[styles.filterGroup, styles.classGroup]}>
                <RN.TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.class}
                    onPress={() => this.handleClassificationChange('YES')}
                >
                    <RadioBox checked={this.props.filters.classifications === 'YES'} />
                    <Text style={styles.classText}>100%</Text>
                </RN.TouchableOpacity>
                <RN.TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.class}
                    onPress={() => this.handleClassificationChange('MAYBE')}
                >
                    <RadioBox checked={this.props.filters.classifications === 'YES,MAYBE'} />
                    <Text style={styles.classText}>Inclusief misschien</Text>
                </RN.TouchableOpacity>
            </RN.View>
        );
    };

    handleShopChange = shopCode => {
        this.props.onChange({
            ...this.props.filters,
            shopCode: this.props.filters.shopCode === shopCode ? null : shopCode,
        });
    };
    renderShops = () => {
        return (
            <RN.View style={[styles.filterGroup, styles.shopGroup]}>
                {this.props.shops.map(shop => (
                    <RN.TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.shop}
                        key={shop.code}
                        onPress={() => this.handleShopChange(shop.code)}
                    >
                        <RN.View style={styles.shopContainer}>
                            <RN.Image style={styles.shopImage} source={{ uri: shop.imageUrl }} />
                        </RN.View>
                        <RadioBox checked={shop.code === this.props.filters.shopCode} />
                    </RN.TouchableOpacity>
                ))}
            </RN.View>
        );
    };

    handleCategoryChange = categoryId => {
        this.props.onChange({
            ...this.props.filters,
            categoryId: this.props.filters.categoryId === categoryId ? null : categoryId,
        });
    };
    renderCategories = () => {
        return (
            <RN.View style={styles.filterGroup}>
                {this.props.categories.map((category, index) => (
                    <RN.TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.categoryRow}
                        key={category.id}
                        onPress={() => this.handleCategoryChange(category.id)}
                    >
                        {index > 0 && <RN.View style={styles.categoryTopBorder} />}
                        <Text
                            style={styles.categoryText}
                            numberOfLines={1}
                            overflowMode="ellipsize"
                        >
                            {category.name}
                        </Text>
                        <RadioBox checked={category.id === this.props.filters.categoryId} />
                    </RN.TouchableOpacity>
                ))}
            </RN.View>
        );
    };

    renderApplyButton = () => {
        return (
            <RN.View style={styles.applyWrapper} pointerEvents="box-none">
                <Button onPress={this.props.onClose} label="Bekijk producten" />
            </RN.View>
        );
    };
}

const styles = RN.StyleSheet.create({
    container: {
        paddingTop: getSafeTopHeight() + 28,
        paddingBottom: getSafeBottomHeight() + 48,
        paddingHorizontal: 16,
    },
    close: {
        position: 'absolute',
        right: 0,
        top: getSafeTopHeight() + 16,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 128,
        width: '100%',
    },
    applyWrapper: {
        position: 'absolute',
        bottom: getSafeBottomHeight() + 16,
        left: 0,
        width: '100%',
        alignItems: 'center',
    },
    filterGroup: {
        marginTop: 25,
        marginBottom: 40,
    },
    shopGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    classGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    class: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        marginRight: 24,
    },
    classText: {
        marginLeft: 8,
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
    categoryRow: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    categoryTopBorder: {
        borderTopWidth: 1,
        borderColor: styling.COLOR_BORDER_LIGHTEST,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    categoryText: {
        flex: 1,
        textAlign: 'left',
        paddingRight: 16,
    },
});

export { FilterModal };
