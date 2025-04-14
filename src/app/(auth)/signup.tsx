import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { useRegister } from "@/context/register.context"
import { checkEmailUser, sendOtp } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { Link, router } from "expo-router"
import { useState } from "react"
import { Keyboard, StyleSheet, Text, View } from "react-native"
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

    // Lấy setOtp và setUserInfo từ RegisterContext
    const { setOtp, setUserInfo } = useRegister()

    const handleSignUp = async () => {
        Keyboard.dismiss()

        // Kiểm tra nếu có trường nào bị trống
        if (!name || !email || !numberPhone || !password) {
            Toast.show("Vui lòng điền đầy đủ thông tin.", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
            })
            return // Dừng hàm nếu có trường bị trống
        }

        try {
            // Kiểm tra email đã tồn tại
            const res = await checkEmailUser(email)
            console.log("check res", res.status)

            // Kiểm tra status của response
            if (res.status === 200) {
                // Gọi sendOtp và lưu OTP vào context
                const res1 = await sendOtp(email)
                setOtp(res1.data.otp) // Lưu OTP vào context

                // Lưu thông tin người dùng vào context
                setUserInfo({
                    name,
                    email,
                    numberPhone: numberPhone,
                    password,
                })

                // Chuyển hướng đến trang OTP và truyền OTP qua params
                router.push({
                    pathname: "/(auth)/otp"
                })
            } else if (res.status === 400) {
                // Nếu email không hợp lệ
                Toast.show("Email không hợp lệ.", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
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
    )
}

export default SignUpPage
