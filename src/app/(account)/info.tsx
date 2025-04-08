import Toast from 'react-native-root-toast'; // Import đúng Toast
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/api.context";
import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Keyboard } from "react-native"; 
import { putUpdateAccount } from "@/utils/api"; // Đảm bảo import đúng api

const InfoAccount = () => {
    const { appState ,setAppState} = useCurrentApp();
    const navigation = useNavigation(); 

    const id= appState?.user.id;  

    // chúng ta có id của thằng đó , thì gọi thằng deatail user ra , rồi cập nhật , rồi gọi ra tiếp 
    const [name, setName] = useState<string>(appState?.user.name || "");
    const [email, setEmail] = useState<string>(appState?.user.email || "");
    const [numberPhone, setNumberPhone] = useState<string>(appState?.user.numberPhone || "");
    // const [name, setName] = useState<string>(appState?.user.data.name || "");  dùng cái này nếu muốn thoát ra đăng nhập lại
    const handleUpdate = async () => {
        try {
            Keyboard.dismiss();

            if (!name || !numberPhone) {
                Toast.show("Vui lòng điền đầy đủ thông tin.", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: "#ff6600",  // Màu nền của thông báo lỗi
                    opacity: 1,
                });
                return; 
            }

            // Gọi API để cập nhật thông tin người dùng
            const response = await putUpdateAccount(id, name, numberPhone); 
            console.log("check res",response.data)

            // Kiểm tra phản hồi từ server
            if (response && response.data ) {
                Toast.show("Cập nhật thành công!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: "#4CAF50",  
                    opacity: 1,
                }); 

            setAppState((prevState:any) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    name: response.data.name,  
                    numberPhone: response.data.numberPhone,  
                },
            }));
            } else {
                // Nếu không thành công, hiển thị thông báo lỗi
                Toast.show("Cập nhật thất bại. Vui lòng thử lại.", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: "#ff6600",  // Màu nền của thông báo lỗi
                    opacity: 1,
                });
            }
        } catch (error) {
            console.log("Lỗi kết nối: ", error);
            Toast.show("Lỗi kết nối. Vui lòng thử lại sau.", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: "#ff6600",  // Màu nền của thông báo lỗi
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
                    Thông tin tài khoản
                </Text>
            </View>

            {/* Nội dung phần thông tin người dùng */}
            <View style={styles.profileContainer}>
                {/* Thêm ảnh từ URL */}
                <Image
                    source={
                        require("@/assets/avatar.jpg")
                    }
                    style={styles.avatar}
                />
                <Text style={styles.username}>{appState?.user.name}</Text>
            </View>
            <View style={styles.inputContainer}>
                <ShareInput
                    title="Họ tên"
                    value={name}
                    setValue={setName}
                />
                <ShareInput
                    title="Email"
                    keyboardType="email-address"
                    value={email}
                    disabled={true}
                    setValue={setEmail}
                />
                <ShareInput
                    title="Số điện thoại"
                    value={numberPhone}
                    setValue={setNumberPhone}
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
