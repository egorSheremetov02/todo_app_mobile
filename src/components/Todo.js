import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AppTextHandwriting } from './ui/AppTextHandwriting'
import { AppText } from './ui/AppText'
import { THEME } from '../theme'

export const Todo = ({ todo, deleteTodo, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onOpen(todo.id)}
      onLongPress={deleteTodo.bind(null, todo.id)}
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    backgroundColor: THEME.TODO_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 7
  }
})
