import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import HomeBottomTab from './TabNavigate/HomeBottomTab'
import ScreenLogin from './Account/AccountFuntion/ScreenLogin'
import ScreenMissPass from './Account/AccountFuntion/ScreenMissPass'
import ScreenRegister from './Account/AccountFuntion/ScreenRegister'
import ScreenTTdcredit from './Home/HomeFuntion/ScreenTTdcredit'
import ScreenRdcash from './Home/HomeFuntion/ScreenRdcash'
import ScreenHistoryRdcash from './Home/HomeFuntion/ScreenHistoryRdcash'
import ScreenHistoryTH from './Home/HomeFuntion/ScreenHistoryTH'
import ScreenDetailProduct from './DetailProduct/ScreenDetailProduct'
import ScreenBieumau from './DetailProduct/Bieumau/ScreenBieumau'
import ScreenStore from './Shop/ScreenStore'
import ScreenBaoMat from './Account/AccountFuntion/ScreenBaoMat'
import ScreenQldiachi from './Account/AccountFuntion/ScreenQldiachi'
import ScreenDsTv from './Account/AccountFuntion/ScreenDsTv'
import ScreenPostTv from './Account/AccountFuntion/ScreenPostTv'
import ScreenDtmember from './Detailaccount/ScreenDtmember'
import ScreenBc from './Account/AccountFuntion/ScreenBc'
import ScreenVdcash from './Home/HomeFuntion/ScreenVdcash'
import ScreenTintuc from './Account/AccountFuntion/ScreenTintuc'
import ScreenSproduct from './Search/ScreenSproduct'
import ScreenTTdathang from './Shop/ScreenTTdathang'
import ScreenDetailorder from './Order/ScreenDetailorder'
import ScreenDSdiachi from './Shop/ShopFuntion/ScreenDSdiachi'
import ScreenAddLocation from './Shop/ShopFuntion/ScreenAddLocation'
import ScreenChuyenTien from './Home/HomeFuntion/ScreenChuyenTien'
import ScreenChTienB2 from './Home/HomeFuntion/ScreemChTienB2'
import ScreenXacNhanCt from './Home/HomeFuntion/ScreenXacNhanCt'
import ScreenDsviec from './Account/AccountFuntion/ScreenDsviec'
import ScreenDtcongviec from './Detailcongviec/ScreenDtcongviec'
import AnimationBottom from './Note/AnimationBottom'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ScreenDtUser from './Detailaccount/ScreenDtUser'

const Stack = createNativeStackNavigator()

const App = () => {

  const apiUrl = 'https://init.sees.vn/appconfig_v2/api/init?apikey=l0913lkjlkLKDKSAPPlCONFIGS'
  const [APIkey, setAPIkey] = useState<string>('')
  const [Domain, setDomain] = useState<string>('')
  const formData = new FormData()
  formData.append('app_name', 'khttest')

  const option = ({ route }: any) => ({
    headerShown: false,
  })

  useEffect(() => {
    // Kiểm tra xem API key và Main Domain đã được lưu trữ trong AsyncStorage chưa
    AsyncStorage.multiGet(['APIkey', 'MainDomain'])
      .then((storedData) => {
        const storedAPIkey = storedData[0][1]
        const storedMainDomain = storedData[1][1]

        if (storedAPIkey && storedMainDomain) {
          setAPIkey(storedAPIkey)
          setDomain(storedMainDomain)
        } else {
          // Nếu chưa có trong AsyncStorage, thì gọi API và lưu vào AsyncStorage
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/x-www-form-urlencoded',
            },
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok')
              }
              return response.json()
            })
            .then((data) => {
              console.log('API Key:', data.data.apikey)
              console.log('Main Domain:', data.data.main_domain)
              setAPIkey(data.data.apikey)
              setDomain(data.data.main_domain)
              // Lưu API key và Main Domain vào AsyncStorage
              AsyncStorage.multiSet([['APIkey', data.data.apikey], ['MainDomain', data.data.main_domain]])
            })
            .catch((error) => {
              console.error('There was a problem with the fetch operation:', error)
            })
        }
      })
      .catch((error) => {
        console.error('AsyncStorage error:', error)
      })
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={option}>
          <Stack.Screen name='HomeBottomTab' component={HomeBottomTab} />
          <Stack.Screen name='ScreenLogin' component={ScreenLogin} initialParams={{ APIkey, Domain }}/>
          <Stack.Screen name='ScreenMissPass' component={ScreenMissPass} />
          <Stack.Screen name='ScreenRegister' component={ScreenRegister} initialParams={{ APIkey, Domain }}/>
          <Stack.Screen name='ScreenTTdcredit' component={ScreenTTdcredit} />
          <Stack.Screen name='ScreenRdcash' component={ScreenRdcash} />
          <Stack.Screen name='ScreenHistoryRdcash' component={ScreenHistoryRdcash} />
          <Stack.Screen name='ScreenHistoryTH' component={ScreenHistoryTH} />
          <Stack.Screen name='ScreenDetailProduct' component={ScreenDetailProduct} />
          <Stack.Screen name='ScreenBieumau' component={ScreenBieumau} />
          <Stack.Screen name='ScreenStore' component={ScreenStore} />
          <Stack.Screen name='ScreenBaoMat' component={ScreenBaoMat} />
          <Stack.Screen name='ScreenQldiachi' component={ScreenQldiachi} />
          <Stack.Screen name='ScreenDsTv' component={ScreenDsTv} />
          <Stack.Screen name='ScreenPostTv' component={ScreenPostTv} />
          <Stack.Screen name='ScreenDtmember' component={ScreenDtmember} />
          <Stack.Screen name='ScreenBc' component={ScreenBc} />
          <Stack.Screen name='ScreenVdcash' component={ScreenVdcash} />
          <Stack.Screen name='ScreenTintuc' component={ScreenTintuc} />
          <Stack.Screen name='ScreenSproduct' component={ScreenSproduct} />
          <Stack.Screen name='ScreenTTdathang' component={ScreenTTdathang} />
          <Stack.Screen name='ScreenDetailorder' component={ScreenDetailorder} />
          <Stack.Screen name='ScreenDSdiachi' component={ScreenDSdiachi} />
          <Stack.Screen name='ScreenAddLocation' component={ScreenAddLocation} />
          <Stack.Screen name='ScreenChuyenTien' component={ScreenChuyenTien} />
          <Stack.Screen name='ScreenChTienB2' component={ScreenChTienB2} />
          <Stack.Screen name='ScreenXacNhanCt' component={ScreenXacNhanCt} />
          <Stack.Screen name='ScreenDsviec' component={ScreenDsviec} />
          <Stack.Screen name='ScreenDtcongviec' component={ScreenDtcongviec} />
          <Stack.Screen name='ScreenDtUser' component={ScreenDtUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})