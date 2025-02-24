import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { registerApi } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import axios from "axios"
import { Link } from "expo-router"
import { useEffect, useState } from "react"
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


const SignUpPage = () => {


    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    // useEffect(() => {
    //     const fetchAPI = async () => {

    //     }
    // }, [])

    const handleSignUp = async () => {
        try {
            const res = await registerApi(name, email, phone, password);
            if (res.data) {
                console.log(res)
            } else {
                const m = Array.isArray(res.message) ? res.message[0] : res.message
                Toast.show(res.m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                });
            }


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
                value={phone}
                setValue={setPhone}
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