const findTagInTree = ({ tagTree, currentTag, tagId }) => {
    const tagObj = currentTag || { children: tagTree };

    // Return root if no tagId is provided
    if (!tagId) return tagObj;

    if (tagObj.id === tagId) return tagObj;

    let match = null;
    for (let i = 0; i < tagObj.children.length; i++) {
        match = findTagInTree({ currentTag: tagObj.children[i], tagId });
        if (match) break;
    }
    return match;
};

const isAncestorOfTag = ({ tag, tagId }) => {
    // Return root if no tagId is provided
    if (!tagId) return false;

    if (tag.id === tagId) return true;

    return tag.children.some(t => isAncestorOfTag({ tag: t, tagId }));
};

export { findTagInTree, isAncestorOfTag };
