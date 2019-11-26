import React, { useState, useContext } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { THEME } from '../theme'
import { EditModal } from '../components/EditModal'
import { AppButton } from '../components/ui/AppButton'
import { TodoCard } from '../components/TodoCard'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'

export const TodoScreen = props => {
  const [modal, setModal] = useState(false)
  const { todoId, changeScreen } = useContext(ScreenContext)
  const { updateTodos, deleteTodo, todos } = useContext(TodoContext)

  const todo = todos.find(item => item.id === todoId)

  const deletePressHandler = () => {
    deleteTodo(todo.id)
  }

  const onCancel = () => {
    setModal(false)
  }

  const saveHandler = async title => {
    await updateTodos(todo.id, title)
    setModal(false)
  }

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={onCancel}
        onSave={saveHandler}
      />
      <View style={{ marginBottom: 40 }}>
        <TodoCard onLongPress={() => setModal(true)} todo={todo} />
      </View>
      {/* <AppCard style={styles.card}>
                <AppText style={styles.title}>{todo.title}</AppText>
                <View style={styles.editButton}>
                    <AppButton
                        color={ THEME.MAIN_COLOR }
                        onPress={() => setModal(true)}
                    >
                        <AntDesign name="edit" size={18} />
                    </AppButton>
                </View>
            </AppCard> */}
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <AppButton
            color={THEME.MAIN_COLOR}
            onPress={() => changeScreen(null)}
          >
            <MaterialCommunityIcons name='keyboard-backspace' size={18} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={deletePressHandler}>
            <AntDesign name='delete' size={18} />
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  editButton: {},
  button: {
    width: Dimensions.get('window').width / 3.3
  },
  title: {
    fontSize: 21
  },
  card: {
    marginBottom: 20,
    padding: 15
  }
})
