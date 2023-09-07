import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenHistoryRdcash = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Báo cáo</Text>
            </View>
            <Text style={styles.text}>Tháng 1 - 2022</Text>
            <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                <View style={styles.boxtext}>
                    <Text style={{ marginBottom: 10,color:color.bluelow,fontSize:15,fontWeight:'600' }}>0đ</Text>
                    <Text style={styles.muc}>Doanh thu phòng ban</Text>
                </View>
                <View style={styles.boxtext}>
                    <Text style={{ marginBottom: 10,color:'red',fontSize:15,fontWeight:'600' }}>0đ</Text>
                    <Text style={styles.muc}>Doanh số cá nhân</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row',justifyContent:'space-between',marginTop:20 }}>
                <View style={styles.boxtext}>
                    <Text style={{ marginBottom: 10,color:color.green,fontSize:15,fontWeight:'600' }}>0đ</Text>
                    <Text style={styles.muc}>Hoa hồng phòng ban</Text>
                </View>
                <View style={styles.boxtext}>
                    <Text style={{ marginBottom: 10,color:color.blue,fontSize:15,fontWeight:'600' }}>0đ</Text>
                    <Text style={styles.muc}>Hoa hồng huấn luyện</Text>
                </View>
            </View>
            <Text style={styles.text}>Doanh thu phòng ban</Text>
            <View style={{backgroundColor:'white',width:'100%',height:270,borderRadius:10}}>

            </View>
        </View>
    )
}

export default ScreenHistoryRdcash

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
    muc:{
        color:'black',
        fontSize:14,
        fontWeight:'500'
    },
    boxtext:{
        backgroundColor: 'white', 
        width: 170, height: 100, 
        borderRadius: 10, 
        justifyContent: 'center', 
        padding: 10
    },
    text:{
        marginVertical: 20, 
        color: 'black', 
        fontSize: 17, fontWeight: '500'
    }
})