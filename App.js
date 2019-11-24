import React, {useState} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Navbar } from './src/components/Navbar.js'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'indie-flower-regular': require('./assets/fonts/IndieFlower-Regular.ttf'),
    'hand-writing-regular': require('./assets/fonts/AmaticSC-Regular.ttf'),
    'hand-writing-bold': require('./assets/fonts/AmaticSC-Bold.ttf'),
    'sans-regular': require('./assets/fonts/PTSansNarrow-Regular.ttf'),
    'sans-bold': require('./assets/fonts/PTSansNarrow-Bold.ttf'),
    'odibee-regular': require('./assets/fonts/OdibeeSans-Regular.ttf')
  })
}

export default function App() { 
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])

  const switchToMainScreen = () => {
    setTodoId(null)
  }  

  if (!isReady) {
    return (
      <AppLoading 
        startAsync={loadApplication} 
        onError={err => console.log(err)} 
        onFinish={() => setIsReady(true)} 
      />
    )
  }

  const addTodo = title => {
    setTodos(prevTodos => [
      {
        id: Date.now().toString(),
        title
      },
      ...prevTodos
    ])
  }

  const updateTodos = (id, newTitle) => {
    setTodos(prevTodo => prevTodo.map(todo => {
      if (todo.id === id){
        todo.title = newTitle
      }
      return todo
    }))
  }

  const deleteTodoWithAlert = id => {
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'distructive', 
          onPress: () => {
            switchToMainScreen()
            deleteTodo(id)
          }
        },
      ],
      {cancelable: false},
    )
  }

  const deleteTodo = id => {
    setTodos(prevTodo => prevTodo.filter(todo => todo.id !== id))
  }

  const openTodo = id => {
    setTodoId(id)
  }

  let content = (
    <MainScreen 
      openTodo={openTodo}
      todos={todos} 
      addTodo={addTodo} 
      deleteTodo={deleteTodoWithAlert} 
    />)

  if (todoId){
    const todo = todos.find(item => item.id === todoId)
      content = <TodoScreen 
      todo={todo} 
      deleteTodo={deleteTodoWithAlert} 
      goBack={switchToMainScreen} 
      updateTodos={updateTodos}
    />
  }

  return (
    <View style={{flex: 1}}>
      <Navbar />
      <View style={styles.container}>
        { content }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15
  }
})