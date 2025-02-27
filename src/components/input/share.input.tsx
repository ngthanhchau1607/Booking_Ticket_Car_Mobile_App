import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
import { Keyboard, KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    inputGroup: {
        padding: 5,
        gap: 10
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
    },
    input: {
        borderColor: APP_COLOR.GREY,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5
    },
    eye: {
        position: "absolute",
        right: 10,
        top: 10,
    }
});

interface IProps {
    title?: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    value: any;
    setValue: (v: any) => void;
    disabled?: boolean;
    onChangeText?: (text: string) => void; // Thêm onChangeText vào props
}

const ShareInput = (props: IProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const { title, keyboardType, secureTextEntry, disabled = false, value, setValue, onChangeText } = props;

    const handleChangeText = (text: string) => {
        setValue(text);
        // Gọi hàm onChangeText nếu có
        if (onChangeText) {
            onChangeText(text);
        }
    };

    return (
        <View style={styles.inputGroup}>
            {title && <Text style={styles.text}>{title}</Text>}
            <View>
                <TextInput
                    value={value}
                    onChangeText={handleChangeText} // Sử dụng handleChangeText
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    keyboardType={keyboardType}
                    style={[
                        styles.input,
                        {
                            borderColor: isFocus ? APP_COLOR.ORANGE : APP_COLOR.GREY,
                            backgroundColor: disabled ? '#f0f0f0' : 'white',
                            color: disabled ? '#b0b0b0' : 'black'
                        }
                    ]}
                    secureTextEntry={secureTextEntry && !isShowPassword}
                    editable={!disabled}
                />
                {secureTextEntry && (
                    <FontAwesome5
                        style={styles.eye}
                        name={isShowPassword ? "eye" : "eye-slash"}
                        size={20}
                        color="black"
                        onPress={() => setIsShowPassword(!isShowPassword)}
                    />
                )}
            </View>
        </View>
    );
};

export default ShareInput;
