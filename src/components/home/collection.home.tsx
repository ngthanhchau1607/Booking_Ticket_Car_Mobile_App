import { View, Text, StyleSheet, Image, FlatList } from "react-native"
import demo from "@/assets/demo.jpg"
import { APP_COLOR } from "@/utils/constant";
const styles = StyleSheet.create({
    container: {
        height: 250,
        marginBottom: 10,
        width: "100%"
    },

})
interface IProps {
    name: string,
}

const CollectionHome = (props: IProps) => {
    const { name } = props;
    const data = [
        { key: 1, image: demo, name: "Cua hang 1 " },
        { key: 2, image: demo, name: "Cua hang 2 " },
        { key: 3, image: demo, name: "Cua hang 3 " },
        { key: 4, image: demo, name: "Cua hang 4 " },
        { key: 5, image: demo, name: "Cua hang 5 " },
        { key: 6, image: demo, name: "Cua hang 6 " },
    ]
    return (
        <>
            <View style={{ height: 30, backgroundColor: "#e9e9e9" }}></View>
            <View style={styles.container}>
                <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 15 }}>
                    <Text style={{
                        color: APP_COLOR.ORANGE,
                        fontSize: 16,
                        fontWeight: "600"
                    }}>{name}</Text>
                    <Text style={{ color: "#5a5a5a" }}>Xem tất cả</Text>
                </View>
                <FlatList
                    data={data}
                    horizontal
                    contentContainerStyle={{ gap: 20 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: "#efefef" }}>
                                <Image
                                    style={{ height: 130, width: 250 }}
                                    source={demo} />
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                                </View>

                            </View>

                        )
                    }}
                />

            </View>
        </>
    )
}
export default CollectionHome;