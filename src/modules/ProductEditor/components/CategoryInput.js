import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { Text, CheckBox } from 'common';
import { styling } from 'config';

@connect(state => ({
    categories: state.categories.items,
}))
class CategoryInput extends React.PureComponent {
    static propTypes = {
        value: PT.arrayOf(PT.object).isRequired,
        onChange: PT.func.isRequired,
    };

    handleChange = cat => {
        if (this.props.value.some($cat => $cat.id === cat.id)) {
            this.props.onChange(this.props.value.filter($cat => $cat.id !== cat.id));
        } else {
            this.props.onChange([...this.props.value, cat]);
        }
    };

    render() {
        return (
            <RN.View style={this.props.style}>{this.props.categories.map(this.renderRow)}</RN.View>
        );
    }

    renderRow = (cat, index) => {
        return (
            <RN.TouchableOpacity
                activeOpacity={0.5}
                style={styles.row}
                key={cat.id}
                onPress={() => this.handleChange(cat)}
            >
                {index > 0 && <RN.View style={styles.topBorder} />}
                <Text style={styles.text} numberOfLines={1} overflowMode="ellipsize">
                    {cat.name}
                </Text>
                <CheckBox checked={this.props.value.some($cat => $cat.id === cat.id)} />
            </RN.TouchableOpacity>
        );
    };
}

const styles = RN.StyleSheet.create({
    row: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    topBorder: {
        borderTopWidth: 1,
        borderColor: styling.COLOR_BORDER_LIGHTEST,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    text: {
        flex: 1,
        textAlign: 'left',
        paddingRight: 16,
    },
});

export { CategoryInput };
