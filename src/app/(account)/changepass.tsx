import { Ionicons } from "@expo/vector-icons"; // Import Icon từ Ionicons
import { useNavigation } from "@react-navigation/native"; // Để sử dụng navigation
import ShareInput from "@/components/input/share.input";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ChangePass = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigation = useNavigation(); // Khởi tạo navigation

    const handleUpdate = () => {
        // Kiểm tra mật khẩu có khớp hay không
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và mật khẩu xác nhận không khớp!");
            return;
        }

        // Xử lý khi nhấn nút cập nhật
        console.log("Cập nhật mật khẩu thành công!");
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header]}>
                {/* Nút Back */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>

                {/* Tiêu đề */}
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    Thay đổi mật khẩu
                </Text>
            </View>

            {/* Form nhập mật khẩu */}
            <View style={styles.inputContainer}>
                <ShareInput
                    title="Nhập mật khẩu cũ"
                    value={oldPassword}
                    setValue={setOldPassword}
                    secureTextEntry={true} // Để ẩn mật khẩu khi nhập
                />
                <ShareInput
                    title="Nhập mật khẩu mới"
                    value={newPassword}
                    setValue={setNewPassword}
                    secureTextEntry={true} // Để ẩn mật khẩu khi nhập
                />
                <ShareInput
                    title="Nhập lại mật khẩu mới"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    secureTextEntry={true} // Để ẩn mật khẩu khi nhập
                />
            </View>

            {/* Nút Cập nhật */}
            <View style={styles.updateButtonContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateButtonText}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#f9f9f9", // Màu nền của trang
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 20,
        marginTop: 10,
        borderBottomWidth: 1, // Dấu gạch chân
        borderBottomColor: "#ccc", // Màu sắc của dấu gạch chân
    },
    backButton: {
        marginRight: 15,
        marginLeft: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        flex: 1,
        marginLeft: 20,
    },

    inputContainer: {
        paddingHorizontal: 25,
        marginTop: 100,
        gap: 20,
    },
    updateButtonContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    updateButton: {
        backgroundColor: "#1976d2", // Màu nền nút
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
