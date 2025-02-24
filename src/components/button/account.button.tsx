import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Định nghĩa các icon hợp lệ
type IconName =
    | "star-outline"
    | "pricetag-outline"
    | "gift-outline"
    | "person-outline"
    | "wallet-outline"
    | "chevron-forward"
    | "heart-outline" // Thêm các icon khác nếu cần
    | "filter" // Ví dụ nếu bạn cần thêm các icon khác

interface ButtonProps {
    title: string;
    icon: IconName; // Chỉ cho phép các giá trị hợp lệ
    onPress: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.buttonContent}>
                <Ionicons name={icon} size={24} color="black" />
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default CustomButton;
