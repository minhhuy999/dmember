import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import color from '../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenDtUser = ({route}:any) => {

    const { fullname, email, userId, Sex, Mobile } = route.params;
    const genderText = Sex === '1' ? 'Nam' : Sex === '0' ? 'Nữ' : '';

    const navigationGoback = useNavigation();

    const DataDtuser = [
        {
            id: '1',
            muc: 'Mã thành viên',
            body: userId
        },
        {
            id: '2',
            muc: 'Email',
            body: email
        },
        {
            id: '3',
            muc: 'Điện thoại',
            body: Mobile
        },
        {
            id: '4',
            muc: 'Ngày sinh',
            body: '08/08/1997'
        },
        {
            id: '5',
            muc: 'Giới tính',
            body: genderText
        },
        {
            id: '6',
            muc: 'CMND',
            body: '123456789'
        },
        {
            id: '7',
            muc: 'Website',
            body: '123'
        },
    ]

    const renderMuc = ({ item, index }: any) => {
        return (
            <View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.muc}>{item.muc}</Text>
                    <Text style={styles.muc}>{item.body}</Text>
                </View>
                <View style={styles.line}></View>
            </View>
        )
    }
    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../Icon/arrowback.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: color.gray, width: 110, height: 110, borderRadius: 110, borderWidth: 5, borderColor: 'white' }}>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: -10 }}>
                        <View style={styles.boxCamera}>
                            <Image source={require('../Icon/camera.png')} style={{ width: 25, height: 25 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 15, color: 'black', fontSize: 17, fontWeight: '600' }}>{fullname}</Text>
            </View>
            <Image source={require('../Image/backgrcreatTv.png')} style={{ position: 'absolute', bottom: -90 }} />
            <View style={{ flex: 1, marginTop: 90 }}>
                <FlatList
                    data={DataDtuser}
                    keyExtractor={(item: any) => item.id}
                    renderItem={renderMuc}
                    scrollEnabled={false}
                />
                <View style={{ paddingVertical: 30 }}>
                    <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.muc}>Thêm công ty </Text>
                        <Image source={require('../Icon/arrow.png')} style={{ width: 6, height: 12, marginLeft: 5 }} />
                        <Image source={require('../Icon/arrow.png')} style={{ width: 6, height: 12, marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ScreenDtUser

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
        paddingBottom: 40
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
    },
    boxCamera:{
        alignItems: 'center', justifyContent: 'center', 
        width: 30, height: 30, 
        borderRadius: 30, 
        backgroundColor: color.bluelow, 
    }
})