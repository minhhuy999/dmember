import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenRegister = () => {

    const navigation = useNavigation();
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

    const Item = [
        {
            id: '1',
            icon: require('../../IconUser/user.png'),
            textitem: 'Ho ten',
        },
        {
            id: '2',
            icon: require('../../IconUser/mail.png'),
            textitem: 'Email',
        },
        {
            id: '3',
            icon: require('../../IconUser/call.png'),
            textitem: 'Số điện thoại',
        },
        {
            id: '4',
            icon: require('../../IconUser/lock.png'),
            textitem: 'Mật khẩu',
        },
        {
            id: '5',
            icon: require('../../IconUser/lock.png'),
            textitem: 'Xác nhận mật khẩu',
        },
        {
            id: '6',
            icon: require('../../IconUser/userfriends.png'),
            textitem: 'Mã giới thiệu',
        },
    ]


    const renderItem = ({ item, index }: any) => {
        const isItemSelected = selectedItemIndex === index;
        return (
            <View style={{ backgroundColor: 'white', height: 65, width: '100%', flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 10, marginBottom: 10 }}>
                <Image source={item.icon} style={{ width: 24, height: 24  , marginRight: 20}} />
                {isItemSelected && <View style={styles.Click}></View>}
                <TextInput placeholder={item.textitem} style={{ color: 'black', height: 50, flex: 1 }}
                    onFocus={() => setSelectedItemIndex(index)}
                    onBlur={() => setSelectedItemIndex(-1)}></TextInput>
            </View>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 }}>
                <Text style={{ color: 'black', fontSize: 21, fontWeight: '600' }}>Thông tin đăng kí</Text>
            </View>
            <View style={{ width: '100%', height: 480, paddingTop: 5 }} >
                <FlatList
                    data={Item}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        width: 150,
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 35,
                    }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                        Đăng kí
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    height: 70,
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                <Text style={{ color: 'black', fontSize: 17, fontWeight: '400' }}>
                    Tôi đã có tài khoản?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: '700' }}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScreenRegister

const styles = StyleSheet.create({
    backgr: {
        backgroundColor: color.background,
        flex: 1,
        paddingHorizontal: 20,
    },
    Click: {
        width: 1,
        height: 16,
        backgroundColor: color.organge,
        opacity: 0.5,
    },
})