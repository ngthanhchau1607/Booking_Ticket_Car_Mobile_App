import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { useCurrentApp } from "@/context/api.context"
import { loginApi } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, router } from "expo-router"
import { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import Toast from "react-native-root-toast"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        marginHorizontal: 20,
        gap: 10
    },

})

const LoginPage = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { setAppState } = useCurrentApp();
    const handleLogin = async () => {
        try {
            const res = await loginApi(email, password);
            if (res && res.data && res.data.token) {
                await AsyncStorage.setItem("token", res.data.token);
                setAppState(res.data);
                console.log("check phone", res.data.user)
                router.replace("/(tabs)");
            } else {
                Toast.show("Đăng nhập thất bại. Vui lòng thử lại.", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                });
            }
        } catch (error) {
            console.log("Lỗi: ", error);
            Toast.show("Lỗi kết nối. Vui lòng thử lại sau.", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
            });
        }
    }

    return (
        // <SafeAreaView>
        <View style={styles.container}>
            <View>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 600,
                    marginHorizontal: 30
                }}>
                    Đăng nhập với email
                </Text>
            </View>
            <ShareInput
                title="Email"
                keyboardType="email-address"
                value={email}
                setValue={setEmail}
            />
            <ShareInput
                title="Password"
                secureTextEntry={true}
                value={password}
                setValue={setPassword}
            />
            <View style={{ marginVertical: 10 }}></View>
            <ShareButton
                title="Đăng Nhập"
                onPress={handleLogin}
                textStyle={{ textTransform: "uppercase", color: "#fff", paddingVertical: 5 }}
                buttonStyle={{
                    justifyContent: "center",
                    borderRadius: 30,
                    paddingVertical: 10,
                    backgroundColor: APP_COLOR.ORANGE,
                }}
                pressStyle={{ alignSelf: "stretch" }}
            />
            <View style={{
                marginVertical: 15,
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
            }}>
                <Text style={{ color: "black" }}>Chưa có tài khoản?</Text>
                <Link href={"/(auth)/signup"}>
                    <Text style={{ color: "black", textDecorationLine: "underline" }}>Đăng ký.</Text>
                </Link>
            </View>
            <SocialButton />
        </View>
        // </SafeAreaView>
    )
}

export default LoginPage;