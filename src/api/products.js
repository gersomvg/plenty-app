import logger from 'utils/logger';
import config from 'config';

const get = async () => {
    const response = await fetch(`${config.API_ENDPOINT}/product`);
    return await response.json();
};

export default {
    get,
};
