proxyHandler = {
    get: (target, key) => {
        if (typeof target[key] !== 'string' || !target[key]) {
            console.error(`Key '${key} does not exist in enum'`);
        }
        return target[key];
    },
};

const enumerate = (...keys) =>
    keys.reduce((prev, key) => {
        prev[key] = key;
        return prev;
    }, {});

export { enumerate };
