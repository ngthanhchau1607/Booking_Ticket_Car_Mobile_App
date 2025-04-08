import AppProvider from "@/context/api.context";
import { Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LocationProvider } from "@/context/search.context";
import AppRoot from ".";
import { TripProvider } from "@/context/trip.context";
import { TripPassengerProvider } from "@/context/trippassenger.context";

const RootLayout = () => {
    return (
        <RootSiblingParent>
            <AppProvider>
                <LocationProvider> 
                <TripProvider>
                <TripPassengerProvider>
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



                    </Stack>
                    </TripPassengerProvider>
                    </TripProvider>
                </LocationProvider>
            </AppProvider>
        </RootSiblingParent >
    );
};

export default RootLayout;
