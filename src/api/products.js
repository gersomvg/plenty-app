import qs from 'utils/qs';
import logger from 'utils/logger';
import config from 'config';

const get = async ({limit, offset, name, nextLink} = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify({limit, offset, name});
        url = `${config.API_ENDPOINT}/product${params}`;
    }
    const response = await fetch(url);
    return await response.json();
};

const getOne = async ({id}) => {
    const url = `${config.API_ENDPOINT}/product/${id}`;
    const response = await fetch(url);
    return await response.json();
};

export default {
    get,
    getOne,
};
