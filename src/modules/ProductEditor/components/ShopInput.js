import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { CheckBox } from 'common';

@connect(state => ({
    shops: state.shops.items,
}))
class ShopInput extends React.PureComponent {
    static propTypes = {
        value: PT.arrayOf(PT.object).isRequired,
        onChange: PT.func.isRequired,
    };

    handleChange = shop => {
        if (this.props.value.some($shop => $shop.code === shop.code)) {
            this.props.onChange(this.props.value.filter($shop => $shop.code !== shop.code));
        } else {
            this.props.onChange([...this.props.value, shop]);
        }
    };

    render() {
        return (
            <RN.View style={[styles.container, this.props.style]}>
                {this.props.shops.map(shop => (
                    <RN.TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.shop}
                        key={shop.code}
                        onPress={() => this.handleChange(shop)}
                    >
                        <RN.View style={styles.shopContainer}>
                            <RN.Image style={styles.shopImage} source={{ uri: shop.imageUrl }} />
                        </RN.View>
                        <CheckBox
                            checked={this.props.value.some($shop => $shop.code === shop.code)}
                        />
                    </RN.TouchableOpacity>
                ))}
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
});

export { ShopInput };
