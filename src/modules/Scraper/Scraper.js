import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getSafeTopHeight, getSafeBottomHeight } from 'utils';
import { withFetch } from 'hocs';
import { TextInput, Text, IconButton, Button } from 'common';
import { styling } from 'config';

@connect()
@withFetch
class Scraper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.navigation.getParam('search') || '',
            isSearching: false,
            results: {},
            expandedGroups: [],
        };
    }

    componentDidMount() {
        if (this.state.search !== '') this.search(this.state.search);
    }

    render() {
        return (
            <RN.KeyboardAvoidingView
                behavior={RN.Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.wrapper}
            >
                <RN.ScrollView
                    style={styles.scroller}
                    contentContainerStyle={styles.scrollerContent}
                    keyboardShouldPersistTaps="never"
                >
                    <TextInput
                        placeholder="Productnaam en/of merk"
                        value={this.state.search}
                        onChangeText={this.changeSearch}
                        autoCapitalize="none"
                        style={styles.search}
                    />
                    {this.state.isSearching ? (
                        <RN.ActivityIndicator />
                    ) : (
                        Object.keys(this.state.results).map(this.renderResultGroup)
                    )}
                </RN.ScrollView>
                <IconButton style={styles.back} icon="close" onPress={this.goBack} />
            </RN.KeyboardAvoidingView>
        );
    }

    renderResultGroup = key => {
        const isExpanded = this.state.expandedGroups.includes(key);
        const rows = this.state.results[key];
        return (
            <RN.View key={key}>
                <Text font="brand" size="bigger" style={styles.shopName}>
                    {key.toUpperCase()}
                </Text>
                {rows.slice(0, isExpanded ? rows.length : 3).map(this.renderResultRow)}
                {!isExpanded &&
                    rows.length > 3 && (
                        <Button
                            onPress={() => this.expandGroup(key)}
                            label="Toon meer"
                            style={styles.expandButton}
                        />
                    )}
            </RN.View>
        );
    };

    renderResultRow = (item, index) => {
        return (
            <RN.TouchableOpacity key={index} onPress={() => this.getDetails(item.detailsUrl)}>
                <RN.View style={styles.row}>
                    <RN.Image style={styles.rowImage} source={{ uri: item.thumbUrl }} />
                    <RN.View style={styles.rowTexts}>
                        <Text numberOfLines={2} size="smaller" align="left">
                            {item.name}
                        </Text>
                    </RN.View>
                </RN.View>
            </RN.TouchableOpacity>
        );
    };

    expandGroup = key => {
        this.setState(state => ({ ...state, expandedGroups: [...state.expandedGroups, key] }));
    };

    changeSearch = search => {
        this.setState({ search });
        this.searchDebounced(search);
    };

    search = async query => {
        this.setState({ isSearching: true });
        try {
            const results = await this.props.fetch('scrape.get')({ name: query }).promise;
            this.setState({ isSearching: false, results });
        } catch (e) {
            if (!e.isCanceled) this.setState({ isSearching: false });
        }
    };
    searchDebounced = _.debounce(query => this.search(query), 500);

    getDetails = async detailsUrl => {
        if (this.fetchDetails) this.fetchDetails.cancel();
        try {
            this.fetchDetails = this.props.fetch('scrape.getDetails')({ url: detailsUrl });
            const result = await this.fetchDetails.promise;
            const onSelect = this.props.navigation.getParam('onSelect');
            if (onSelect) onSelect(result.details);
            this.props.navigation.pop();
        } catch (e) {
            RN.Alert.alert('Er ging iets mis.');
        }
    };

    goBack = () => {
        this.props.navigation.pop();
    };
}

const styles = RN.StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    back: {
        position: 'absolute',
        left: 0,
        top: getSafeTopHeight() + 16,
        backgroundColor: 'white',
    },
    scroller: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollerContent: {
        paddingTop: 16 + getSafeTopHeight(),
        paddingBottom: 32 + getSafeBottomHeight(),
        paddingHorizontal: 16,
    },
    search: {
        marginBottom: 16,
        marginLeft: 48,
    },
    shopName: {
        marginVertical: 5,
        padding: 5,
        backgroundColor: 'black',
        color: 'white',
    },
    expandButton: {
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowImage: {
        width: 64,
        height: 64,
        marginRight: 5,
    },
    rowTexts: {
        flex: 1,
        alignItems: 'flex-start',
    },
});

export { Scraper };
