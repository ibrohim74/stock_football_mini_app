import axios from 'axios';

const $API = axios.create({
    baseURL: 'http://192.168.100.149:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default $API;
