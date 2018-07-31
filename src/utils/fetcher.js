import produce from 'immer';

import { makeCancelable } from './makeCancelable';
import { tokenStorage } from './tokenStorage';
import { eventBus } from './eventBus';

const timeoutMS = 60000;

class Timeout {
    id = null;

    set = ms => {
        return new Promise((resolve, reject) => {
            const error = new Error({
                ok: false,
                status: 408,
            });
            const fn = () => reject(error);
            this.id = setTimeout(fn, ms);
        });
    };

    clear = () => {
        clearTimeout(this.id);
    };
}

const baseFetcher = async (url, params = {}) => {
    const timeout = new Timeout();
    try {
        // Get body and headers from params
        let body = params.body;
        const headers = typeof headers === 'object' && headers !== null ? params.headers : {};

        // Automatically switch to JSON body if body is an object
        const hasJSONBody = typeof body === 'object' && body !== null;
        if (hasJSONBody && !params.isMultipartFormData) {
            body = JSON.stringify(params.body);
            headers['Content-Type'] = 'application/json';
        } else if (params.isMultipartFormData) {
            headers['Content-Type'] = 'multipart/form-data';
        }

        // Add Authorization header
        const token = await tokenStorage.get();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Race the request against a timeout
        const fetchPromise = fetch(url, { ...params, headers, body });
        const timeoutPromise = timeout.set(timeoutMS);
        const response = await Promise.race([fetchPromise, timeoutPromise]);

        // Handle token renewal or in case of 401 token removal
        if (response.status === 401) {
            tokenStorage.clear();
            eventBus.publish(eventBus.EVENT.HTTP_401);
        } else {
            const renewedToken = response.headers.get('Authorization');
            if (renewedToken && renewedToken.startsWith('Bearer ')) {
                tokenStorage.set(renewedToken.substring(7));
            }
        }

        // Only a response if valid json
        if (!response.ok) throw response;
        if (response.headers.get('Content-Type').includes('application/json')) {
            return await response.json();
        }
    } catch (e) {
        throw e;
    } finally {
        timeout.clear();
    }
};

const fetcher = (url, params) => makeCancelable(baseFetcher(url, params));

export { fetcher };
