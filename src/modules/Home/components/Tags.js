import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { Text } from 'common';
import { styling } from 'config';

@connect(state => ({ tags: state.tags.items }))
class Tags extends React.PureComponent {
    static propTypes = {
        onPress: PT.func.isRequired,
    };

    render() {
        return <RN.View style={this.props.style}>{this.props.tags.map(this.renderRow)}</RN.View>;
    }

    renderRow = (tag, index) => {
        return (
            <RN.TouchableOpacity
                activeOpacity={0.5}
                style={styles.row}
                key={tag.id}
                onPress={() => this.props.onPress(tag.id)}
            >
                {index > 0 && <RN.View style={styles.topBorder} />}
                <Text style={styles.text} numberOfLines={1} overflowMode="ellipsize">
                    {tag.name}
                </Text>
                <RN.Image source={require('assets/ui/row-navigate.png')} style={styles.icon} />
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
        paddingHorizontal: 24,
    },
    topBorder: {
        borderTopWidth: 1,
        borderColor: styling.COLOR_BORDER_LIGHTEST,
        position: 'absolute',
        top: 0,
        left: 16,
        right: 16,
    },
    text: {
        flex: 1,
        textAlign: 'left',
        paddingRight: 16,
    },
    icon: {
        width: 6,
        height: 16,
        resizeMode: 'contain',
    },
});

export { Tags };
