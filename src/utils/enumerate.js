proxyHandler = {
    get: (target, key) => {
        if (typeof target[key] !== 'string' || !target[key]) {
            console.error(`Key '${key} does not exist in enum'`);
        }
        return target[key];
    },
};

const enumerate = (...keys) => {
    const enumObj = keys.reduce((prev, key) => {
        prev[key] = key;
        return prev;
    }, {});
    return new Proxy(enumObj, proxyHandler);
};

export { enumerate };
