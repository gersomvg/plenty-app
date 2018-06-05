import { fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const get = async () => {
    return await fetcher(`${API_ENDPOINT}/category`);
};

export default {
    get,
};
