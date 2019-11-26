import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Keyboard
} from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'

export const TodoForm = ({ onAdd }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onAdd(value)
    } else {
      Alert.alert('Название задачи не может быть пустым')
    }
    setValue('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder='Введите название задачи...'
        autoCorrect={false}
        autoCapitalize='none'
      />
      <AppButton color={THEME.MAIN_COLOR} onPress={pressHandler}>
        <MaterialIcons name='add' size={20} />
      </AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '75%',
    padding: 5,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
})
