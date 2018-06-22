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

const fetcher = async (url, params = {}) => {
    const timeout = new Timeout();
    try {
        const fetchPromise = fetch(url, {
            ...params,
            headers: ['POST', 'PUT', 'PATCH'].includes(params.method)
                ? {
                      'Content-Type': 'application/json',
                  }
                : undefined,
            body: params.body ? JSON.stringify(params.body) : undefined,
        });
        const timeoutPromise = timeout.set(timeoutMS);
        const response = await Promise.race([fetchPromise, timeoutPromise]);

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

export { fetcher };
