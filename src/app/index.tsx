import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useCurrentApp } from "@/context/api.context";
import { Redirect } from "expo-router";

// ⚙️ Cấu hình handler cho thông báo foreground (app đang mở)
Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log("[Handler] Foreground notification triggered");
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

const AppRoot = () => {
  const { appState } = useCurrentApp();

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      console.log("[Init] Bắt đầu đăng ký thông báo...");

      if (Platform.OS === 'android') {
        console.log("[Android] Thiết lập notification channel...");
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.HIGH,
          sound: 'default',
        });
        console.log("[Android] Channel đã tạo xong");
      }

      const { status } = await Notifications.requestPermissionsAsync();
      console.log(`[Permission] Trạng thái cấp quyền: ${status}`);

      if (status !== 'granted') {
        alert('Bạn cần cấp quyền thông báo!');
        return;
      }

      console.log("[Permission] Quyền đã được cấp");
    }

    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("[Event] Người dùng tương tác với thông báo:", response);
    });

    return () => {
      subscription.remove();
      console.log("[Cleanup] Đã gỡ listener notification response");
    };
  }, []);

  useEffect(() => {
    console.log("[AppState] Giá trị appState:", appState);

    if (appState?.user) {
      console.log("[Trigger] Người dùng đã đăng nhập, sẽ gửi thông báo sau 1 phút...");

      const timer = setTimeout(async () => {
        try {
          console.log("[Send] Chuẩn bị gửi thông báo...");
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "🎉 Khuyến mãi đặc biệt!",
              body: "Đặt vé ngay để nhận ưu đãi 20% cho chuyến đi tiếp theo!",
              sound: "default",
            },
            trigger: null,
          });
          console.log("[Send] Gửi thông báo thành công!");
        } catch (error) {
          console.error("[Send] Lỗi khi gửi thông báo:", error);
        }
      },5* 60 * 1000); // 1 phút

      return () => {
        clearTimeout(timer);
        console.log("[Cleanup] Đã huỷ timeout gửi thông báo");
      };
    } else {
      console.log("[Skip] Không có user -> không gửi thông báo");
    }
  }, [appState?.user]);

  if (!appState?.user) {
    console.log("[Redirect] Chưa có user, chuyển hướng đến /welcome");
    return <Redirect href="/(auth)/welcome" />;
  }

  return <></>;
};

export default AppRoot;
