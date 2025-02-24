import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import InputTodo from './src/components/todo/input.todo';
import ListTodo from './src/components/todo/list.todo';

export default function App() {
  const [todoList, setTodoList] = useState<IToDo[]>([])

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const addTodo = (text: string) => {
    const todo = { id: randomIntFromInterval(1, 100), title: text };
    setTodoList([...todoList, todo]);
  }
  const deleteTodo = (id: number) => {
    const newTodo = todoList.filter(todo => todo.id != id)
    setTodoList(newTodo)
  }
  return (
    <View style={styles.container}>
      <InputTodo
        addTodo={addTodo}
      />
      <ListTodo
        todoList={todoList}
        deleteTodo={deleteTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20
  },

});
