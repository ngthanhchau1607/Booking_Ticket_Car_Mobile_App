import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { useCurrentApp } from "@/context/api.context"
import { checkEmailUser, registerApi, sendOtp } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import axios from "axios"
import { Link, router } from "expo-router"
import { useEffect, useState } from "react"
import { Keyboard, SafeAreaView, StyleSheet, Text, View } from "react-native"
import Toast from "react-native-root-toast"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        marginHorizontal: 20,
        gap: 10
    },

})


const SignUpPage = () => {

   
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [numberPhone, setNumberPhone] = useState<string>("")
    const [password, setPassword] = useState<string>("") 

    const { setOtp } = useCurrentApp();

    // useEffect(() => {
    //     const fetchAPI = async () => {

    //     }
    // }, [])

    const handleSignUp = async () => {
        Keyboard.dismiss();
        // Kiểm tra nếu có trường nào bị trống
        if (!name || !email || !numberPhone || !password) {
            Toast.show("Vui lòng điền đầy đủ thông tin.", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
            });
            return; // Dừng hàm nếu có trường bị trống
        }

        try { 

            const res = await checkEmailUser(email);
            console.log("check res", res.status);

            // Kiểm tra status của response
            if (res.status === 200) {  
                const res1 = await sendOtp(email); 
                setOtp(res1.data.otp);
                router.navigate("/(auth)/otp");
            } else if (res.status === 400) {
                // Nếu status là 400 thì hiển thị Toast với thông báo lỗi
                Toast.show("Email không hợp lệ.", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                });
            }

            // const res = await registerApi(name, email, numberPhone, password);
            // console.log("check data", name, email, numberPhone, password)
            // if (res.data) {
            //     console.log("check data res", res.data)
            //     console.log("NumberPhone in response:", res.data.numberPhone);
            //     // Thông báo thành công
            //     Toast.show("Đăng ký thành công!", {
            //         duration: Toast.durations.LONG,
            //         textColor: "white",
            //         backgroundColor: APP_COLOR.ORANGE,
            //         opacity: 1,
            //     });
            // } else {
            //     const m = Array.isArray(res.message) ? res.message[0] : res.message
            //     Toast.show(res.m, {
            //         duration: Toast.durations.LONG,
            //         textColor: "white",
            //         backgroundColor: APP_COLOR.ORANGE,
            //         opacity: 1,
            //     });
            // }


        } catch (error) {
            console.log(error)
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
                    Đăng ký tài khoản
                </Text>
            </View>
            <ShareInput
                title="Họ tên"
                value={name}
                setValue={setName}
            />
            <ShareInput
                title="Email"
                keyboardType="email-address"
                value={email}
                setValue={setEmail}
            />
            <ShareInput
                title="Phone"
                keyboardType="number-pad"
                value={numberPhone}
                setValue={setNumberPhone}
            />
            <ShareInput
                title="Password"
                secureTextEntry={true}
                value={password}
                setValue={setPassword}
            />
            <View style={{ marginVertical: 10 }}></View>
            <ShareButton
                title="Đăng Ký"
                onPress={handleSignUp}
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
                <Text style={{ color: "black" }}>Đã có tài khoản?</Text>
                <Link href={"/(auth)/login"}>
                    <Text style={{ color: "black", textDecorationLine: "underline" }}>Đăng nhập.</Text>
                </Link>
            </View>
            <SocialButton />
        </View>
        // </SafeAreaView>
    )
}

export default SignUpPage;