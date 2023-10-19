import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react'
import ScreenHome from '../Home/ScreenHome';
import ScreenShop from '../Shop/ScreenShop';
import ScreenPoint from '../Point/ScreenPoint';
import ScreenOder from '../Order/ScreenOder';
import ScreenAcount from '../Account/ScreenAcount';
import HomeBottomTab from './HomeBottomTab';
import { useFocusEffect } from '@react-navigation/native';
import { retrieveUserData } from '../AsysncStorage/AsysncUser';

const TabArr = [
    { route: 'ScreenHome', label: 'Home', type: require('../Icon/Home.png'), component: ScreenHome },
    { route: 'ScreenShop', label: 'Shop', type: require('../Icon/Shop.png'), component: ScreenShop },
    { route: 'ScreenPoint', label: 'Point', type: require('../Icon/Point.png'), component: ScreenPoint },
    { route: 'ScreenOder', label: 'Order', type: require('../Icon/Order.png'), component: ScreenOder },
    { route: 'ScreenAccount', label: 'Account', type: require('../Icon/Profilebt.png'), component: ScreenAcount },
];

const Tab = createBottomTabNavigator();

const AnimTab1 = () => {


    const [active, setactive] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const userData = await retrieveUserData();
                if (userData)
                    setactive(true);
                else
                    setactive(false)
            }
            fetchData();
        }, [])
    );

    const filteredTabs = active ? TabArr : TabArr.slice(1);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
            }} initialRouteName='ScreenShop'
        >
            {filteredTabs.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarButton: (props: any) => <HomeBottomTab {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}

export default AnimTab1

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        position: 'absolute',
        bottom: 10,
        right: 16,
        left: 16,
        borderRadius: 16,
        elevation: 2,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 5,
    },
})