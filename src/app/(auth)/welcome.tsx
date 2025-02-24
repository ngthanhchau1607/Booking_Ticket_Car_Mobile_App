import { Link, Redirect, router } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import vebb from '@/assets/ve/vebb.jpg'
import fbLogo from '@/assets/auth/facebook.png'
import ggLogo from '@/assets/auth/google.png'
import { LinearGradient } from "expo-linear-gradient";
import TextBetweenLine from "@/components/more/text.between.line";
import ShareButton from "@/components/button/share.button";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcomeText: {
        flex: 0.6,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 20,
    },
    welcomeBtn: {
        flex: 0.4,
        gap: 20
    },
    heading: {
        fontSize: 40,
        fontWeight: "600",
        color: "black"
    },


})
const WelcomePage = () => {

    return (
        <ImageBackground style={{ flex: 1 }}
            source={vebb}
        >
            <LinearGradient
                style={{ flex: 1 }}
                colors={['transparent', '#191B2F']}
            // locations={[0.2, 0.8]}
            >
                <View style={styles.container}>
                    <View style={styles.welcomeText}>
                        <Text style={styles.heading}>
                            Welcome
                        </Text>

                    </View>
                    <View style={styles.welcomeBtn}>
                        <TextBetweenLine title="Đăng nhập với" textStyle={{ color: "white" }} />
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 30,
                        }}>
                            <ShareButton
                                title="facebook"
                                onPress={() => { alert("me") }}
                                textStyle={{
                                    textTransform: "uppercase",
                                    flexShrink: 1,
                                }}
                                buttonStyle={{
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    backgroundColor: "#fff",
                                    flexDirection: "row",
                                    paddingHorizontal: 20,
                                    minWidth: 100,
                                    alignItems: "center",
                                }}
                                icon={
                                    <Image source={fbLogo} />
                                }

                            />

                            <ShareButton
                                title="google"
                                onPress={() => { alert("me") }}
                                textStyle={{ textTransform: "uppercase" }}
                                buttonStyle={{
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    paddingHorizontal: 20,
                                    backgroundColor: "#fff"
                                }}
                                icon={
                                    <Image source={ggLogo} />
                                }
                            />
                        </View>
                        <View style={{
                            paddingHorizontal: 30
                        }}>
                            <ShareButton
                                title="Đăng nhập với email"
                                onPress={() => { router.navigate("/(auth)/login") }}
                                textStyle={{ color: "#fff", paddingVertical: 5 }}
                                buttonStyle={{
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    paddingVertical: 10,
                                    backgroundColor: "#2c2c2c",
                                    borderColor: "#ccc",
                                    borderWidth: 1,
                                }}
                                pressStyle={{ alignSelf: "stretch" }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            gap: 10,
                            justifyContent: "center",
                        }}>
                            <Text style={{ color: "white" }}>Chưa có tài khoản?</Text>
                            <Link href={"/(auth)/signup"}>
                                <Text style={{ color: "white", textDecorationLine: "underline" }}>Đăng ký.</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>

    )
}
export default WelcomePage;