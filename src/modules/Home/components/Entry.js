import React from 'react';
import RN from 'react-native';

import Text from 'common/Text';
import Spacing from 'common/Spacing';

export default class Entry extends React.Component {
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
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({});
