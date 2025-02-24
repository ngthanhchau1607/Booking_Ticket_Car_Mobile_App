import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons từ @expo/vector-icons
import { APP_COLOR } from "@/utils/constant";
import { Tabs } from "expo-router";

const TabLayout = () => {
    // Hàm trả về biểu tượng cho tab
    const getIcons = (routerName: string, focused: boolean, size: number) => {
        let iconName: keyof typeof Ionicons.glyphMap = "search"; // Thay "home" thành "search"

        // Điều kiện để chọn biểu tượng cho từng tab
        if (routerName === "index") {
            iconName = focused ? "search" : "search-outline"; // Biểu tượng cho tab Search
        } else if (routerName === "order") {
            iconName = focused ? "ticket" : "ticket-outline"; // Biểu tượng cho tab Vé của tôi (thay "cart" thành "ticket")
        } else if (routerName === "favorite") {
            iconName = focused ? "heart" : "heart-outline"; // Biểu tượng cho tab yêu thích
        } else if (routerName === "account") {
            iconName = focused ? "person" : "person-outline"; // Biểu tượng cho tab Tài khoản
        }

        // Trả về biểu tượng từ Ionicons
        return <Ionicons name={iconName} size={size} color={focused ? "#1976d2" : "gray"} />; // Thay APP_COLOR.ORANGE thành "#1976d2"
    };

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return getIcons(route.name, focused, size); // Gọi hàm getIcons
                },
                headerShown: false,
                tabBarLabelStyle: { paddingBottom: 3 },
                tabBarActiveTintColor: "#1976d2", // Màu sắc khi tab được chọn (thay APP_COLOR.ORANGE thành "#1976d2")
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tìm kiếm", // Thay "Home" thành "Search"
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    title: "Vé của tôi", // Thay "Đơn hàng" thành "Vé của tôi"
                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    title: "Đã thích",
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Tôi",
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
