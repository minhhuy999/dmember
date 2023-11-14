import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import StackNavigation from './TabNavigate/StackNavigation'
import { Provider } from 'react-redux';
import store from './Redux/store'
import SplashScreen from 'react-native-splash-screen';
import NetInfo from "@react-native-community/netinfo";

const App = () => {

  // chuc nang kiem tra ket noi mang NetInfo

  // useEffect(() => {
  //   const checkNetworkConnection = async () => {
  //     const netInfo = await NetInfo.fetch();
  //     if (netInfo.isConnected) {
  //       SplashScreen.hide();
  //       console.log('Có kết nối mạng');
  //     } else {
  //       console.log('Không có kết nối mạng');
  //     }
  //   };
  //   checkNetworkConnection();
  // })

  useEffect(() => {
    SplashScreen.hide();
  }, [])

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