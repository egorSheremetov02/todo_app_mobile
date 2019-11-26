import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppText } from './ui/AppText'
import { THEME } from '../theme'

export const TodoCard = ({ children, onLongPress, todo }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onLongPress={onLongPress}>
      <View style={styles.card}>
        <AppText style={styles.title}>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 7,
    backgroundColor: THEME.TODO_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: '#000'
  }
})
