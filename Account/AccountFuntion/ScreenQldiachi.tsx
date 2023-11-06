import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { getAPIKeyAndDomainFromStorage } from '../../AsysncStorage/AsysncAPI';
import { retrieveUserData } from '../../AsysncStorage/AsysncUser';
import axios from 'axios';

const ScreenQldiachi = () => {

    const navigation:any = useNavigation()

    const [APIkey, setAPIkey] = useState<string>('')
    const [Domain, setDomain] = useState<string>('')
    const [token, settoken] = useState('')
    const [datalocation, setdatalocation] = useState<any>([])

    const formData = new FormData()
    formData.append('app_name', 'khttest')
    const apilocation = `${Domain}/location/list?apikey=${APIkey}`


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

    useEffect(() => {
        getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
        getAPIlocation()
    }, [Domain, APIkey])

    useFocusEffect(
        React.useCallback(() => {
            gettoken()
        }, [])
    )

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

    const getAPIlocation = async () => {
        if (APIkey && Domain) {
            await gettoken()
            try {
                const response = await axios.post(apilocation, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataLocation = response.data.data
                    setdatalocation(dataLocation)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }
    
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
                    <Text style={{ color: 'black', paddingVertical: 5 }}>{item.fullname} - {item.mobile}</Text>
                    <Text>{item.address}, {item.ward}, {item.district}, {item.country}, {item.city}</Text>
                    {/* <Text>{item.is_default}</Text> */}
                </View>
            </Swipeable>
        )
    }

    return (
        <ScrollView style={styles.backgr} showsVerticalScrollIndicator={false}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Quản lý địa chỉ</Text>
            </View>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={()=>navigation.navigate('ScreenCreateLocation')} style={{ backgroundColor: 'black', borderRadius: 10, width: '100%', marginTop: 10 }}>
                    <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 15 }}>Thêm khách hàng mới</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '500' }}>Danh sách khách hàng</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={datalocation}
                    keyExtractor={(item) => item.id}
                    renderItem={renderLocation}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
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