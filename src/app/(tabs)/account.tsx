import { APP_COLOR } from "@/utils/constant";
import React from "react";
import { View, StyleSheet, Image, Text, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountPage = () => {
    const insets = useSafeAreaInsets(); // Sử dụng hook này để lấy safe area insets

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    paddingTop: insets.top,
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    backgroundColor: "#1976d2", // Màu xanh cho header
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center"
                }}  >
                <Image
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                    source={require("@/assets/avatar.jpg")}
                />
                <View>
                    <Text style={{ color: "white", fontSize: 20 }} >Xin chao</Text>
                </View>
            </View>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
            }}
                onPress={() => router.navigate("/(account)/info")}
            >
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <Feather name="user-check" size={20} color="black" />
                    <Text>Cập nhật thông tin</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
            }}
                onPress={() => router.navigate("/(account)/changepass")}
            >
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <FontAwesome name="exchange" size={24} color="black" />
                    <Text>Thay đổi mật khẩu</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <MaterialIcons name="language" size={24} color="black" />
                    <Text>Ngôn ngữ</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <Feather name="settings" size={24} color="black" />
                    <Text>Cài đặt</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                gap: 10,
                paddingBottom: 15
            }}>
                <Pressable
                    style={({ pressed }) => ({
                        opacity: pressed === true ? 0.5 : 1,
                        padding: 10,
                        marginHorizontal: 10,
                        backgroundColor: "#BBDEFB", // Màu xanh nhạt cho background "Đăng xuất"
                        borderRadius: 3
                    })}
                    onPress={() => {
                        // Hiển thị alert khi nhấn vào nút Đăng xuất
                        Alert.alert(
                            "Xác nhận", // Tiêu đề
                            "Bạn có chắc chắn muốn đăng xuất?", // Nội dung
                            [
                                {
                                    text: "Hủy", // Nút hủy
                                    onPress: () => console.log("Hủy bỏ đăng xuất"),
                                    style: "cancel"
                                },
                                {
                                    text: "Đăng xuất", // Nút xác nhận đăng xuất
                                    onPress: async () => {
                                        try {
                                            // Xóa token khỏi AsyncStorage
                                            await AsyncStorage.removeItem("token");
                                            // Cập nhật lại appState nếu bạn đang dùng context (nếu có)
                                            // setAppState(null); // Giả sử bạn đang sử dụng useCurrentApp

                                            // Điều hướng người dùng về trang welcome
                                            router.replace("/(auth)/welcome");
                                            console.log("Đã đăng xuất");
                                        } catch (error) {
                                            console.warn("Lỗi khi đăng xuất:", error);
                                        }
                                    }
                                }
                            ],
                            { cancelable: true } // Cho phép hủy bỏ khi nhấn ra ngoài hộp thoại
                        );
                    }}
                >
                    <Text style={{
                        textAlign: "center",
                        color: "black"
                    }}>
                        Đăng xuất
                    </Text>
                </Pressable>
                <Text style={{ textAlign: "center", color: "black" }}>
                    Version 1.0 -@Dinhxombac
                </Text>
            </View>
        </View>
    );
};

export default AccountPage;
