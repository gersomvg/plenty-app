import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from 'common';
import { styling } from 'config';
import { findTagInTree } from 'utils';

@connect((state, props) => ({
    tag: findTagInTree({ tagTree: state.tags.items, tagId: props.tagId }),
}))
class SubTags extends React.PureComponent {
    static propTypes = {
        tagId: PT.number,
        style: PT.any,
        onPress: PT.func.isRequired,
        collapseSubTags: PT.bool.isRequired,
        onToggleCollapse: PT.func.isRequired,
    };

    render() {
        const hasChildren = !!this.props.tag.children.length;
        return (
            <RN.View style={[styles.container, this.props.style]}>
                <RN.TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.tagNameWrapper}
                    onPress={this.props.onToggleCollapse}
                    disabled={!hasChildren}
                >
                    <RN.Text style={styles.tagName}>
                        {(this.props.tag.name || 'Alle categorieën').toUpperCase()}
                    </RN.Text>
                </RN.TouchableOpacity>
                {!this.props.collapseSubTags && (
                    <RN.View style={styles.list}>
                        {this.props.tag.children.map(this.renderTag)}
                    </RN.View>
                )}
                {hasChildren && (
                    <RN.View style={styles.arrowIconWrapper} pointerEvents="none">
                        <RN.Image
                            style={[
                                styles.arrowIcon,
                                this.props.collapseSubTags && styles.arrowIconCollapsed,
                            ]}
                            source={require('assets/ui/expand-arrow.png')}
                        />
                    </RN.View>
                )}
            </RN.View>
        );
    }

    renderTag = (tag, index) => {
        const { length } = this.props.tag.children;
        const tagStyles = [
            styles.tag,
            index % 2 ? styles.tagRight : styles.tagLeft,
            index < length - (2 - (index % 2)) && styles.tagWithBottomBorder,
        ];
        return (
            <RN.View key={tag.id} style={tagStyles}>
                <RN.TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.tagTouchable}
                    onPress={() => this.props.onPress(tag.id)}
                >
                    <RN.Text style={styles.tagText}>{tag.name}</RN.Text>
                </RN.TouchableOpacity>
            </RN.View>
        );
    };
}

const styles = RN.StyleSheet.create({
    container: {
        backgroundColor: styling.COLOR_BG_SUBTLE_SECONDARY,
        padding: 20,
        paddingTop: 0,
    },
    tagNameWrapper: {
        paddingLeft: 20,
        paddingRight: 30 + 18,
        paddingVertical: 30,
        marginHorizontal: -20,
        marginBottom: -20,
        zIndex: 1,
    },
    tagName: {
        fontFamily: 'System',
        fontSize: 17,
        lineHeight: 17 * 1.3,
        color: styling.COLOR_TEXT_DEFAULT,
        fontWeight: 'bold',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 2,
    },
    arrowIconWrapper: {
        position: 'absolute',
        zIndex: 3,
        height: 17 * 1.3,
        width: 17 * 1.3,
        top: 30,
        right: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowIcon: {
        width: 18,
        height: 6,
        transform: [{ rotate: '180deg' }],
    },
    arrowIconCollapsed: {
        transform: [],
    },
    tag: {
        width: '50%',
        borderColor: styling.COLOR_BORDER_SUBTLE,
    },
    tagTouchable: {
        paddingVertical: (44 - 16) / 2,
    },
    tagText: {
        fontFamily: 'System',
        fontSize: 14,
        lineHeight: 16,
    },
    tagLeft: {
        paddingRight: 10,
        borderRightWidth: 1,
    },
    tagRight: {
        paddingLeft: 10,
    },
    tagWithBottomBorder: {
        borderBottomWidth: 1,
    },
});

export { SubTags };
