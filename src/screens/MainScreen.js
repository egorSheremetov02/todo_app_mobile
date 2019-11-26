import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { TodoForm } from '../components/TodoForm'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'
import { AppLoader } from '../components/ui/AppLoader'
import { AppButton } from '../components/ui/AppButton'
import { AppText } from '../components/ui/AppText'

export const MainScreen = ({ openTodo }) => {
  const { addTodo, todos, deleteTodo, fetchTodos, error, loading } = useContext(
    TodoContext
  )
  const { changeScreen } = useContext(ScreenContext)
  const [width, setWidth] = useState(
    Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL
  )

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    const update = () => {
      setWidth(Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL)
    }
    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change')
    }
  })

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton styles onPress={() => fetchTodos()}>
          Повторить
        </AppButton>
      </View>
    )
  }

  let content = (
    <View style={{ ...styles.wrapper, width }}>
      <FlatList
        keyExtractor={item => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Todo
            todo={item}
            deleteTodo={deleteTodo}
            onOpen={changeScreen}
          ></Todo>
        )}
      />
    </View>
  )

  return (
    <View style={styles.wrapper}>
      <TodoForm onAdd={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  },
  retryButton: {
    color: THEME.RED_COLOR
  }
})
