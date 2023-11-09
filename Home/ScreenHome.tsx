import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Color/color'
import LottieView from 'lottie-react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const ScreenHome = ({ navigation }: any) => {

    const showAllHeight = useSharedValue(400)
    const rotateArrow = useSharedValue(0);
    const [seeall, setseeall] = useState(false)
    const seeAllText = seeall ? "Thu gọn" : "Xem tất cả";

    const dataMenu = [
        {
            id: '1',
            img: require('../Icon/ViDcash.png'),
            name: 'Số dư Dcash',
            monney: '434,403',
            navigate: 'ScreenVdcash'
        },
        {
            id: '2',
            img: require('../Icon/ViDpoint.png'),
            name: 'Số dư Dpoint',
            monney: '434,403',
            navigate: 'ScreenVdcash'
        },
        {
            id: '3',
            img: require('../Icon/ViDcredit.png'),
            name: 'Số dư Dcredit',
            monney: '434,403',
            navigate: 'ScreenVdcash'
        },
        {
            id: '4',
            img: require('../Icon/ViDcash.png'),
            name: 'Số dư Dcash',
            monney: '434,403',
            navigate: 'ScreenVdcash'
        },
        {
            id: '5',
            img: require('../Icon/ViDpoint.png'),
            name: 'Số dư Dpoint',
            monney: '434,403',
            navigate: 'ScreenVdcash'
        },
        {
            id: '6',
            img: require('../Icon/ViDcredit.png'),
            name: 'Số dư Dcredit',
            monney: '434,403',
            navigate: 'ScreenVdcash'
        },
    ]
    const dataItem = [
        {
            id: '1',
            icon: require('../Icon/checklist.png'),
            name: 'Xác nhận thanh toán',
            navigate: 'ScreenTTdcredit'
        },
        {
            id: '2',
            icon: require('../Icon/cardchecklist.png'),
            name: 'Xác nhận đơn hàng',
            navigate: 'ScreenTTdcredit'
        },
        {
            id: '3',
            icon: require('../Icon/creditcard.png'),
            name: 'Quản lí Dcredit',
            navigate: 'ScreenTTdcredit'
        },
        {
            id: '4',
            icon: require('../Icon/QR.png'),
            name: 'QR',
            navigate: 'ScreenScanQR'
        },
        {
            id: '5',
            icon: require('../Icon/Rectangle.png'),
            name: 'Nạp Dcash',
            navigate: 'ScreenRdcash'
        },
        {
            id: '6',
            icon: require('../Icon/Rdcash.png'),
            name: 'Rút Dcash',
            navigate: 'ScreenRdcash'
        },
    ]

    const renderMenu = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(item.navigate)}>
                <View style={styles.Indexitem}>
                    <Image source={item.img} style={styles.Imgb2} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.Textb2dash}>{item.name}</Text>
                        <Text style={styles.Textb2monney}>{item.monney}</Text>
                    </View>
                    <Image source={require('../Icon/arrow.png')} style={styles.arrow} />
                </View>
            </TouchableOpacity>
        )
    }
    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity style={styles.itemIconBox} onPress={() => navigation.navigate(item.navigate)}>
                <View style={styles.itemIcon}>
                    <Image source={item.icon} style={styles.Icon} />
                </View>
                <Text style={styles.Texticon}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        showAllHeight.value = withTiming(200, { duration: 0 });
    }, []);

    const toggleShowAll = () => {
        if (showAllHeight.value === 200) {
            showAllHeight.value = withSpring(400, { damping: 5, stiffness: 60 });
            rotateArrow.value = withTiming(90, { duration: 300 });
            setseeall(true)
        } else {
            showAllHeight.value = withTiming(200);
            rotateArrow.value = withTiming(0, { duration: 300 });
            setseeall(false)
        }
    };

    const showAllStyle = useAnimatedStyle(() => {
        return {
            height: showAllHeight.value,
        };
    });

    const arrowStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotateArrow.value}deg` }, { perspective: 1000 }],
        };
    });

    return (
        <ScrollView style={{ backgroundColor: color.background }}>
            <View style={styles.backgr}>
                <View style={styles.Box1}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                                <Text style={styles.Textb1Dss}>Số dư DSS</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.Textb1cp}>48,000 CP</Text>
                                    <Text style={styles.Textb1100}>/0.24%</Text>
                                </View>
                                <Text style={styles.Textb1vnd}>48,000,000 VND</Text>
                            </View>
                            <LottieView style={styles.Imgb1} source={require('../LottieView/animation_lnid99f2.json')} autoPlay />
                        </View>
                    </View>
                </View>
                <View style={styles.Box2}>
                    <Text style={{ paddingBottom: 15, color: 'black', fontSize: 17, fontWeight: '600' }}>Danh sách ví</Text>
                    <View style={{width:'100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',borderRadius:10}}>
                        <Animated.View style={[{ height: 400, width: '100%' ,borderRadius:10, backgroundColor:color.background}, showAllStyle]}>
                            <FlatList
                                data={dataMenu}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderMenu}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                            />
                        </Animated.View >
                        <TouchableOpacity style={styles.seeAll} onPress={toggleShowAll}>
                            <Text style={{ alignItems: 'center', color: 'black', fontSize: 13, fontWeight: '400' }}>{seeAllText}</Text>
                            <Animated.View style={[{ position: 'absolute', right: 10, top: 4 }, arrowStyle]}>
                                <Image source={require('../Icon/arrow.png')} style={{ width: 10, height: 11, }} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.Box3}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, flex: 1, padding: 10, }}>
                        <FlatList
                            data={dataItem}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            scrollEnabled={false}
                            numColumns={3} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ScreenHome

const styles = StyleSheet.create({
    Box1: {
        height: 140, width: '100%',
        paddingLeft: 23, paddingRight: 23, paddingTop: 20, paddingBottom: 20
    },
    Box2: {
        width: '100%',
        paddingLeft: 23, paddingRight: 23
    },
    Box3: {
        height: 280, width: '100%',
        paddingLeft: 23, paddingRight: 23, paddingBottom: 20, paddingTop: 25,
        marginBottom: 60
    },
    seeAll: {
        width: '100%',
        alignItems: 'center',
    },
    backgr: {
        backgroundColor: color.background,
        flex: 1
    },
    Textb1Dss: {
        color: 'black',
        fontSize: 14,
        fontWeight: '400'
    },
    Textb1cp: {
        color: 'black',
        fontSize: 17,
        fontWeight: '500'
    },
    Textb1100: {
        color: color.green,
        fontSize: 11,
        fontWeight: '400'
    },
    Textb1vnd: {
        color: color.green,
        fontSize: 17,
        fontWeight: '600'
    },
    Imgb1: {
        width: 100, height: 100,
        marginRight: 10
    },
    Indexitem: {
        width: '100%', height: 55,
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 10,
        elevation:3,
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center'
    },
    Imgb2: {
        width: 35, height: 35, 
        margin: 10
    },
    Textb2dash: {
        color: 'black', 
        fontSize: 13, 
        fontWeight: '500'
    },
    Textb2monney: {
        color: color.organge, 
        fontSize: 17, fontWeight: '600'
    },
    arrow: {
        width: 15, height: 16, 
        margin: 10
    },
    itemIconBox: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 10,
        marginHorizontal: 14.5,
    },
    itemIcon: {
        height: 55,
        width: 55,
        backgroundColor: color.graymedium,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    BoxIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%'
    },
    Icon: {
        height: 30,
        width: 30
    },
    Texticon: {
        color: 'black',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500'
    }
})