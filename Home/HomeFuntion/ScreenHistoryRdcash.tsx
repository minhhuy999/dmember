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
                <Text style={styles.title}>Lịch sử rút tiền</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', height: 100, borderRadius: 10, flexDirection: 'row', paddingVertical: 7 }}>
                    <View style={{ alignItems: 'center', height: '100%', width: 70, }}>
                        <View style={{ width: 46, height: 46, backgroundColor: color.bluemedium, alignItems: 'center', justifyContent: 'center', borderRadius: 46 }}>
                            <Image source={require('../../Icon/ruttien.png')} />
                        </View>
                    </View>
                    <View style={{ height: '100%', width: 120 }}>
                        <Text style={styles.muc}>Ngày thực hiện:</Text>
                        <Text style={styles.muc}>Số tiền:</Text>
                        <Text style={styles.muc}>Rút về:</Text>
                        <Text style={styles.muc}>Trạng thái:</Text>
                    </View>
                    <View style={{ height: '100%', width: 140 }}>
                        <Text style={{textAlign:'right' ,color: 'black',fontSize: 12,fontWeight: '500',paddingBottom: 2}}>23/09/2021 21:03</Text>
                        <Text style={{textAlign:'right',color:color.organrelow,fontSize: 14,fontWeight: '500',paddingBottom: 2}}>5,000,000</Text>
                        <Text style={{textAlign:'right', color: 'black',fontSize: 14,fontWeight: '500',paddingBottom: 2}}>Techcombank</Text>
                        <Text style={{textAlign:'right', color:color.green,fontSize: 14,fontWeight: '500',paddingBottom: 2}}>Hoàn thành</Text>
                    </View>
                </View>
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
    muc: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
        paddingBottom: 2
    }
})