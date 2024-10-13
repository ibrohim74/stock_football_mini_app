import axios from "axios";


const baseURL = "https://yengi.mussi.uz/";

const $API = axios.create({
    baseURL: baseURL,
});

export { $API };
