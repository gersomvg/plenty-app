import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { IconButton, Text } from 'common';

class HeaderContent extends React.PureComponent {
    static propTypes = {
        showArchived: PT.bool.isRequired,
        onChangeShowArchived: PT.func.isRequired,
        onPressBack: PT.func.isRequired,
    };

    static HEIGHT = 80;

    render() {
        return (
            <RN.View style={styles.container}>
                <IconButton onPress={this.props.onPressBack} icon="back" />
                <Text style={styles.title} weight="heavier" size="bigger">
                    Inbox
                </Text>
                <Text style={styles.label} align="right" size="smaller">
                    Archief
                </Text>
                <RN.Switch
                    value={this.props.showArchived}
                    onValueChange={this.props.onChangeShowArchived}
                />
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    container: {
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: HeaderContent.HEIGHT,
    },
    title: {
        flex: 1,
    },
    label: {
        marginRight: 12,
    },
});

export { HeaderContent };
