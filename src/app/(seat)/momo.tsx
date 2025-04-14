import React from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, router } from "expo-router";

const MomoPaymentScreen = () => {
  const { payUrl } = useLocalSearchParams();

  const handleNavigationChange = (event: any) => {
    const url = event.url;

    if (url.includes("resultCode=0")) {
      console.log("✅ Thanh toán thành công");
      router.replace("/"); // Điều hướng về trang home
    } else if (url.includes("resultCode=")) {
      console.log("❌ Thanh toán thất bại hoặc bị hủy");
    
    }
  };

  if (!payUrl) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: payUrl as string }}
      onNavigationStateChange={handleNavigationChange}
      startInLoadingState
    />
  );
};

export default MomoPaymentScreen;
