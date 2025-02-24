import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import BusCollection from "@/components/home/collection/buscollection";
import EndCollection from "@/components/home/collection/end.collection";
import EndowCollection from "@/components/home/collection/endow.collection";
import NewsCollection from "@/components/home/collection/news.collection";

import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { useCurrentApp } from "@/context/api.context";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";

const data = [
    { key: 1, name: "Các Nhà Xe Lớn", component: <BusCollection /> },
    { key: 2, name: "Ưu đãi nổi bật", component: <EndowCollection /> },
    { key: 3, name: "Tin tức mới", component: <NewsCollection /> },
    { key: 4, name: "Nền tảng kết nối người dùng và nhà xe", component: <EndCollection /> },
];

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0f1",
        flex: 1,
        justifyContent: "center",
        overflow: "hidden",
        padding: 8,
        marginTop: 20,
    },
    list: {
        overflow: "hidden",
    },
});

const HomePage = () => {
    const { setTheme } = useCurrentApp();

    return (
        <SafeAreaView style={styles.container}>
            <CustomFlatList
                data={data}
                style={styles.list}
                renderItem={({ item }) => item.component}  // sử dụng component tương ứng
                HeaderComponent={<HeaderHome />}
                TopListElementComponent={<TopListHome />}
            />
        </SafeAreaView>
    );
};

export default HomePage;
