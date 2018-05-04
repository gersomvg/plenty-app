const timeoutMS = 20000;

class Timeout {
    _id = null;

    set = ms => {
        return new Promise((resolve, reject) => {
            const error = new Error({
                ok: false,
                status: 408,
            });
            const fn = () => reject(error);
            this._id = setTimeout(fn, ms);
        });
    };

    clear = () => {
        clearTimeout(this._id);
    };
}

const fetcher = async (...params) => {
    const timeout = new Timeout();
    try {
        const fetchPromise = fetch(...params);
        const timeoutPromise = timeout.set(timeoutMS);
        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) throw response;

        return await response.json();
    } catch (e) {
        throw e;
    } finally {
        timeout.clear();
    }
};

export {fetcher};
