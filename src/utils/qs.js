import $qs from 'qs';

const qs = {
    stringify: params => $qs.stringify(params, {addQueryPrefix: true, skipNulls: true}),
};

export {qs};
