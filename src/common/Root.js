import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const Root = ({useComponent: ViewComponent, children, ...viewProps}) => {
    return (
        <ViewComponent style={styles.root} {...viewProps}>
            {children}
        </ViewComponent>
    );
};

Root.propTypes = {
    children: PT.any,
    useComponent: PT.oneOfType([PT.func, PT.element]).isRequired,
};

Root.defaultProps = {
    useComponent: RN.View,
};

const styles = RN.StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Root;
