import axios from 'axios';
import {getHeaders, getBaseUrl} from './config';

const headers = await getHeaders();
const API_BASE_URL = await getBaseUrl();

export function search(params) {
    return axios.get(`${API_BASE_URL}/search`, {
        headers,
        params
    }).then(response => {
        const data = response.data;
        return data;
    });
}

export function getSongUrl(id) {
    return axios.get(`${API_BASE_URL}/song/url`, {
        headers,
        params: { id }
    }).then(response => {
        const data = response.data;
        return data;
    });
}
