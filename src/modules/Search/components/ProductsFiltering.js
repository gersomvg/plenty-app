import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {BackButton, SearchInput} from 'common';
import {getSafeTopHeight} from 'utils';

export default class ProductsFiltering extends React.PureComponent {
    static propTypes = {
        onPressBack: PT.func.isRequired,
        onSearch: PT.func.isRequired,
        searchValue: PT.string,
    };

    render() {
        return (
            <RN.View style={styles.container}>
                <BackButton onPress={this.props.onPressBack} />
                <SearchInput
                    style={styles.input}
                    placeholder="Zoek"
                    autoFocus
                    onChangeText={this.props.onSearch}
                    value={this.props.searchValue}
                />
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    container: {
        paddingTop: 16 + getSafeTopHeight(),
        paddingBottom: 16,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
});
