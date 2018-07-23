import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import PT from 'prop-types';

import * as api from 'api';
import { makeCancelable } from 'utils';

const withFetch = Component => {
    class WithFetchHOC extends React.Component {
        requests = [];

        componentWillUnmount() {
            this.requests.forEach(request => request.cancel());
        }

        doFetch = entityRequest => (...args) => {
            const [entityName, requestType] = entityRequest.split('.');
            const request = api[entityName][requestType](...args);
            this.requests.push(request);
            return request;
        };

        render() {
            const { wrappedComponentRef, ...otherProps } = this.props;
            return <Component ref={wrappedComponentRef} {...otherProps} fetch={this.doFetch} />;
        }
    }

    WithFetchHOC.displayName = `withFetch(${Component.displayName || Component.name})`;
    WithFetchHOC.propTypes = { wrappedComponentRef: PT.func };

    return hoistStatics(WithFetchHOC, Component);
};

export { withFetch };
