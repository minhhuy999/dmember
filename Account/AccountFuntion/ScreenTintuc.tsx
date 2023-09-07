import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const ScreenTintuc = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    const dataNews = [
        {
            id: '1',
            name: 'DSTORE Hồ Chí Minh tổng kết và vinh danh tháng 2/2022',
            img: require('../../Image/News2.png'),
            time: '22:46 12/03/2022',
        },
        {
            id: '2',
            name: 'Nâng cấp chất lượng nhân sự phục vụ vận hành “bộ máy” kinh doanh của doanh nghiệp',
            img: require('../../Image/News3.png'),
            time: '22:46 12/03/2022',
        },
        {
            id: '3',
            name: 'Hồ Huỳnh Duy - Chủ tịch HĐQT Công ty Dstore - Đột phá kinh doanh trực tuyến',
            img: require('../../Image/News4.png'),
            time: '22:46 12/03/2022',
        }
    ]

    const renderNews = ({ item, index }: any) => {
        return (
            <View style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', borderRadius: 10,marginBottom:8,elevation:3 }}>
                <View style={{ width: '71%', paddingHorizontal: 22, paddingVertical: 8, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: 'black' }}>{item.name}</Text>
                    <Text>{item.time}</Text>
                </View>
                <Image source={item.img} style={{ borderRadius: 10 }} />
            </View>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Tin tức</Text>
            </View>
            <Text style={{ marginVertical: 10, color: 'black', fontSize: 24, fontWeight: '400' }}>Tin mới nhất</Text>
            <View style={{ backgroundColor: 'white', width: '100%', height: 260, borderRadius: 15, alignItems: 'center',elevation:3 }}>
                <Image source={require('../../Image/News1.png')} style={{ width: 353, height: 166, borderRadius: 15 }} />
                <View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', color: 'black' }}>DSTORE - Startup 32 chi nhánh Hồ Chí Minh</Text>
                    <Text>22:46 12/03/2022</Text>
                </View>
            </View>
            <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '400' }}>Tin khác</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={dataNews}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNews}
                />
            </View>
        </View>
    )
}

export default ScreenTintuc

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