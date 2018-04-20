import React from 'react';
import RN from 'react-native';

import {Root, Box, Separator, Text, BackButton} from 'common';
import {getStatusBarHeight} from 'utils';
import Header from './components/Header';

class Product extends React.PureComponent {
    render() {
        return (
            <Root>
                {this.renderHeader()}
                <Separator />
            </Root>
        );
    }

    renderHeader = () => {
        return <Header product={this.props.product} onPressBack={this.props.onPressBack} />;
    };
}

const styles = RN.StyleSheet.create({});

export default Product;
