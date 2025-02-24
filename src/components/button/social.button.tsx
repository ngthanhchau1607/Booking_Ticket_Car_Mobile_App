import { Image, StyleSheet, View } from "react-native";
import TextBetweenLine from "../more/text.between.line";
import ShareButton from "./share.button";
import fbLogo from '@/assets/auth/facebook.png';
import ggLogo from '@/assets/auth/google.png';

const styles = StyleSheet.create({
    welcomeBtn: {
        flex: 1,
        gap: 10
    }
});

const SocialButton = () => {
    return (
        <View style={styles.welcomeBtn}>
            <TextBetweenLine title="Đăng nhập với" />
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 30
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
        </View>
    );
};

export default SocialButton;
