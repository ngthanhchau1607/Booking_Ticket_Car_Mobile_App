import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    todoItem: {

        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginVertical: 5,
    }
})

interface IProps {
    todoList: IToDo[];
    deleteTodo: (value: number) => void;
}
const ListTodo = (props: IProps) => {
    const { todoList, deleteTodo } = props
    return (
        <>
            <FlatList
                data={todoList}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity
                            onPress={() => deleteTodo(item.id)}
                        >
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </>
    )
}

export default ListTodo;