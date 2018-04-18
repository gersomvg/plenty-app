import React from 'react';
import RN from 'react-native';

import Root from 'common/Root';
import Text from 'common/Text';

export default class Product extends React.PureComponent {
    render() {
        return (
            <Root>
                <RN.Button title="Back" onPress={this.props.onPressBack} />
                <Text>{this.props.product.name}</Text>
            </Root>
        );
    }
}
