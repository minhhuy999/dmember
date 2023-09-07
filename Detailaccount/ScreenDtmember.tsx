import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../Color/color';
import { useNavigation } from '@react-navigation/native';

const ScreenDtmember = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Chi tiết thành viên</Text>
            </View>
            <Text style={{ textAlign: 'right', color: 'red' }}>Xóa</Text>
            <View style={{ width: '100%', height: 240, backgroundColor: 'white', marginTop: 55, borderRadius: 20, alignItems: 'center' }}>
                <Image source={require('../Image/NVAbig.png')} style={{ width: 115, height: 115, borderRadius: 120, position: 'absolute', top: -55 }} />
                <View style={{ marginTop: 70, alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: '600' }}>NGUYỄN VĂN A</Text>
                    <Text>bo037@gmail.com</Text>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, alignItems: 'center' }}>
                    <View style={{ width: '50%', alignItems: 'center', paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ScreenHistoryTH')}>
                            <View style={styles.BoxImg}>
                                <Image source={require('../Icon/history.png')} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', width: 120,color:'black',fontSize:15,fontWeight:'500' }}>Lịch sử bán trả hàng</Text>
                    </View>
                    <View style={{ height: 50, width: 1, backgroundColor: 'black' }}></View>
                    <View style={{ width: '50%', alignItems: 'center', paddingHorizontal: 20 }}>
                        <TouchableOpacity>
                            <View style={styles.BoxImg}>
                                <Image source={require('../Icon/orderdt.png')} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', width: 120,color:'black',fontSize:15,fontWeight:'500' }}>Đơn đặt hàng</Text>
                    </View>
                </View>
            </View>
            <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '500' }}>Thông tin liên hệ</Text>
            <View style={{width:'100%',height:280,backgroundColor:'white',borderRadius:20,paddingHorizontal:30,paddingVertical:20}}>
                <View style={{marginBottom:15}}> 
                    <Text>Địa chỉ</Text>
                    <Text style={styles.Text1}>256 Bạch Đằng, Phường 24, Bình Thạnh, TPHCM</Text>
                </View>
                <View style={{marginBottom:15}}>
                    <Text>Số điện thoại</Text>
                    <Text style={styles.Text1}>+84 1296745382</Text>
                </View>
                <View style={{marginBottom:15}}>
                    <Text>Ngày sinh</Text>
                    <Text style={styles.Text1}>11/06/1995</Text>
                </View>
                <View style={{marginBottom:15}}>
                    <Text>Giới tính</Text>
                    <Text style={styles.Text1}>Nữ</Text>
                </View>
            </View>
        </View>
    )
}

export default ScreenDtmember

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20,
    },
    BoxTitile: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 20
    },
    title: {
        color: 'black',
        fontSize: 21,
        fontWeight: '500'
    },
    Text1:{
        color:'black',
        fontSize:14,
        fontWeight:'500',
        paddingTop:4
    },
    BoxImg:{
        backgroundColor: 'black', 
        width: 40, height: 40, 
        alignItems: 'center', justifyContent: 'center', 
        borderRadius: 40, 
        marginBottom: 10 
    }
})