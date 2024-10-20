import axios from "axios";


const baseURL = "https://new.mussi.uz/";
// const baseURL = "http://192.168.87.18:8015/";

const $API = axios.create({
    baseURL: baseURL,
});

export { $API };
