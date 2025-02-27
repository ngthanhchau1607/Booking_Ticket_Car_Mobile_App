import { Link, Redirect, router, SplashScreen } from "expo-router";
import { Text, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { getAccountAPi } from "@/utils/api";
import { useCurrentApp } from "@/context/api.context";

const AppRoot = () => {
    const { appState, setAppState } = useCurrentApp();

    // useEffect(() => {
    //     async function prepare() {
    //         try {
    //             const token = await AsyncStorage.getItem("token");

    //             if (!token) {
    //                 // Nếu không có token, chuyển hướng đến trang welcome
    //                 router.replace("/(auth)/welcome");
    //                 return;
    //             }
    //             else {
    //                 const res = await getAccountAPi(); 
        
    //                 setAppState({
    //                     user: res.data,
    //                     token: token
    //                 }); 

    //                 // Sau khi đã cập nhật appState, chuyển hướng sang trang chính
    //                 router.replace("/(tabs)"); 
    //             }
    //         } catch (e) {
    //             console.warn("Error fetching account:", e);
    //         } finally {
    //             await SplashScreen.hideAsync();
    //         }
    //     }

    //     prepare();
    // }, []);

    // useEffect(() => {
    //     // Kiểm tra khi appState thay đổi
    //     console.log("Updated appState: ", appState);
    // }, [appState]);

    if (!appState?.user) {
        return (
            <Redirect href="/(tabs)" />
        );
    }

    return (
        <>
        </>
    );
};

export default AppRoot;
