import axios from 'axios';

const $API = axios.create({
    // baseURL: 'https://yengi.mussi.uz/',
    baseURL: 'https://yengi.mussi.uz/',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default $API;
