import { useState } from "react";
import { Button, TextInput, View, StyleSheet, Alert } from "react-native";

const styles = StyleSheet.create({
    inputTodo: {
        height: 50,
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
    }
})

interface IProps {
    addTodo: (value: string) => void;
}
const InputTodo = (props: IProps) => {
    const { addTodo } = props
    const [name, setName] = useState<string>("");
    const handleAddNew = () => {
        if (!name) {
            Alert.alert("Thong tin khong hop le", "Tieu de khong duoc de trong",
                [
                    { text: "OK" }
                ]
            )
        }
        addTodo(name);
        setName("");
    }
    return (
        <>
            <View>
                <TextInput
                    onChangeText={value => setName(value)}
                    value={name}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputTodo}
                />
                <Button
                    title='Add new'
                    onPress={handleAddNew}
                />
            </View>
        </>
    )
}

export default InputTodo;