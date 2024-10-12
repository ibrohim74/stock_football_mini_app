import axios from "axios";

let authToken = null;

const baseURL = "https://yengi.mussi.uz/";

const $API = axios.create({
    baseURL: baseURL,
});

const updateAuthHeader = (token) => {
    $API.defaults.headers.Authorization = `Bearer ${token}`;
};

const RefreshToken = async () => {
    const urlHash = window.location.hash.split('/'); // Token hashdan ajratiladi
    authToken = urlHash[1]; // Tokenni olamiz

    if (!authToken) {
        console.error("Token not found in URL");
        return;
    }
    console.log(authToken);

    try {
        const response = await axios.post(
            `${baseURL}jwt/refresh`,
            null,
            {
                params: {
                    refresh_token: `${authToken}`,
                },
            }
        );
        console.log(response);

        authToken = response.data.access_token;

        // Yangi tokenni URL hashga qo'yamiz
        const newUrl = `${window.location.pathname}#/${authToken}/${urlHash[2] || ''}`;
        window.history.replaceState({}, document.title, newUrl);

        updateAuthHeader(authToken);
        console.log('Token yangilandi');
    } catch (error) {
        console.error("Failed to refresh token:", error);
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
            await RefreshToken();
            return $API(originalRequest);
        }

        return Promise.reject(error);
    }
);

setInterval(RefreshToken, 60 * 20 * 1000);

export { $API, RefreshToken };
