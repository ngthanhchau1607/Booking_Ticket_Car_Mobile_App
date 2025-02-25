import axios from "@/utils/api.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerApi = (name: string, email: string, numberPhone: string, password: string) => {
    const url = `/api/v1/users/register`;
    return axios.post(url, { name, email, numberPhone, password });
    // <IBackendRes<any>>
}

export const loginApi = (email: string, password: string) => {
    const url = `/api/v1/users/login`;
    return axios.post<IBackendRes<IUserLogin>>(url, { email, password });

}

export const getAccountAPi = () => {
    const url = `/api/v1/users/me`;
    return axios.get<IBackendRes<IUserLogin>>(url);

}


export const getfromProvince = () => {
    const url = `/api/v1/stations/province`;
    return axios.get(url);

}



export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStorage: any = {}
            stores?.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1]
            });
            console.log(JSON.stringify(asyncStorage, null, 2));
        });
    });
};