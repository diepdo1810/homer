import { getItems } from './config';

const items = await getItems();
const clientId = items.map(item => item.clientId);
const clientSecret = items.map(item => item.clientSecret);
const endpoint = items.map(item => item.endpoint);

const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');
data.append('client_id', clientId);
data.append('client_secret', clientSecret);

export default async function getToken() {
    const url = `${endpoint}/api/token`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    }
    fetch(url, options).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.json();
    }).then(data => {
        // set token to local storage
        localStorage.setItem('token', data.access_token);
        return data.access_token;
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
