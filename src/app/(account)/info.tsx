import { Ionicons } from "@expo/vector-icons"; // Import Icon từ Ionicons
import { useNavigation } from "@react-navigation/native"; // Để sử dụng navigation
import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/api.context";
import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const InfoAccount = () => {
    const { theme, appState } = useCurrentApp();
    const [userName, setUserName] = useState<string>(appState?.user.name || "");
    const navigation = useNavigation(); // Khởi tạo navigation

    const handleUpdate = () => {
        // Xử lý khi nhấn nút cập nhật
        console.log("Cập nhật thông tin");
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
                    Thông tin tài khoản
                </Text>
            </View>

            {/* Nội dung phần thông tin người dùng */}
            <View style={styles.profileContainer}>
                {/* Thêm ảnh từ URL */}
                <Image
                    source={{
                        uri: "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/469799460_1980961335743933_7427354179227411978_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=olKBcH_wAZ8Q7kNvgEz-jC5&_nc_oc=AdhlHPfYSdo15LVXgoRZk6tf4cWcWpCC4DFCi7it3QGcQplTU3u9vAatu16yfiQKOZfpWXp4rGQ52hHSPkKGlrHi&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=AVZVCIwt4Pvl_H9ADHnz7PO&oh=00_AYDbR1pjPfVVafDvzFE_Hle1w7awKpCm8sZ0VczDIElFIw&oe=67BB5992",
                    }}
                    style={styles.avatar}
                />
                <Text style={styles.username}>{appState?.user.name}</Text>
            </View>
            <View style={styles.inputContainer}>
                <ShareInput
                    title="Họ tên"
                    value={userName}
                    setValue={setUserName}
                />
                <ShareInput
                    title="Email"
                    keyboardType="email-address"
                    value={appState?.user.email}
                    setValue={setUserName}
                />
                <ShareInput
                    title="Số điện thoại"
                    value={appState?.user.numberPhone}
                    setValue={setUserName}
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

export default InfoAccount;

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
    profileContainer: {
        marginTop: 25,
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 75, // Làm tròn ảnh để thành hình tròn
        borderWidth: 2,
        borderColor: "#ccc", // Đường viền cho ảnh
    },
    username: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    inputContainer: {
        paddingHorizontal: 25,
        marginTop: 10,
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
        marginTop: 40
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
