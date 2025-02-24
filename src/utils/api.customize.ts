import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const url = process.env.EXPO_PUBLIC_API_URL

const instance = axios.create({
    baseURL: url,
})

// Add a request interceptor
instance.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const token = await AsyncStorage.getItem("token")
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // if (response.data) return response.data;
    return response;
}, function (error) {
    // if (error?.response?.data) return
    return Promise.reject(error);
});

export default instance;