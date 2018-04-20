const logger = {
    log: (...logStatements) => {
        if (__DEV__) {
            console.log(...logStatements);
        }
    },

    warn: (...logStatements) => {
        if (__DEV__) {
            console.warn(...logStatements);
        }
    },

    error: (...logStatements) => {
        if (__DEV__) {
            console.error(...logStatements);
        } else {
            // Insert error tracking here
        }
    },
};

export {logger};
