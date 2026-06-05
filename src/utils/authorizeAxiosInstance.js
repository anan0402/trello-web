import axios from "axios";

import { environment } from "./environment";

let authorizeAxiosInstance = axios.create();
authorizeAxiosInstance.defaults.baseURL = environment.apiBaseUrl;
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;
authorizeAxiosInstance.defaults.withCredentials = true;



authorizeAxiosInstance.interceptors.request.use((config) => {

    return config;
});


authorizeAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error.response || error);
    }
);


export default authorizeAxiosInstance;