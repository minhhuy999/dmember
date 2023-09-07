import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ScreenHome from '../Home/ScreenHome';
import ScreenShop from '../Shop/ScreenShop';
import ScreenPoint from '../Point/ScreenPoint';
import ScreenAcount from '../Account/ScreenAcount';
import ScreenOder from '../Order/ScreenOder';
import SplashScreen from 'react-native-splash-screen'

const Tab = createBottomTabNavigator();

const HomeBottomTab = () => {

    const optionIcon = ({ route }: any) => ({
        tabBarIcon: ({ focused }: any) => {
            if (route.name === 'HomeScreen') {
                return focused
                    ?
                    <View style={styles.customBoxIcon}>
                        <Image source={require('../Icon/Home.png')} style={styles.IconClick} />
                    </View>
                    : <Image source={require('../Icon/Home.png')} style={{ height: 23.75, width: 25 }} />;
            }
            if (route.name === 'ShopScreen') {
                return focused
                    ?
                    <View style={styles.customBoxIcon}>
                        <Image source={require('../Icon/Shop.png')} style={styles.IconClick} />
                    </View>
                    : <Image source={require('../Icon/Shop.png')} style={styles.Icon} />;
            }
            if (route.name === 'PointScreen') {
                return focused
                    ?
                    <View style={styles.customBoxIcon}>
                        <Image source={require('../Icon/Point.png')} style={styles.IconClick} />
                    </View>
                    : <Image source={require('../Icon/Point.png')} style={styles.Icon} />;
            }
            if (route.name === 'OrderScreen') {
                return focused
                    ?
                    <View style={styles.customBoxIcon}>
                        <Image source={require('../Icon/Order.png')} style={styles.IconClick} />
                    </View>
                    : <Image source={require('../Icon/Order.png')} style={styles.Icon} />;
            }
            if (route.name === 'AccountScreen') {
                return focused
                    ?
                    <View style={styles.customBoxIcon}>
                        <Image source={require('../Icon/Profile.png')} style={styles.IconClick} />
                    </View>
                    : <Image source={require('../Icon/Profile.png')} style={styles.Icon} />;
            }

        },
        headerShown: false,
        tabBarStyle: { height: 60, borderTopLeftRadius:30, borderTopRightRadius:30 , position:'absolute',},
    })

    useEffect (()=>{
        SplashScreen.hide();
    },[])

    return (
            <Tab.Navigator screenOptions={optionIcon} initialRouteName='ShopScreen'>
                <Tab.Screen name='HomeScreen' component={ScreenHome} options={{ tabBarLabelStyle: { display: 'none' } }} />
                <Tab.Screen name='ShopScreen' component={ScreenShop} options={{ tabBarLabelStyle: { display: 'none' } }} />
                <Tab.Screen name='PointScreen' component={ScreenPoint} options={{ tabBarLabelStyle: { display: 'none' } }} />
                <Tab.Screen name='OrderScreen' component={ScreenOder} options={{ tabBarLabelStyle: { display: 'none' } }} />
                <Tab.Screen name='AccountScreen' component={ScreenAcount} options={{ tabBarLabelStyle: { display: 'none' }}} />
            </Tab.Navigator>
    )
}

export default HomeBottomTab

const styles = StyleSheet.create({
    customBoxIcon: {
        backgroundColor: 'black', borderRadius: 10,
        transform: [{ rotate: '45deg' }],
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Icon: {
        height: 23.75,
        width: 25,
        tintColor: '#C4C4C4'
    },
    IconClick: {
        tintColor: '#fff',
        height: 23.75,
        width: 25,
        transform: [{ rotate: '-45deg' }]
    }
})