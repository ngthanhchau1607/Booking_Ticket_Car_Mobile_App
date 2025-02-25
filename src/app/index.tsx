import { Link, Redirect, router, SplashScreen } from "expo-router";
import { Text, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { getAccountAPi } from "@/utils/api";
import { useCurrentApp } from "@/context/api.context";




const AppRoot = () => {
    const { appState, setAppState } = useCurrentApp();
    useEffect(() => {
        async function prepare() {
            try {
                const token = await AsyncStorage.getItem("token");

                if (!token) {
                    // Nếu không có token, chuyển hướng đến trang welcome
                    router.replace("/(auth)/welcome");
                    return;
                }

                // Nếu có token, thực hiện fetch dữ liệu người dùng
                const res = await getAccountAPi();

                if (res.data) {
                    setAppState({
                        user: res.data,
                        token: token
                    });
                    router.replace("/(tabs)"); // Điều hướng đến trang tabs
                } else {
                    // Nếu không có dữ liệu từ API, chuyển hướng về trang welcome
                    router.replace("/(auth)/welcome");
                }

                await AsyncStorage.removeItem("token");
            } catch (e) {
                console.warn("Error fetching account:", e);
            } finally {
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, []);
    if (true) {
        return (
            <Redirect href={"/(auth)/welcome"} />
        )
    }
    return (
        // <ImageBackground style={{ flex: 1 }}
        //     source={vebb}
        // >
        //     <LinearGradient
        //         style={{ flex: 1 }}
        //         colors={['transparent', '#191B2F']}
        //     // locations={[0.2, 0.8]}
        //     >
        //         <View style={styles.container}>
        //             <View style={styles.welcomeText}>
        //                 <Text style={styles.heading}>
        //                     Welcome
        //                 </Text>

        //             </View>
        //             <View style={styles.welcomeBtn}>
        //                 <TextBetweenLine title="Đăng nhập với" textStyle={{ color: "white" }} />
        //                 <View style={{
        //                     flexDirection: "row",
        //                     justifyContent: "center",
        //                     gap: 30,
        //                 }}>
        //                     <ShareButton
        //                         title="facebook"
        //                         onPress={() => { alert("me") }}
        //                         textStyle={{
        //                             textTransform: "uppercase",
        //                             flexShrink: 1,
        //                         }}
        //                         buttonStyle={{
        //                             justifyContent: "center",
        //                             borderRadius: 30,
        //                             backgroundColor: "#fff",
        //                             flexDirection: "row",
        //                             paddingHorizontal: 20,
        //                             minWidth: 100,
        //                             alignItems: "center",
        //                         }}
        //                         icon={
        //                             <Image source={fbLogo} />
        //                         }

        //                     />

        //                     <ShareButton
        //                         title="google"
        //                         onPress={() => { alert("me") }}
        //                         textStyle={{ textTransform: "uppercase" }}
        //                         buttonStyle={{
        //                             justifyContent: "center",
        //                             borderRadius: 30,
        //                             paddingHorizontal: 20,
        //                             backgroundColor: "#fff"
        //                         }}
        //                         icon={
        //                             <Image source={ggLogo} />
        //                         }
        //                     />
        //                 </View>
        //                 <View style={{
        //                     paddingHorizontal: 30
        //                 }}>
        //                     <ShareButton
        //                         title="Đăng nhập với email"
        //                         onPress={() => { router.navigate("/(auth)/login") }}
        //                         textStyle={{ color: "#fff", paddingVertical: 5 }}
        //                         buttonStyle={{
        //                             justifyContent: "center",
        //                             borderRadius: 30,
        //                             paddingVertical: 10,
        //                             backgroundColor: "#2c2c2c",
        //                             borderColor: "#ccc",
        //                             borderWidth: 1,
        //                         }}
        //                         pressStyle={{ alignSelf: "stretch" }}
        //                     />
        //                 </View>
        //                 <View style={{
        //                     flexDirection: "row",
        //                     gap: 10,
        //                     justifyContent: "center",
        //                 }}>
        //                     <Text style={{ color: "white" }}>Chưa có tài khoản?</Text>
        //                     <Link href={"/(auth)/signup"}>
        //                         <Text style={{ color: "white", textDecorationLine: "underline" }}>Đăng ký.</Text>
        //                     </Link>
        //                 </View>
        //             </View>
        //         </View>
        //     </LinearGradient>
        // </ImageBackground>
        <>
            <View style={{ alignItems: "center", paddingTop: 300 }}>
                <Text>Xin chao</Text>
            </View>
        </>
    )
}
export default AppRoot;