import { fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const tags = {};

tags.get = () => {
    return fetcher(`${API_ENDPOINT}/tag`);
};

export { tags };
