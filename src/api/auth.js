import { fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const auth = {};

auth.signIn = ({ email, password }) => {
    return fetcher(`${API_ENDPOINT}/auth`, { method: 'POST', body: { email, password } });
};

export { auth };
