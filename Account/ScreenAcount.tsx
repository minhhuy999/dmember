import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import color from '../Color/color'
import { MotiView } from 'moti/build'
import { logout, retrieveUserData } from '../AsysncStorage/AsysncUser'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const ScreenAcount = () => {

    const navigation:any = useNavigation()

    const [isModal, setisModal] = useState(false)
    const [fullname, setfullname] = useState('')
    const [email, setemail] = useState('')
    const [userId, setuserId] = useState('')
    const [Sex, setSex] = useState('')
    const [Mobile, setMobile] = useState('')

    const logout1 = async () => {
        logout()
        navigation.navigate('ScreenLogin')
    }

    const fetchData = async () => {
        const userData = await retrieveUserData()
        if (userData) {
            const { fullname, email, user_id, sex, mobile } = userData
            setfullname(fullname)
            setemail(email)
            setuserId(user_id)
            setSex(sex)
            setMobile(mobile)
        }else{
            setfullname('')
            setemail('')
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    )
    

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
                    navigation.navigate('ScreenBaoMat')
                }
                if (item.id === '3') {
                    navigation.navigate('ScreenQldiachi')
                }
                if (item.id === '4') {
                    navigation.navigate('ScreenDsviec')
                }
                if (item.id === '5') {
                    navigation.navigate('ScreenDsTv')
                }
                if (item.id === '6') {
                    navigation.navigate('ScreenBc')
                }
                if (item.id === '7') {
                    navigation.navigate('ScreenTintuc')
                }
            }}>
                <MotiView
                    style={styles.item}
                    from={{ opacity: 0, translateX: 50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: index * 200 }}
                >
                    <Image source={item.icon} />
                    <Text style={styles.textitem}>{item.textitem}</Text>
                </MotiView>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Tài Khoản</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }} onPress={logout1}>
                    <Image source={require('../Icon/logout.png')} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
            </View>
            <Image source={require('../Image/imgAccount.png')} style={styles.avata} />
            <View style={{ padding: 24, height: '100%', width: '100%', backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <View style={{ marginTop: 40, width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: '9%' }}>
                        <Text style={{ fontSize: 17, fontWeight: '600', color: 'black', textAlign: 'center' }}>{fullname}</Text>
                        {fullname.trim() !== '' && (
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('ScreenDtUser', { fullname, email, userId, Sex, Mobile })}>
                                <Image source={require('../Icon/detailuser.png')} style={{ width: 25, height: 25 }} />
                            </TouchableOpacity>)}
                    </View>
                    <View style={{ paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', }}>
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
        alignItems: 'center'
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
        top: 64, zIndex: 900,
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