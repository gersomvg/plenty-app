import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import Text from 'common/Text';
import Spacing from 'common/Spacing';
import SearchInput from 'common/SearchInput';

export default class Entry extends React.PureComponent {
    static propTypes = {
        onPressSearch: PT.func.isRequired,
    };

    render() {
        return (
            <RN.View>
                <Text size="bigger" color="brand" font="brand" align="center">
                    PLENTY
                </Text>
                <Spacing size="s" />
                <Text color="lighter" align="center">
                    Plantaardige weelde
                </Text>
                <Spacing size="l" />
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

const styles = RN.StyleSheet.create({});
