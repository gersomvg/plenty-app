import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const Root = ({useComponent: ViewComponent, children, ...viewProps}) => {
    return (
        <ViewComponent style={styles.root} {...viewProps}>
            <RN.KeyboardAvoidingView style={styles.subroot} behavior="padding">
                {children}
            </RN.KeyboardAvoidingView>
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
    subroot: {
        flex: 1,
    },
});

export {Root};
