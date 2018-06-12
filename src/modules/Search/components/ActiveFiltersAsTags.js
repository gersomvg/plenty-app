import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { Text } from 'common';
import { styling } from 'config';

@connect(state => ({
    categories: state.categories.items,
    shops: state.shops.items,
}))
class ActiveFiltersAsTags extends React.PureComponent {
    static propTypes = {
        filters: PT.object.isRequired,
        onPressFilter: PT.func.isRequired,
        onRemoveFilter: PT.func.isRequired,
        style: PT.any,
    };

    static height = 64;

    keyExtractor = item => item.id.toString();

    getItemLayout = (data, index) => ({
        length: Product.height,
        offset: index * Product.height + 16,
        index,
    });

    render() {
        const { filters, onPressFilter, onRemoveFilter } = this.props;
        return (
            <RN.ScrollView
                style={[styles.container, this.props.style]}
                horizontal
                alwaysBounceHorizontal={false}
            >
                {['shopCode', 'categoryId']
                    .filter(key => filters[key] !== null)
                    .map(this.renderTag)}
            </RN.ScrollView>
        );
    }

    renderTag = key => {
        let label;
        if (key === 'categoryId') {
            label = this.props.categories.find(cat => cat.id === this.props.filters[key]).name;
        }
        if (key === 'shopCode') {
            label = this.props.shops.find(shop => shop.code === this.props.filters[key]).name;
        }
        return (
            <RN.View style={styles.tag} key={key}>
                <RN.TouchableOpacity
                    style={styles.pressArea}
                    onPress={this.props.onPressFilter}
                    activeOpacity={0.5}
                >
                    <Text color="white" size="smaller">
                        {label}
                    </Text>
                </RN.TouchableOpacity>
                <RN.TouchableOpacity
                    style={styles.removeArea}
                    onPress={() => this.props.onRemoveFilter(key)}
                    activeOpacity={0.5}
                >
                    <RN.Image style={styles.clearIcon} source={require('assets/ui/clear.png')} />
                </RN.TouchableOpacity>
            </RN.View>
        );
    };
}

const styles = RN.StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    tag: {
        height: 32,
        borderRadius: 4,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    pressArea: {
        backgroundColor: styling.COLOR_BRAND_PRIMARY,
        paddingLeft: 12,
        paddingRight: 6,
        paddingBottom: 1,
        justifyContent: 'center',
    },
    removeArea: {
        backgroundColor: styling.COLOR_BRAND_PRIMARY,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        tintColor: 'white',
    },
});

export { ActiveFiltersAsTags };
