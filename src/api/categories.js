import { fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const categories = {};

categories.get = () => {
    return fetcher(`${API_ENDPOINT}/category`);
};

export { categories };
