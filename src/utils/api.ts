import axios from "@/utils/api.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerApi = (name: string, email: string, numberPhone: string, password: string) => {
    const url = `/api/v1/users/register`;
    return axios.post(url, { name, email, numberPhone, password });
    // <IBackendRes<any>>
}

export const checkEmailUser = ( email: string) => {
    const url = `/api/v1/users/checkmail`;
    return axios.post(url, { email });
}

export const sendOtp = ( email: string) => {
    const url = `/api/v1/users/otp`;
    return axios.post(url, { email });
}

export const loginApi = (email: string, password: string) => {
    const url = `/api/v1/users/login`;
    return axios.post<IBackendRes<IUserLogin>>(url, { email, password });

}

export const getAccountAPi = () => {
    const url = `/api/v1/users/me`;
    return axios.get<IBackendRes<IUserLogin>>(url);

}

export const putUpdateAccount = (id: string, name: string ,numberPhone: string) => {
    const url = `/api/v1/users/update/${id}`; 
    const data = {
        name,        
        numberPhone, 
    };
    return axios.put<IBackendRes<IUserLogin>>(url, data)

}

export const putChangePass = ( id: string,oldPassword: string ,newPassword: string) => {
    const url = `/api/v1/users/update/${id}`; 
    const data = {
        oldPassword,        
        newPassword, 
    };
    return axios.put(url, data)

}

export const getfromProvince = () => {
    const url = `/api/v1/stations/province`;
    return axios.get(url);

}

export const getAllTripByUser = (fromStation:string , toStation:string, startTime:string ) => {
    const url = `/api/v1/trips/tripUser`;
    return axios.post(url,{ fromStation,toStation ,startTime });
}

export const getTripPassengerByTripId = (tripId:string ) => {
    const url = `/api/v1//tripPassenger/trip/${tripId}`;
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