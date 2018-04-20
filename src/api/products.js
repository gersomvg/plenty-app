import {qs, logger} from 'utils';
import {API_ENDPOINT} from 'config';

const get = async ({limit, offset, name, nextLink} = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify({limit, offset, name});
        url = `${API_ENDPOINT}/product${params}`;
    }
    const response = await fetch(url);
    return await response.json();
};

const getOne = async ({id}) => {
    const url = `${API_ENDPOINT}/product/${id}`;
    const response = await fetch(url);
    return await response.json();
};

export default {
    get,
    getOne,
};
