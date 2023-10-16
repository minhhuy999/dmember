import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import StackNavigation from './TabNavigate/StackNavigation'
import { Provider } from 'react-redux';
import store from './Redux/store'
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
      SplashScreen.hide();
  })

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StackNavigation />
      </GestureHandlerRootView>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})