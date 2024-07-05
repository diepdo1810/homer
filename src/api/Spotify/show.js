/**
import {getHeaders, getBaseUrl, getItems } from './config';
import getToken from './client';

const headers = await getHeaders();
const API_BASE_URL = await getBaseUrl();
const items = await getItems();
const id = items.map(item => item.id);
const limit = 10;

// set timeout for 50 minutes
setTimeout(async () => {
  const token = await getToken();
  console.log('Token has expired, fetching new token', token);
}, 3000000);

export async function show() {
    const url = `${API_BASE_URL}/shows/${id}/episodes?limit=${limit}`;
    const options = {
        method: 'GET',
        headers: headers,
    }

    return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
 */
