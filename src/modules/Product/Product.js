import React from 'react';
import RN from 'react-native';

import {Root, Box, Separator, Text, BackButton} from 'common';
import {getStatusBarHeight} from 'utils';
import {styling} from 'config';
import Header from './components/Header';
import Classification from './components/Classification';
import Shops from './components/Shops';

class Product extends React.PureComponent {
    render() {
        return (
            <RN.View style={styling.flexWhite}>
                <RN.Animated.ScrollView style={{flex: 1}}>
                    <Header product={this.props.product} onPressBack={this.props.onPressBack} />
                    <Separator />
                    <Classification product={this.props.product} />
                    <Separator />
                    <Shops product={this.props.product} />
                </RN.Animated.ScrollView>
            </RN.View>
        );
    }
}

export default Product;
