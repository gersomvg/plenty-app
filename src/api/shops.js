import { qs, logger, fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const get = async () => {
    return await fetcher(`${API_ENDPOINT}/shop`);
};

export default {
    get,
};
