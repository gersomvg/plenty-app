import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Box, Row, BackButton, SearchInput} from 'common';

export default class ProductsFiltering extends React.PureComponent {
    static propTypes = {
        onPressBack: PT.func.isRequired,
        onSearch: PT.func.isRequired,
        searchValue: PT.string,
    };

    render() {
        return (
            <Box safeTop left="none">
                <Row>
                    <BackButton onPress={this.props.onPressBack} />
                    <Row.Fill>
                        <SearchInput
                            placeholder="Zoek"
                            autoFocus
                            onChangeText={this.props.onSearch}
                            value={this.props.searchValue}
                        />
                    </Row.Fill>
                </Row>
            </Box>
        );
    }
}

const styles = RN.StyleSheet.create({});
