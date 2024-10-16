import axios from "axios";


const baseURL = "https://new.mussi.uz/";

const $API = axios.create({
    baseURL: baseURL,
});

export { $API };
