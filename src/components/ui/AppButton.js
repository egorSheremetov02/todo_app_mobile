import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'

export const AppButton = ({
  children,
  onPress,
  propStyles,
  textStyle,
  color = THEME.MAIN_COLOR,
  onLongPress,
  opacity = 0.7
}) => {
  const longPressHandler = () => {
    if (onLongPress) {
      onLongPress()
    }
  }
  const pressHandler = () => {
    if (onPress) {
      onPress()
    }
  }
  return (
    <TouchableOpacity
      onPress={pressHandler}
      activeOpacity={opacity}
      onLongPress={longPressHandler}
    >
      <View style={{ ...styles.button, ...propStyles, backgroundColor: color }}>
        <AppTextBold style={{ ...styles.text, ...textStyle }}>
          {children}
        </AppTextBold>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff'
  }
})
