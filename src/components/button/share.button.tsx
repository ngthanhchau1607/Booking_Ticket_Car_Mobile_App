import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { APP_COLOR } from "../../utils/constant";
import { ReactNode } from "react";

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        borderColor: "red",
    },

})

interface IProps {
    title: string;
    onPress: () => void;
    textStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    pressStyle?: StyleProp<ViewStyle>;
    icon?: ReactNode
}
const ShareButton = (props: IProps) => {
    const {
        title, onPress, textStyle, buttonStyle, pressStyle, icon

    } = props;
    return (
        <Pressable
            style={({ pressed }) => ([
                {
                    opacity: pressed === true ? 0.5 : 1,
                    alignSelf: "flex-start", //fit-content
                }, pressStyle
            ])}
            onPress={onPress}
        >
            <View style={[styles.btnContainer, buttonStyle]}>
                {icon}
                <Text style={textStyle}>{title}</Text>
            </View>
        </Pressable>
    )
}

export default ShareButton;
