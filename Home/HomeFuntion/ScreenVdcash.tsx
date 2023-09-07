import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const ScreenVdcash = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    const dataitem = [
        {
            id: '1',
            icon: require('../../Icon/naptien.png'),
            title: 'Nạp tiền vào ví',
        },
        {
            id: '2',
            icon: require('../../Icon/ruttien.png'),
            title: 'Rút tiền',
        },
        {
            id: '3',
            icon: require('../../Icon/chtien.png'),
            title: 'Chuyển tiền',
        },
        {
            id: '4',
            icon: require('../../Icon/historytien.png'),
            title: 'Lịch sử giao dịch',
        },
    ]

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => {
                if (item.id === '3') {
                    navigation.navigate('ScreenChuyenTien');
                }
            }}>
                <View style={styles.boxrenderItem}>
                    <View style={styles.boximgItem}>
                        <Image source={item.icon} style={{ height: 35, width: 35 }} />
                    </View>
                    <Text style={styles.textrender}>{item.title}</Text>
                    <Image source={require('../../Icon/arrow.png')} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Ví Dcash</Text>
            </View>
            <View style={{ alignItems: 'center', width: '100%', height: 160, justifyContent: 'center' }}>
                <Image source={require('../../Image/ImgDcash.png')} style={{ width: 350, height: 133 }} />
                <View style={{ position: 'absolute' }}>
                    <Image source={require('../../Image/monney.png')} style={{ width: 90, height: 60 }} />
                    <Text style={{
                        textAlign: 'center', fontSize: 26, fontWeight: '700', color: 'white'
                    }}>434,403</Text>
                </View>
            </View>
            <Text style={{ fontSize: 17, fontWeight: '500', color: 'black', padding: 10 }}>Chức năng ví</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={dataitem}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}

export default ScreenVdcash

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
    boxrenderItem:{
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'white',
        width: '100%', height: 70, 
        borderRadius: 10, 
        padding: 10, 
        marginBottom: 10, 
        elevation: 3
    },
    boximgItem:{
        width: 40, height: 40, 
        backgroundColor: color.bluemedium, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 40
    },
    textrender:{
        flex: 1, 
        color: 'black', 
        fontSize: 17, fontWeight: '500', 
        marginHorizontal: 20 
    }
})