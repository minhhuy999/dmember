import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { getAPIKeyAndDomainFromStorage } from '../../AsysncStorage/AsysncAPI';
import { retrieveUserData } from '../../AsysncStorage/AsysncUser';
import axios from 'axios';

const ScreenDsTv = () => {

    const navigation: any = useNavigation()
    
    const [token, settoken] = useState('')
    const [datacustomer, setdatacustomer] = useState<any>([])
    const [APIkey, setAPIkey] = useState<any>(null)
    const [Domain, setDomain] = useState<any>(null)
    const formData = new FormData();
    formData.append('app_name', 'khttest');
    const apiCustomer = `${Domain}/client_info/detail_member_by_mobile_or_name?apikey=${APIkey}`;

    useFocusEffect(
        React.useCallback(() => {
            gettoken()
        }, [])
    )

    useEffect(() => {
        getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
        getAPICustomer()
    }, [APIkey, Domain]);

    const gettoken = async () => {
        const userData = await retrieveUserData()
        if (userData) {
            const { session_token, point } = userData
            settoken(session_token)
            formData.append('token', token)
        } else {
            settoken('')
        }
    }

    const getAPICustomer = async () => {
        if (APIkey && Domain) {
            await gettoken()
            try {
                const response = await axios.post(apiCustomer, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const data = response.data.data
                    setdatacustomer(data)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const fotmatedmonney = ((item: any) => {
        const monney = parseFloat(item)
        const navigationtedMonney = monney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        return navigationtedMonney;
    })

    const generateRandomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgba(${red}, ${green}, ${blue}, 1)`;
    };

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
        const fullName = item.fullname;
        const lastWord = fullName.split(' ').pop();
        const abbreviatedName = lastWord ? lastWord.charAt(0) : '';
        
        return (
            <Swipeable renderRightActions={delet}>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenDtmember', { item })}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10, borderRadius: 10, marginBottom: 10, flexDirection: 'row', elevation: 3 }}>
                        {item.avatar == "" ?
                            <View style={{ width: 44, height: 44, borderRadius: 44, backgroundColor: 'rgba(151, 255, 255, 1)', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>{abbreviatedName}</Text>
                            </View> :
                            <Image source={{ uri: item.avatar }} style={{ width: 44, height: 44, borderRadius: 44 }} />}
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>{item.fullname}</Text>
                            <Text>Công nợ: {fotmatedmonney(item.referral_revenue)}đ</Text>
                            <Text>Đã mua: {fotmatedmonney(item.total_spent)}đ</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
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
                    data={datacustomer}
                    keyExtractor={(item) => item.user_id}
                    renderItem={renderMember}
                    showsVerticalScrollIndicator={false}
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