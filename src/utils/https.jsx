import axios from "axios";
const hashParts = window.location.hash.split("/");
const userId = hashParts[1];
// const baseURL = "https://new.mussi.uz/";
const baseURL = "http://192.168.100.149:8000/";

let authToken = localStorage.getItem("access_token");

const $API = axios.create({
    baseURL: baseURL,
});

export const updateAuthHeader = (token) => {
    $API.defaults.headers.Authorization = `Bearer ${token}`;
};

const refreshToken = async () => {
    try {
        const response = await axios.post(`${baseURL}token`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            params:{
                user_id: userId,
            }
        });
        console.log(localStorage.getItem("access_token"));
        console.log(response);

        authToken = response.data.access_token;
        localStorage.setItem("access_token", authToken);
        updateAuthHeader(authToken);
    } catch (error) {
        console.error("Token yangilash muvaffaqiyatsiz bo'ldi:", error);
        // window.location.assign(HOME_ROUTE); // HOME_ROUTE-ni e'lon qilishingiz kerak
        // window.localStorage.removeItem("access_token");
    }
};

$API.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
});

$API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshToken();
            return $API(originalRequest); // Yangi token bilan qayta urinish
        }

        return Promise.reject(error);
    }
);

export { $API, refreshToken };
