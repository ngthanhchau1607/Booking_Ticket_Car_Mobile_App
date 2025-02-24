import { StyleProp, Text, TextStyle, View } from "react-native";

interface IProps {
    title: string;
    textStyle?: StyleProp<TextStyle>;
}
const TextBetweenLine = (props: IProps) => {
    const { title, textStyle } = props;
    return (
        <View style={{
            flexDirection: "row",
            gap: 15,
            justifyContent: "center",
        }}>
            <View style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                paddingHorizontal: 35,
            }}>
            </View>
            <Text style={[textStyle, { position: "relative", top: 10 }]}>{title}</Text>

            <View style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                paddingHorizontal: 35,
            }}>
            </View>
        </View>
    )
}
export default TextBetweenLine;