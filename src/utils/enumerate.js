const enumerate = (...keys) =>
    keys.reduce((prev, key) => {
        prev[key] = key;
        return prev;
    }, {});

export { enumerate };
