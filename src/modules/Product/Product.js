import React from 'react';
import RN from 'react-native';

import {Root, Box, Separator, Text, BackButton} from 'common';
import {getStatusBarHeight} from 'utils';
import Header from './components/Header';
import Classification from './components/Classification';

class Product extends React.PureComponent {
    render() {
        return (
            <Root>
                <Header product={this.props.product} onPressBack={this.props.onPressBack} />
                <Separator />
                <Classification product={this.props.product} />
                <Separator />
            </Root>
        );
    }
}

const styles = RN.StyleSheet.create({});

export default Product;
