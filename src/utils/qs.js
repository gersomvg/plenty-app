import qs from 'qs';

const stringify = params => qs.stringify(params, {addQueryPrefix: true, skipNulls: true});

export default {stringify};
