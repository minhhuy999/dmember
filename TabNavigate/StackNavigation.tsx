import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeBottomTab from '../TabNavigate/HomeBottomTab'
import ScreenLogin from '../Account/AccountFuntion/ScreenLogin'
import ScreenMissPass from '../Account/AccountFuntion/ScreenMissPass'
import ScreenRegister from '../Account/AccountFuntion/ScreenRegister'
import ScreenTTdcredit from '../Home/HomeFuntion/ScreenTTdcredit'
import ScreenRdcash from '../Home/HomeFuntion/ScreenRdcash'
import ScreenHistoryRdcash from '../Home/HomeFuntion/ScreenHistoryRdcash'
import ScreenHistoryTH from '../Home/HomeFuntion/ScreenHistoryTH'
import ScreenDetailProduct from '../DetailProduct/ScreenDetailProduct'
import ScreenBieumau from '../DetailProduct/Bieumau/ScreenBieumau'
import ScreenStore from '../Shop/ScreenStore'
import ScreenBaoMat from '../Account/AccountFuntion/ScreenBaoMat'
import ScreenQldiachi from '../Account/AccountFuntion/ScreenQldiachi'
import ScreenDsTv from '../Account/AccountFuntion/ScreenDsTv'
import ScreenPostTv from '../Account/AccountFuntion/ScreenPostTv'
import ScreenDtmember from '../Detailaccount/ScreenDtmember'
import ScreenBc from '../Account/AccountFuntion/ScreenBc'
import ScreenVdcash from '../Home/HomeFuntion/ScreenVdcash'
import ScreenTintuc from '../Account/AccountFuntion/ScreenTintuc'
import ScreenSproduct from '../Search/ScreenSproduct'
import ScreenTTdathang from '../Shop/ScreenTTdathang'
import ScreenDetailorder from '../Order/ScreenDetailorder'
import ScreenDSdiachi from '../Shop/ShopFuntion/ScreenDSdiachi'
import ScreenAddLocation from '../Shop/ShopFuntion/ScreenAddLocation'
import ScreenChuyenTien from '../Home/HomeFuntion/ScreenChuyenTien'
import ScreenChTienB2 from '../Home/HomeFuntion/ScreemChTienB2'
import ScreenXacNhanCt from '../Home/HomeFuntion/ScreenXacNhanCt'
import ScreenDsviec from '../Account/AccountFuntion/ScreenDsviec'
import ScreenDtcongviec from '../Detailcongviec/ScreenDtcongviec'
import ScreenDtUser from '../Detailaccount/ScreenDtUser'
import AnimTab1 from './AnimTab1'
import ScreenStorePoint from '../Point/PointFuntion/ScreenStorePoint'
import ScreenDtNews from '../DetailNews/ScreenDtNews'
import ScreenCreateLocation from '../Account/AccountFuntion/ScreenCreateLocation'
import ScreenDtLocation from '../DetailLocation/ScreenDtLocation'
import ScreenListNotifile from '../Shop/AnimationShop/ScreenListNotifile'
import ScreenQRcode from '../Account/AccountFuntion/ScreenQRcode'
import ScreenScanQR from '../Home/HomeFuntion/ScreenScanQR'

const Stack = createNativeStackNavigator()


const option = () => ({
    headerShown: false,
})

const StackNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={option}>
                <Stack.Screen name='AnimTab1' component={AnimTab1}  />
                <Stack.Screen name='ScreenLogin' component={ScreenLogin} />
                <Stack.Screen name='ScreenMissPass' component={ScreenMissPass} />
                <Stack.Screen name='ScreenRegister' component={ScreenRegister} />
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
                <Stack.Screen name='ScreenStorePoint' component={ScreenStorePoint}/>
                <Stack.Screen name='ScreenDtNews' component={ScreenDtNews}/>
                <Stack.Screen name='ScreenCreateLocation' component={ScreenCreateLocation}/>
                <Stack.Screen name='ScreenDtLocation' component={ScreenDtLocation}/>
                <Stack.Screen name='ScreenListNotifile' component={ScreenListNotifile}/>
                <Stack.Screen name='ScreenQRcode' component={ScreenQRcode}/>
                <Stack.Screen name='ScreenScanQR' component={ScreenScanQR}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})