import React, { createContext, useContext, useState } from "react";

// Tạo type cho thông báo
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number; // Thời gian nhận thông báo
}

// Tạo context để lưu trữ thông báo
const NotificationContext = createContext<any>(null);

// Cung cấp giá trị thông báo
export const NotificationProvider = ({ children }: any) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Thêm một thông báo mới
  const addNotification = (notification: Notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  // Xóa thông báo theo ID
  const removeNotification = (id: string) => {
    setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook để sử dụng context
export const useNotifications = () => useContext(NotificationContext);
