import {qs, logger, fetcher} from 'utils';
import {API_ENDPOINT} from 'config';

const get = async ({limit, offset, name, nextLink} = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify({limit, offset, name});
        url = `${API_ENDPOINT}/product${params}`;
    }
    return await fetcher(url);
};

const getOne = async ({id}) => {
    const url = `${API_ENDPOINT}/product/${id}`;
    return await fetcher(url);
};

export default {
    get,
    getOne,
};
