import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenPostTv = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Tạo thành viên</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: color.gray, width: 110, height: 110, borderRadius: 110, borderWidth: 5, borderColor: 'white' }}>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: -10 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 30, backgroundColor: color.bluelow, }}>
                            <Image source={require('../../Icon/camera.png')} style={{ width: 25, height: 25 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 15, color: 'black', fontSize: 17, fontWeight: '600' }}>NGUYỄN VĂN C</Text>
            </View>
            <Image source={require('../../Image/backgrcreatTv.png')} style={{ position: 'absolute', bottom: -90 }} />
            <View style={{ flex: 1, marginTop: 90 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.muc}>Mã thành viên</Text>
                    <Text style={styles.muc}>1187</Text>
                </View>
                <View style={styles.line}></View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.muc}>Email</Text>
                    <Text style={styles.muc}>bo036@gmail.com</Text>
                </View>
                <View style={styles.line}></View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.muc}>Điện thoại</Text>
                    <Text style={styles.muc}></Text>
                </View>
                <View style={styles.line}></View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.muc}>Ngày sinh</Text>
                    <Text style={styles.muc}></Text>
                </View>
                <View style={styles.line}></View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.muc}>Giới tính</Text>
                    <Text style={styles.muc}></Text>
                </View>
                <View style={styles.line}></View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.muc}>CMND</Text>
                    <Text style={styles.muc}></Text>
                </View>
                <View style={styles.line}></View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.muc}>Website</Text>
                    <Text style={styles.muc}></Text>
                </View>
                <View style={{ paddingVertical: 30}}>
                    <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.muc}>Thêm công ty </Text>
                        <Image source={require('../../Icon/arrow.png')} style={{ width: 6, height: 12, marginLeft: 5 }} />
                        <Image source={require('../../Icon/arrow.png')} style={{ width: 6, height: 12, marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ScreenPostTv

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
    line: {
        height: 1,
        width: '100%',
        backgroundColor: color.graymedium,
        marginVertical: 15
    },
    muc: {
        color: 'black',
        fontSize: 15,
        fontWeight: '500'
    }
})