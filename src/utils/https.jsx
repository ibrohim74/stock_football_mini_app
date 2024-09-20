import axios from 'axios';

const $API = axios.create({
    baseURL: 'http://84.247.160.205/',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default $API;
