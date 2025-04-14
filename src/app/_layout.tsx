import AppProvider from "@/context/api.context";
import { Stack, useRouter } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LocationProvider } from "@/context/search.context";
import AppRoot from ".";
import { TripProvider } from "@/context/trip.context";
import { TripPassengerProvider } from "@/context/trippassenger.context";
import { InfoProvider } from "@/context/info.context";
import { RegisterProvider } from "@/context/register.context";
import * as Linking from "expo-linking";
import { useEffect } from "react";

const RootLayout = () => {

    const router = useRouter();

    useEffect(() => {
        // Xử lý deep link khi ứng dụng được mở từ deep link
        const handleDeepLink = ({ url }: { url: string }) => {
          const { path } = Linking.parse(url);
          console.log('Deep link detected:', url, '| parsed path:', path);
    
          // Kiểm tra xem deep link có phải là "payment-result" không
          if (path === 'payment-result') {
            router.replace('/(news)/baohiem'); // Chuyển hướng đến trang baohiem
          }
        };
    
        // Đăng ký sự kiện deep link
        const subscription = Linking.addEventListener('url', handleDeepLink);
    
        // Cleanup khi component bị unmount
        return () => {
          subscription.remove();
        };
      }, []);


    return (
        <RootSiblingParent>
            <AppProvider>
                <RegisterProvider>
                <LocationProvider> 
                <TripProvider>
                <TripPassengerProvider>
                <InfoProvider>
                <AppRoot />
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/otp" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/welcome" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                        <Stack.Screen name="(news)/baohiem" options={{ headerShown: false }} />
                        <Stack.Screen name="(news)/kiniem" options={{ headerShown: false }} />
                        <Stack.Screen name="(news)/sandeal" options={{ headerShown: false }} />
                        <Stack.Screen name="(news)/tichdiem" options={{ headerShown: false }} />
                        <Stack.Screen name="(news)/allnew" options={{ headerShown: false }} />

                        <Stack.Screen name="(endow)/xetoanthang" options={{ headerShown: false }} />
                        <Stack.Screen name="(endow)/banmoi" options={{ headerShown: false }} />
                        <Stack.Screen name="(endow)/thue7cho" options={{ headerShown: false }} />
                        <Stack.Screen name="(endow)/dealhot" options={{ headerShown: false }} />
                        <Stack.Screen name="(endow)/allendow" options={{ headerShown: false }} />

                        <Stack.Screen name="(account)/info" options={{ headerShown: false }} />
                        <Stack.Screen name="(account)/changepass" options={{ headerShown: false }} />


                        <Stack.Screen name="(search)/search" options={{ headerShown: false }} />
                        <Stack.Screen name="(search)/searchto" options={{ headerShown: false }} />
                        <Stack.Screen name="(search)/date" options={{ headerShown: false }} />
                        <Stack.Screen name="(search)/result" options={{ headerShown: false }} />


                        <Stack.Screen name="(station)/miendong" options={{ headerShown: false }} />
                        <Stack.Screen name="(station)/mientay" options={{ headerShown: false }} />
                        <Stack.Screen name="(station)/dalat" options={{ headerShown: false }} />
                        <Stack.Screen name="(station)/dongcu" options={{ headerShown: false }} />
                        <Stack.Screen name="(station)/allstation" options={{ headerShown: false }} />

                        <Stack.Screen name="(seat)/seat" options={{ headerShown: false }} />
                        <Stack.Screen name="(seat)/pickup" options={{ headerShown: false }} />
                        <Stack.Screen name="(seat)/dropoff" options={{ headerShown: false }} />
                        <Stack.Screen name="(seat)/info" options={{ headerShown: false }} />
                        <Stack.Screen name="(seat)/infoticket" options={{ headerShown: false }} />
                        <Stack.Screen name="(seat)/payment" options={{ headerShown: false }} />
                        <Stack.Screen name="(seat)/momo" options={{ headerShown: false }} />



                    </Stack>
                    </InfoProvider>
                    </TripPassengerProvider>
                    </TripProvider>
                </LocationProvider>
                </RegisterProvider>
            </AppProvider>
        </RootSiblingParent >
    );
};

export default RootLayout;
