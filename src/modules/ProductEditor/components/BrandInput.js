import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import _ from 'lodash';
import Expo from 'expo';

import { TextInput, Text } from 'common';
import { styling } from 'config';
import { withFetch } from 'hocs';

@withFetch
class BrandInput extends React.PureComponent {
    static propTypes = {
        value: PT.shape({ id: PT.integer, name: PT.string.isRequired }),
        onChange: PT.func.isRequired,
    };
    state = { searchText: '', isSearching: false, results: [], shouldAutoFocus: false };

    search = async searchText => {
        if (!searchText) return this.setState({ results: [], isSearching: false });
        try {
            this.setState({ isSearching: true, results: [] });
            const data = await this.props.fetch('brands.get')({ name: searchText }).promise;
            this.setState({ isSearching: false, results: data.items });
        } catch (e) {}
    };
    searchDebounced = _.debounce(this.search, 200);

    render() {
        if (this.props.value) {
            return this.renderSelectedState();
        }
        return this.renderInputState();
    }

    clear = () => {
        this.props.onChange(null);
        this.setState({ searchText: '', results: [], shouldAutoFocus: true });
    };
    renderSelectedState = () => (
        <RN.TouchableOpacity
            activeOpacity={0.5}
            onPress={this.clear}
            style={[styles.selected, this.props.style]}
        >
            <Text>{this.props.value.name}</Text>
        </RN.TouchableOpacity>
    );

    handleInputChange = searchText => {
        this.setState({ searchText });
        this.searchDebounced(searchText);
    };
    addNewBrand = () => this.props.onChange({ name: this.state.searchText });
    renderInputState = () => {
        const showItemsUnder =
            this.state.searchText !== '' || this.state.results.length > 0 || this.state.isSearching;
        // Only show the create button if the entered text doesn't match an already existing brand
        const showCreateButton =
            this.state.searchText !== '' &&
            (this.state.results.length === 0 ||
                !this.state.results.find(
                    brand => brand.name.toLowerCase() === this.state.searchText.toLowerCase(),
                ));
        return (
            <RN.View style={this.props.style}>
                <TextInput
                    placeholder="Merk"
                    value={this.state.searchText}
                    onChangeText={this.handleInputChange}
                    autoFocus={this.state.shouldAutoFocus}
                />
                {showItemsUnder && (
                    <RN.View>
                        <RN.ScrollView
                            style={styles.scroller}
                            contentContainerStyle={styles.scrollerInner}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {showCreateButton && (
                                <RN.TouchableOpacity
                                    style={[styles.button, styles.addButton]}
                                    onPress={this.addNewBrand}
                                    activeOpacity={0.5}
                                >
                                    <Text size="smaller">Maak "{this.state.searchText}" aan</Text>
                                </RN.TouchableOpacity>
                            )}
                            {this.state.results.map(this.renderResultItem)}
                            {this.state.isSearching && <RN.ActivityIndicator size="small" />}
                        </RN.ScrollView>
                        <Expo.LinearGradient
                            start={[0, 0]}
                            end={[1, 0]}
                            colors={['rgba(255,255,255,0)', 'white']}
                            style={styles.fader}
                            pointerEvents="none"
                        />
                    </RN.View>
                )}
            </RN.View>
        );
    };

    renderResultItem = brand => (
        <RN.TouchableOpacity
            style={styles.button}
            onPress={() => this.props.onChange(brand)}
            activeOpacity={0.5}
            key={brand.id}
        >
            <Text color="white" size="smaller">
                {brand.name}
            </Text>
        </RN.TouchableOpacity>
    );
}

const styles = RN.StyleSheet.create({
    selected: {
        height: TextInput.HEIGHT,
        borderRadius: 6,
        backgroundColor: styling.COLOR_BG_LIGHT,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    scroller: {
        height: 6 + 32,
    },
    scrollerInner: {
        paddingTop: 6,
    },
    fader: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 48,
        height: '100%',
    },
    button: {
        height: 32,
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 10,
        backgroundColor: styling.COLOR_PRIMARY,
        paddingHorizontal: 12,
        paddingBottom: 1,
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: styling.COLOR_BG_LIGHT_PRIMARY,
    },
});

export { BrandInput };
