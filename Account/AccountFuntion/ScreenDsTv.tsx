import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList, Swipeable } from 'react-native-gesture-handler';

const ScreenDsTv = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    const member = [
        {
            id: '1',
            avata: require('../../Image/NVA.png'),
            name: 'Nguyễn Văn A',
            no: '0',
            mua: '0'
        },
        {
            id: '2',
            avata: require('../../Image/NVB.png'),
            name: 'Nguyễn Văn B',
            no: '0',
            mua: '0'
        }
    ]

    const delet = () => {
        return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../Icon/edit.png')} style={{ width: 25, height: 25, marginBottom: 17 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../Icon/thungracBlack.png')} style={{ width: 25, height: 25 }} />
                    <Text>Xóa</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderMember = ({ item, index }: any) => {
        return (
            <Swipeable renderRightActions={delet}>
                <TouchableOpacity  onPress={()=>navigation.navigate('ScreenDtmember')}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, borderRadius: 10, marginBottom: 10, flexDirection: 'row', elevation: 5 }}>
                        <Image source={item.avata} style={{ width: 44, height: 44, borderRadius: 44 }} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>{item.name}</Text>
                            <Text>Công nợ: {item.no}đ</Text>
                            <Text>Đã mua: {item.mua}đ</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Danh sách Thành Viên</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 10 }}>
                <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, borderRadius: 10 }}>
                    <Image source={require('../../Icon/search.png')} />
                    <TextInput placeholder='Tìm kiếm thành viên' style={{ marginLeft: 10 }}></TextInput>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ScreenPostTv')} style={{ backgroundColor: 'black', height: 35, width: 35, borderRadius: 35, justifyContent: "center", alignItems: 'center', marginLeft: 20 }}>
                        <Text style={{ color: 'white' }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '500' }}>Danh sách thành viên</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={member}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMember}
                />
            </View>
        </View>
    )
}

export default ScreenDsTv

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