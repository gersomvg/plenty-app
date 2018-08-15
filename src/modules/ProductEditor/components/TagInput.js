import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { Text, CheckBox } from 'common';
import { styling } from 'config';
import { isAncestorOfTag } from 'utils';

@connect(state => ({
    tags: state.tags.items,
}))
class TagInput extends React.PureComponent {
    static propTypes = {
        value: PT.arrayOf(PT.object).isRequired,
        onChange: PT.func.isRequired,
    };

    state = { expandedTagIds: [] };

    toggleExpand = tag => {
        if (this.state.expandedTagIds.includes(tag.id)) {
            this.setState(state => ({
                expandedTagIds: state.expandedTagIds.filter(tagId => tagId !== tag.id),
            }));
        } else {
            this.setState(state => ({ expandedTagIds: [...state.expandedTagIds, tag.id] }));
        }
    };

    toggleSelection = tag => {
        if (this.props.value.some($tag => $tag.id === tag.id)) {
            this.props.onChange(this.props.value.filter($tag => $tag.id !== tag.id));
        } else {
            this.props.onChange([...this.props.value, tag]);
        }
    };

    render() {
        return (
            <RN.View style={this.props.style}>
                {this.props.tags.map((tag, index) => this.renderRow(tag, index))}
            </RN.View>
        );
    }

    renderRow = (tag, index, indentation = 0) => {
        const hasChildren = !!(tag.children && tag.children.length);
        const isExpanded = this.state.expandedTagIds.includes(tag.id);
        const isActiveAncestor = this.props.value.some($tag =>
            isAncestorOfTag({ tag, tagId: $tag.id }),
        );
        return (
            <React.Fragment key={tag.id}>
                <RN.TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.row}
                    onPress={() => {
                        if (hasChildren) {
                            this.toggleExpand(tag);
                        } else {
                            this.toggleSelection(tag);
                        }
                    }}
                >
                    {index > 0 && <RN.View style={styles.topBorder} />}
                    <Text
                        style={[
                            styles.text,
                            isActiveAncestor && styles.textActive,
                            { paddingLeft: 20 * indentation },
                        ]}
                        numberOfLines={1}
                        overflowMode="ellipsize"
                    >
                        {tag.name}
                    </Text>
                    {hasChildren ? (
                        <RN.Image
                            source={require('assets/ui/row-navigate.png')}
                            style={[styles.icon, isExpanded && styles.iconRotated]}
                        />
                    ) : (
                        <CheckBox checked={this.props.value.some($tag => $tag.id === tag.id)} />
                    )}
                </RN.TouchableOpacity>
                {isExpanded &&
                    tag.children.map((childTag, childIndex) =>
                        this.renderRow(childTag, childIndex, indentation + 1),
                    )}
            </React.Fragment>
        );
    };
}

const styles = RN.StyleSheet.create({
    row: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    topBorder: {
        borderTopWidth: 1,
        borderColor: styling.COLOR_BORDER_LIGHTEST,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    text: {
        flex: 1,
        textAlign: 'left',
        paddingRight: 16,
    },
    textActive: {
        color: styling.COLOR_PRIMARY,
    },
    icon: {
        width: 6,
        height: 16,
        resizeMode: 'contain',
    },
    iconRotated: {
        transform: [{ rotate: '90deg' }],
    },
});

export { TagInput };
