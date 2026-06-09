import axios from "axios";

import { environment } from "./environment";
import { logoutUserAPI } from "../redux/userSlice/userSlice";
import { refreshToken } from "../services/auth.service";

let authStore = null

export const injectStore = (store) => {
    authStore = store;
}

let authorizeAxiosInstance = axios.create();
authorizeAxiosInstance.defaults.baseURL = environment.apiBaseUrl;
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;
authorizeAxiosInstance.defaults.withCredentials = true;



authorizeAxiosInstance.interceptors.request.use((config) => {

    return config;
});

let refreshTokenPromise = null;

authorizeAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authStore.dispatch(logoutUserAPI());
        }
        
        const originalRequest = error.config;
        if(error.response?.status === 410 && !originalRequest._retry) {
            originalRequest._retry = true;

            if(!refreshTokenPromise) {
                refreshTokenPromise = refreshToken()
                .then((res)=>{
                    return res
                })
                .catch((error) => {
                    authStore.dispatch(logoutUserAPI());
                    return Promise.reject(error.response || error);
                })
                .finally(() => {
                    refreshTokenPromise = null;
                });
            }
            return refreshTokenPromise.then(() => {
                return authorizeAxiosInstance(originalRequest);
            });
        }
    }
);


export default authorizeAxiosInstance;