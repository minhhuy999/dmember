import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenHistoryTH = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Lịch sử bán trả hàng</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', height: 120, borderRadius: 10, flexDirection: 'row', paddingVertical: 7 }}>
                    <View style={{ alignItems: 'center', height: '100%', width: 70, }}>
                        <View style={styles.boxarrow}>
                            <Image source={require('../../Icon/backrow.png')} style={{ width: 33, height: 31 }} />
                        </View>
                    </View>
                    <View style={{ height: '100%', width: 120 }}>
                        <Text style={styles.muc}>Mã đơn hàng:</Text>
                        <Text style={styles.muc}>Người tạo:</Text>
                        <Text style={styles.muc}>Tổng tiền:</Text>
                        <Text style={styles.muc}>Chiết khấu:</Text>
                        <Text style={styles.muc}>Thực thu:</Text>
                    </View>
                    <View style={{ height: '100%', width: 140 }}>
                        <Text style={{ textAlign: 'right', color: 'black', fontSize: 14, fontWeight: '500', paddingBottom: 2 }}>002220321D9M</Text>
                        <Text style={styles.Text1}>CS_NGUYENNHUNG</Text>
                        <Text style={{ textAlign: 'right', color: color.organrelow, fontSize: 14, fontWeight: '400', paddingBottom: 2 }}>1,536,000</Text>
                        <Text style={{ textAlign: 'right', color: color.green, fontSize: 14, fontWeight: '400', paddingBottom: 2 }}>998,000</Text>
                        <Text style={styles.Text1}>537,000</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ScreenHistoryTH

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
        fontWeight: '400',
        paddingBottom: 2
    },
    boxarrow:{
        width: 46, height: 46, 
        backgroundColor: color.bluemedium, 
        alignItems: 'center', justifyContent: 'center', 
        borderRadius: 46
    },
    Text1:{
        textAlign: 'right', color: 'black', fontSize: 14, fontWeight: '400', paddingBottom: 2
    }
})