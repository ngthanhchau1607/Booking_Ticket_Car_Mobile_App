import { Ionicons } from "@expo/vector-icons"; // Import Icon từ Ionicons
import { useNavigation } from "@react-navigation/native"; // Để sử dụng navigation
import ShareInput from "@/components/input/share.input";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import Toast from "react-native-root-toast";
import { useCurrentApp } from "@/context/api.context";
import { putChangePass } from "@/utils/api";

const ChangePass = () => { 

    const { appState } = useCurrentApp();
    const id= appState?.user.id;  

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigation = useNavigation(); 

    const handleUpdate = async () => { 
        Keyboard.dismiss();

        // In các giá trị mật khẩu ra console
        console.log("Mật khẩu cũ: ", oldPassword);
        console.log("Mật khẩu mới: ", newPassword);
        console.log("Mật khẩu xác nhận: ", confirmPassword);
    
        // Kiểm tra mật khẩu có khớp hay không
        if (newPassword !== confirmPassword) {
            Toast.show("Mật khẩu mới và mật khẩu xác nhận không khớp!", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: "#ff6600", // Màu nền của thông báo lỗi
                opacity: 1,
            });
            return;
        }

        if (!oldPassword || !newPassword || !confirmPassword) {
            Toast.show("Vui lòng điền đầy đủ thông tin.", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: "#ff6600", // Màu nền của thông báo lỗi
                opacity: 1,
            });
            return;
        }
    
        try {
            // Gọi API putChangePass và truyền data
            const response = await putChangePass(id, oldPassword, newPassword); 
            console.log("check data",response)
            if (response.status === 200) {
                // Hiển thị thông báo thành công
                Toast.show("Cập nhật mật khẩu thành công!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: "#28a745", // Màu nền của thông báo thành công
                    opacity: 1,
                });
                // Quay lại trang trước
                navigation.goBack();
            }
        } catch (error) {
            // Hiển thị thông báo lỗi
            Toast.show("Đã có lỗi xảy ra. Vui lòng thử lại.", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: "#ff6600", // Màu nền của thông báo lỗi
                opacity: 1,
            });
        }
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
        marginTop: 20,
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
