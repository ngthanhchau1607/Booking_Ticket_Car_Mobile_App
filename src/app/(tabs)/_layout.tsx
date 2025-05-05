import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabLayout = () => {
    const getIcons = (routerName: string, focused: boolean, size: number) => {
        let iconName: keyof typeof Ionicons.glyphMap = "search";

        if (routerName === "index") {
        iconName = focused ? "search" : "search-outline";
    } else if (routerName === "order") {
        iconName = focused ? "ticket" : "ticket-outline";
    } else if (routerName === "notification") {
        iconName = focused ? "notifications" : "notifications-outline";
    } else if (routerName === "account") {
        iconName = focused ? "person" : "person-outline";
    }

        return (
            <Ionicons name={iconName} size={size} color={focused ? "#1976d2" : "gray"} />
        );
    };

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => getIcons(route.name, focused, size),
                headerShown: false,
                tabBarLabelStyle: { paddingBottom: 3 },
                tabBarActiveTintColor: "#1976d2",
            })}
        >
            <Tabs.Screen name="index" options={{ title: "Tìm kiếm" }} />
            <Tabs.Screen name="order" options={{ title: "Vé của tôi" }} />
            <Tabs.Screen name="favorite" options={{ title: "Thông báo" }} /> 
            <Tabs.Screen name="account" options={{ title: "Tôi" }} />
        </Tabs>
    );
};

export default TabLayout;
