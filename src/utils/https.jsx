import axios from 'axios';

const $API = axios.create({
    // baseURL: 'https://yengi.mussi.uz/',
    baseURL: 'http://192.168.100.149:8015',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default $API;
