import { APP_COLOR } from "@/utils/constant";
import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";

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
                    source={{ uri: "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/469799460_1980961335743933_7427354179227411978_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=olKBcH_wAZ8Q7kNvgEz-jC5&_nc_oc=AdhlHPfYSdo15LVXgoRZk6tf4cWcWpCC4DFCi7it3QGcQplTU3u9vAatu16yfiQKOZfpWXp4rGQ52hHSPkKGlrHi&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=AVZVCIwt4Pvl_H9ADHnz7PO&oh=00_AYDbR1pjPfVVafDvzFE_Hle1w7awKpCm8sZ0VczDIElFIw&oe=67BB5992" }}
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
                <Pressable style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    padding: 10,
                    marginHorizontal: 10,
                    backgroundColor: "#BBDEFB", // Màu xanh nhạt cho background "Đăng xuất"
                    borderRadius: 3
                })}>
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
