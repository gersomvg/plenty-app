import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import PT from 'prop-types';

import * as api from 'api';
import { makeCancelable } from 'utils';

const withFetch = Component => {
    class WithFetchHOC extends React.Component {
        requests = [];

        makeProxyHandler = (path = '') => ({
            get: (target, key) => {
                const newPath = `${path}${path ? '.' : ''}${key}`;
                if (typeof target[key] === 'object' && target[key] !== null) {
                    return new Proxy(target[key], this.makeProxyHandler(newPath));
                } else if (typeof target[key] === 'function') {
                    return new Proxy(target[key], this.makeProxyHandler(newPath));
                }
                return target[key];
            },
            apply: (target, thisArg, args) => {
                const request = target(...args);
                this.requests.push(request);
                return request;
            },
        });

        proxiedApi = new Proxy(api, this.makeProxyHandler());

        componentWillUnmount() {
            this.requests.forEach(request => request.cancel());
        }

        render() {
            const { wrappedComponentRef, ...otherProps } = this.props;
            return <Component ref={wrappedComponentRef} {...otherProps} fetch={this.proxiedApi} />;
        }
    }

    WithFetchHOC.displayName = `withFetch(${Component.displayName || Component.name})`;
    WithFetchHOC.propTypes = { wrappedComponentRef: PT.func };

    return hoistStatics(WithFetchHOC, Component);
};

export { withFetch };
