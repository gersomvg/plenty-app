import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { IconButton, SearchInput } from 'common';
import { styling } from 'config';

@connect(state => ({
    allShops: state.shops.items,
    isAuthorized: state.auth.status === 'AUTHORIZED',
}))
class Header extends React.PureComponent {
    static propTypes = {
        onPressBack: PT.func.isRequired,
        onPressFilter: PT.func.isRequired,
        onPressSearch: PT.func.isRequired,
        onSearch: PT.func.isRequired,
        autoFocus: PT.bool,

        name: PT.string,
        shopCode: PT.string,
        classifications: PT.string,
        withoutTag: PT.bool,
        withoutBarcode: PT.bool,
        archived: PT.bool,
    };

    static HEIGHT = SearchInput.HEIGHT + 16 * 2;

    state = { focusSearch: null };

    static getDerivedStateFromProps(props, state) {
        if (state.focusSearch === null) {
            return { focusSearch: !!props.autoFocus };
        }
        return null;
    }

    focusSearch = () => {
        this.setState({ focusSearch: true });
        this.props.onPressSearch();
    };
    blurSearch = () => this.setState({ focusSearch: false });

    render() {
        return (
            <RN.View style={styles.container}>
                <IconButton onPress={this.props.onPressBack} icon="back" color="white" />
                {this.state.focusSearch ? this.renderSearch() : this.renderFilters()}
            </RN.View>
        );
    }

    renderSearch = () => {
        return (
            <SearchInput
                style={styles.input}
                autoFocus={true}
                onChange={this.props.onSearch}
                value={this.props.name}
                onBlur={this.blurSearch}
            />
        );
    };

    renderFilters = () => {
        return (
            <RN.ScrollView
                style={styles.filterScroller}
                contentContainerStyle={styles.filterScrollerContent}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {this.renderSearchButton()}
                {this.renderShopButton()}
                {this.renderClassificationButton()}
                {this.props.isAuthorized && this.renderAdminButton()}
            </RN.ScrollView>
        );
    };

    renderSearchButton = () => {
        if (this.props.name) {
            return (
                <FilterItem style={styles.searchButton} onPress={this.focusSearch} hideArrow active>
                    {`"${this.props.name}"`}
                </FilterItem>
            );
        }
        return (
            <FilterItem
                style={[styles.searchButton, styles.searchIconButton]}
                onPress={this.focusSearch}
                hideArrow
            >
                <RN.Image style={styles.searchIcon} source={require('assets/ui/cta-search.png')} />
            </FilterItem>
        );
    };

    renderShopButton = () => {
        return (
            <FilterItem
                onPress={() => this.props.onPressFilter('shop')}
                active={!!this.props.shopCode}
            >
                {this.props.shopCode
                    ? this.props.allShops.find(shop => shop.code === this.props.shopCode).name
                    : 'Winkel'}
            </FilterItem>
        );
    };

    renderClassificationButton = () => {
        return (
            <FilterItem
                onPress={() => this.props.onPressFilter('classification')}
                active={!!this.props.classifications}
            >
                {this.props.classifications
                    ? `Vegan: ${this.props.classifications
                          .replace('YES', 'Ja')
                          .replace('MAYBE', 'Misschien')
                          .replace('NO', 'Nee')
                          .replace(',', ', ')}`
                    : 'Vegan?'}
            </FilterItem>
        );
    };

    renderAdminButton = () => {
        return (
            <FilterItem
                onPress={() => this.props.onPressFilter('admin')}
                active={this.props.withoutTag || this.props.withoutBarcode || this.props.archived}
            >
                Admin
            </FilterItem>
        );
    };
}

const FilterItem = props => {
    return (
        <RN.TouchableOpacity
            activeOpacity={0.5}
            style={[styles.filterItem, props.style, props.active && styles.filterItemActive]}
            onPress={props.onPress}
        >
            {typeof props.children === 'string' ? (
                <FilterItemText active={props.active}>{props.children}</FilterItemText>
            ) : (
                props.children
            )}
            {!props.hideArrow && (
                <RN.Image
                    source={
                        props.active
                            ? require('assets/ui/expand-filter-active.png')
                            : require('assets/ui/expand-filter.png')
                    }
                    style={styles.filterItemArrow}
                />
            )}
        </RN.TouchableOpacity>
    );
};

const FilterItemText = props => {
    return (
        <RN.Text
            style={[styles.filterItemText, props.active && styles.filterItemTextActive]}
            numberOfLines={1}
        >
            {props.children}
        </RN.Text>
    );
};

const styles = RN.StyleSheet.create({
    container: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        marginRight: 16,
    },

    filterScroller: {
        flex: 1,
    },
    filterScrollerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
    },
    filterItem: {
        height: 48,
        borderRadius: 6,
        backgroundColor: styling.COLOR_PRIMARY_DARK,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    filterItemText: {
        fontSize: 15,
        fontFamily: 'System',
        color: 'white',
        fontWeight: '500',
        textShadowOffset: { height: 1 },
        textShadowRadius: 2,
        textShadowColor: 'rgba(0,0,0,0.2)',
    },
    filterItemArrow: {
        width: 16,
        height: 10,
        marginLeft: 6,
    },
    filterItemActive: {
        backgroundColor: 'white',
    },
    filterItemTextActive: {
        color: styling.COLOR_PRIMARY_DARK,
        textShadowColor: 'transparent',
    },

    searchButton: {
        marginLeft: 0,
    },
    searchIconButton: {
        width: 48,
    },
    searchIcon: {
        width: 22,
        height: 22,
    },
});

export { Header };
