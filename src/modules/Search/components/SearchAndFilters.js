import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import Text from 'common/Text';
import Row from 'common/Row';
import Spacing from 'common/Spacing';
import BackButton from 'common/BackButton';
import SearchInput from 'common/SearchInput';

export default class Entry extends React.PureComponent {
    static propTypes = {
        onPressBack: PT.func.isRequired,
    };

    render() {
        return (
            <RN.View>
                <Row>
                    <BackButton onPress={this.props.onPressBack} />
                    <Row.Fill>
                        <SearchInput placeholder="Zoek" autoFocus />
                    </Row.Fill>
                </Row>
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({});
