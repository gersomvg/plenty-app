import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { IconButton, SearchInput } from 'common';
import { getSafeTopHeight } from 'utils';

class ProductsFiltering extends React.PureComponent {
    static propTypes = {
        onPressBack: PT.func.isRequired,
        onPressFilter: PT.func.isRequired,
        onSearch: PT.func.isRequired,
        searchValue: PT.string,
        autoFocus: PT.bool,
        isAnyFilterActive: PT.bool,
    };

    static HEIGHT = SearchInput.HEIGHT + 16 * 2;

    render() {
        return (
            <RN.View style={styles.container}>
                <IconButton onPress={this.props.onPressBack} icon="back" />
                <SearchInput
                    style={styles.input}
                    placeholder="Zoek"
                    autoFocus={this.props.autoFocus}
                    onChangeText={this.props.onSearch}
                    value={this.props.searchValue}
                />
                <IconButton
                    onPress={this.props.onPressFilter}
                    icon="filter"
                    color={this.props.isAnyFilterActive ? 'brand' : 'default'}
                />
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    container: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
});

export { ProductsFiltering };
