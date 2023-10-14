import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { getAPIandDOMAIN } from './AsysncStorage/AsysncAPI'
import StackNavigation from './TabNavigate/StackNavigation'

const App = () => {


  const [APIkey, setAPIkey] = useState<string>('')
  const [Domain, setDomain] = useState<string>('')

  useEffect(() => {
    getAPIandDOMAIN({setAPIkey,setDomain})
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackNavigation APIkey={APIkey} Domain={Domain}/>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})