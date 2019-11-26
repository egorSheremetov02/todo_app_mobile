import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Navbar } from './components/Navbar.js'
import { THEME } from './theme.js'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { TodoContext } from './context/todo/todoContext.js'
import { ScreenContext } from './context/screen/screenContext'

export const MainLayout = ({}) => {
  const { todoId } = useContext(ScreenContext)

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 15
  }
})
