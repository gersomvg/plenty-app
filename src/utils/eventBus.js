import { enumerate } from './enumerate';

const eventBus = {};
const listeners = {};

eventBus.subscribe = (event, callback) => {
    if (listeners[event]) listeners[event].push(callback);
    else listeners[event] = [callback];
};

eventBus.unsubscribe = (event, callback) => {
    if (listeners[event])
        listeners[event] = listeners[event].filter($callback => $callback !== callback);
};

eventBus.publish = (event, data) => {
    if (listeners[event]) listeners[event].forEach(callback => callback(data));
};

eventBus.EVENT = enumerate('HTTP_401');

export { eventBus };
