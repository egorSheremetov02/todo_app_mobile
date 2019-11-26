import React, { useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { MainLayout } from './src/MainLayout'
import { TodoState } from './src/context/todo/TodoState'
import { ScreenState } from './src/context/screen/ScreenState'

async function loadApplication() {
  await Font.loadAsync({
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

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  )
}
