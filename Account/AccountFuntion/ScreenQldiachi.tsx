import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList, Swipeable } from 'react-native-gesture-handler';

const ScreenQldiachi = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    const data = [
        {
            id: '1',
            name: 'Chị Mai - 124398690',
            location: 'Địa chỉ: 256 Bạch Đằng, Phường 24, Bình Thạnh, TPHCM'
        },
        {
            id: '2',
            name: 'Chị Huệ - 01234567889',
            location: 'Địa chỉ: 256 Bạch Đằng, Phường 24, Bình Thạnh, TPHCM'
        }
    ]

    const delet = () => {
        return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../Icon/edit.png')} style={{ width: 25, height: 25 , marginBottom:17 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../Icon/thungracBlack.png')} style={{ width: 25, height: 25 }} />
                    <Text>Xóa</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderLocation = ({ item, index }: any) => {
        return (
            <Swipeable renderRightActions={delet}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 10 , elevation:5 }}>
                    <Text style={{ color: 'black', paddingVertical: 5 }}>{item.name}</Text>
                    <Text>{item.location}</Text>
                </View>
            </Swipeable>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Quản lý địa chỉ</Text>
            </View>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, width: '100%', marginTop: 10 }}>
                    <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 15 }}>Thêm khách hàng mới</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '500' }}>Danh sách khách hàng</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderLocation}
                />
            </View>
        </View>
    )
}

export default ScreenQldiachi

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
})