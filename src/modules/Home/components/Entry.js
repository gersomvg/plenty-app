import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text, Spacing, SearchInput} from 'common';

class Entry extends React.PureComponent {
    static propTypes = {
        onPressSearch: PT.func.isRequired,
    };

    render() {
        return (
            <RN.View>
                <Text size="bigger" color="brand" font="brand" align="center">
                    PLENTY
                </Text>
                <Text color="lighter" align="center" style={styles.tagline}>
                    Plantaardige weelde
                </Text>
                <SearchInput
                    placeholder="Zoek"
                    overlayTouchable
                    onPress={this.props.onPressSearch}
                    primaryColor
                />
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    tagline: {
        marginTop: 8,
        marginBottom: 32,
    },
});

export {Entry};
