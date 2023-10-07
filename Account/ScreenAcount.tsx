import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import color from '../Color/color'

const ScreenAcount = ({ navigation }: any) => {

    const [isModal, setisModal] = useState(false)

    const Item = [
        {
            id: '1',
            icon: require('../IconUser/share.png'),
            textitem: 'Chia sẻ app',
        },
        {
            id: '2',
            icon: require('../IconUser/security.png'),
            textitem: 'Thiết lập bảo mật',
        },
        {
            id: '3',
            icon: require('../IconUser/location.png'),
            textitem: 'Quản lí địa chỉ',
        },
        {
            id: '4',
            icon: require('../IconUser/education.png'),
            textitem: 'Đào tạo',
        },
        {
            id: '5',
            icon: require('../IconUser/human.png'),
            textitem: 'Danh sách thành viên',
        },
        {
            id: '6',
            icon: require('../IconUser/chart.png'),
            textitem: 'Báo cáo',
        },
        {
            id: '7',
            icon: require('../Icon/Order.png'),
            textitem: 'Tin tức',
        },
    ]

    const renderItem = ({ item, index }: any) => {

        return (
            <TouchableOpacity onPress={() => {
                if (item.id === '1') {
                    setisModal(true)
                }
                if (item.id === '2') {
                    navigation.navigate('ScreenBaoMat');
                }
                if (item.id === '3') {
                    navigation.navigate('ScreenQldiachi');
                }
                if (item.id === '4') {
                    navigation.navigate('ScreenDsviec');
                }
                if (item.id === '5') {
                    navigation.navigate('ScreenDsTv');
                }
                if (item.id === '6') {
                    navigation.navigate('ScreenBc');
                }
                if (item.id === '7') {
                    navigation.navigate('ScreenTintuc');
                }
            }}>
                <View style={styles.item}>
                    <Image source={item.icon} />
                    <Text style={styles.textitem}>{item.textitem}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Tài Khoản</Text>
                <Image source={require('../Icon/User.png')} style={styles.avata} />
            </View>
            <View style={{ padding: 24, height: '100%', width: '100%', backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <View style={{ marginTop: 40, width: '100%' }}>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: 'black', textAlign: 'center' }}>Account 1</Text>
                    <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ScreenLogin')} style={{ width: 190, height: 56, backgroundColor: color.green, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>Đăng nhập ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginTop: 10, marginBottom: 10 }}>Chức năng khác</Text>
                </View>
                <View style={{ width: '100%', height: 340, paddingTop: 1 }} >
                    <FlatList
                        data={Item}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    )
}

export default ScreenAcount

const styles = StyleSheet.create({
    backgr: {
        backgroundColor: color.background,
        flex: 1,
    },
    titleBox: {
        height: 110, width: '100%', alignItems: 'center'
    },

    title: {
        fontFamily: 'Montserrat',
        fontSize: 21,
        fontWeight: '500',
        fontStyle: 'normal',
        color: 'black',
        paddingTop: 10,
    },
    avata: {
        height: 100,
        width: 100,
        position: 'absolute',
        top: 65, zIndex: 900,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: 'white',
    },
    item: {
        backgroundColor: 'white',
        height: 45,
        width: '100%',
        marginBottom: 10,
        borderRadius: 7,
        elevation: 0.5,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textitem: {
        marginLeft: 10,
        color: 'black',
        fontSize: 14,
        fontWeight: '400'
    }
})