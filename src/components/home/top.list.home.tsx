import { View, Text } from "react-native"
import Banner from "./banner.home";
import { LocationProvider } from "@/context/search.context";

const TopListHome = () => {
    return (
        <View style={{ marginTop: 30 }}>
            <Banner />

        </View>
    )
}
export default TopListHome;