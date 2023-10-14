import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../Color/color'
import LottieView from 'lottie-react-native'

const ScreenHome = ({navigation}:any) => {

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
                            <LottieView  style={styles.Imgb1} source={require('../LottieView/animation_lnid99f2.json')} autoPlay/>
                            {/* <Image source={require('../Image/Computer.png')} style={styles.Imgb1} /> */}
                        </View>
                    </View>
                </View>
                <View style={styles.Box2}>
                    <Text style={{ paddingBottom: 15, color: 'black', fontSize: 17, fontWeight: '600' }}>Danh sách ví</Text>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={()=>navigation.navigate('ScreenVdcash')}>
                            <View style={styles.Indexitem}>
                                <Image source={require('../Icon/ViDcash.png')} style={styles.Imgb2} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.Textb2dash}>Số dư Dcash</Text>
                                    <Text style={styles.Textb2monney}>434,403</Text>
                                </View>
                                <Image source={require('../Icon/arrow.png')} style={styles.arrow} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.Indexitem}>
                            <Image source={require('../Icon/ViDpoint.png')} style={styles.Imgb2} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.Textb2dash}>Số dư Dpoint</Text>
                                <Text style={styles.Textb2monney}>434,403</Text>
                            </View>
                            <Image source={require('../Icon/arrow.png')} style={styles.arrow} />
                        </View>
                        <View style={styles.Indexitem}>
                            <Image source={require('../Icon/ViDcredit.png')} style={styles.Imgb2} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.Textb2dash}>Số dư Dcredit</Text>
                                <Text style={styles.Textb2monney}>434,403</Text>
                            </View>
                            <Image source={require('../Icon/arrow.png')} style={styles.arrow} />
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' , paddingTop:20 }}>
                        <Text style={{ alignItems: 'center', padding: 10, color: 'black', fontSize: 13, fontWeight: '400' }}>Xem tất cả</Text>
                    </View>
                </View>
                <View style={styles.Box3}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, flex: 1, padding: 10, }}>
                        <View style={styles.BoxIcon}>

                            <TouchableOpacity style={styles.itemIconBox} onPress={()=>navigation.navigate('ScreenTTdcredit')}>
                                <View style={styles.itemIcon}>
                                    <Image source={require('../Icon/checklist.png')} style={styles.Icon} />
                                </View>
                                <Text style={styles.Texticon}>Xác nhận thanh toán</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemIconBox}>
                                <View style={styles.itemIcon}>
                                    <Image source={require('../Icon/cardchecklist.png')} style={styles.Icon} />
                                </View>
                                <Text style={styles.Texticon}>Xác nhận đơn hàng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemIconBox}>
                                <View style={styles.itemIcon}>
                                    <Image source={require('../Icon/creditcard.png')} style={styles.Icon} />
                                </View>
                                <Text style={styles.Texticon}>Quản lí Dcredit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.BoxIcon}>
                            <TouchableOpacity style={styles.itemIconBox}>
                                <View style={styles.itemIcon}>
                                    <Image source={require('../Icon/QR.png')} style={styles.Icon} />
                                </View>
                                <Text style={styles.Texticon}>QR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemIconBox}>
                                <View style={styles.itemIcon}>
                                    <Image source={require('../Icon/Rectangle.png')} style={styles.Icon} />
                                </View>
                                <Text style={styles.Texticon}>Nạp Dcash</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemIconBox} onPress={()=>navigation.navigate('ScreenRdcash')}>
                                <View style={styles.itemIcon}>
                                    <Image source={require('../Icon/Rdcash.png')} style={styles.Icon} />
                                </View>
                                <Text style={styles.Texticon}>Rút Dcash</Text>
                            </TouchableOpacity>
                        </View>
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
        height: 260, width: '100%', 
        paddingLeft: 23, paddingRight: 23
    },
    Box3: {
        height: 290, width: '100%', 
        paddingLeft: 23, paddingRight: 23, paddingBottom: 20, paddingTop: 25
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
        flexDirection: 'row', 
        justifyContent: 'center', alignItems: 'center'
    },
    Imgb2: {
        width: 35, height: 35, margin: 10
    },
    Textb2dash: {
        color: 'black', fontSize: 13, fontWeight: '500'
    },
    Textb2monney: {
        color: color.organge, fontSize: 17, fontWeight: '600'
    },
    arrow: {
        width: 15, height: 16, margin: 10
    },
    itemIconBox: {
        width: '25%',
        height: '90%',
        alignItems: 'center',
        paddingTop: 10,
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