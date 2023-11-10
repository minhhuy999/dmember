import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Color/color'
import { FlatList } from 'react-native-gesture-handler';
import { retrieveUserData } from '../AsysncStorage/AsysncUser';
import { getAPIKeyAndDomainFromStorage } from '../AsysncStorage/AsysncAPI';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';

const ScreenOder = ({ navigation }: any) => {

    const [selectedCategory1, setSelectedCategory1] = useState('Hoàn thành');
    const [selectedCategory2, setSelectedCategory2] = useState('Tất cả');
    const [dataorder, setdataorder] = useState<any>([])
    const [datalItems1, setdatalItems1] = useState<any>([])
    const [token, settoken] = useState('')
    const [APIkey, setAPIkey] = useState<any>(null)
    const [Domain, setDomain] = useState<any>(null)

    const formData = new FormData()
    formData.append('app_name', 'khttest')
    const apiOrder = `${Domain}/client_order/history?apikey=${APIkey}`;

    const datatinhtrang = [
        { id: '1', name: 'Chờ thanh toán' },
        { id: '2', name: 'Hoàn thành' },
        { id: '3', name: 'Đã hủy' }
    ]

    const datatloai = [
        { id: '1', name: 'Tất cả' },
        { id: '2', name: 'Dcash' },
        { id: '3', name: 'Dpoint' },
        { id: '4', name: 'Dcredit' }
    ]

    const handleCategorySelect1 = (category: any) => {
        setSelectedCategory1(category);
    };

    const handleCategorySelect2 = (category: any) => {
        setSelectedCategory2(category);
    };

    const fotmatedmonney = ((item: any) => {
        const monney = parseFloat(item)
        const formattedMonney = monney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        return formattedMonney;
    })

    const renderimg = ({ item, index }: any) => {
        if (index < 4) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 40, height: 40, backgroundColor: color.bluemedium, borderRadius: 20, marginRight: 5, marginBottom: 10 }}>
                    {item.image ? (
                        <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    ) : (
                        <Text>cb</Text>
                    )}
                </View>
            )
        } else if (index == 4) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 40, height: 40, backgroundColor: color.bluemedium, borderRadius: 20, marginRight: 5, marginBottom: 10 }}>
                    <Text>+1</Text>
                </View>
            )
        } else {
            return (
                <View>
                </View>
            )
        }
    }

    useEffect(() => {
        getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
        getAPIOrder()
    }, [APIkey, Domain])

    useFocusEffect(
        React.useCallback(() => {
            gettoken()
        }, [])
    )

    const gettoken = async () => {
        const userData = await retrieveUserData()
        if (userData) {
            const { session_token } = userData
            settoken(session_token)
            formData.append('token', token)
        } else {
            settoken('')
        }
    }

    const getAPIOrder = async () => {
        formData.append('payment_type', 'dcash')
        formData.append('type', 'done')
        formData.append('page', '1')
        if (APIkey && Domain) {
            await gettoken()
            try {
                const response = await axios.post(apiOrder, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataOrder = response.data.data.data
                    setdataorder(dataOrder)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const renderlist = ({ item, index }: any) => {
        const formattedDate = moment.unix(item.created_at).format('d DD/MM/YYYY HH:mm:ss');
        const data1 = item.lItems.slice(0,1)
        const dataget1 =data1[0]
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailorder',{item})} style={styles.boxrenderlist}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.boximglist}>
                        <Image source={require('../Image/humangh.png')} style={{ width: 28, height: 28 }} />
                    </View>
                    <View>
                        <Text style={styles.Text1}>Mã đơn hàng: {item.id}</Text>
                        <Text style={styles.Text2}>{formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '90%' }}>
                        <FlatList
                            data={item.lItems}
                            keyExtractor={(item) => item.id}
                            renderItem={renderimg}
                            horizontal={true}
                            scrollEnabled={false}
                        />
                        <View>
                            <Text style={styles.Text1}>{dataget1.name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.Text2}>Giá bán: </Text>
                                <Text style={{ color: color.organge, fontSize: 12, fontWeight: '600' }}>{fotmatedmonney(dataget1.retail_price)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end', width: '10%', paddingTop: 15 }}>
                        <Image source={require('../Icon/arrow.png')} style={{ height: 13, width: 7 }} />
                    </View>
                </View>
                <View style={styles.line}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.Text2}>{item.lItems.length} sản phẩm</Text>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: color.green }}>{fotmatedmonney(item.total)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const rendertrangthaiSP = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => handleCategorySelect1(item.name)} style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.textSearch, selectedCategory1 === item.name && styles.selectedText]} >
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderloaiSP = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => handleCategorySelect2(item.name)} style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.textSearch, selectedCategory2 === item.name && styles.selectedTextBuy]}
                >{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Đơn hàng</Text>
            </View>
            <View style={{ width: '100%', height: 110 }}>
                <View style={{ width: '100%', height: 100, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', padding: 5 }}>
                    <View style={{ justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                        <FlatList
                            data={datatinhtrang}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={rendertrangthaiSP}
                            horizontal
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <FlatList
                            data={datatloai}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderloaiSP}
                            horizontal
                        />
                    </View>
                </View>
            </View>
            {/* <View style={{ flex: 1, alignItems: 'center', paddingTop: '40%' }}>
                <Image source={require('../Icon/Box.png')} style={{ width: 103, height: 103 }} />
            </View> */}
            <Text onPress={() => getAPIOrder()} style={{ marginVertical: 10, color: 'black', fontSize: 17, fontWeight: '400' }}>Đã giao</Text>
            <FlatList
                data={dataorder}
                keyExtractor={(item) => item.id}
                renderItem={renderlist}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default ScreenOder

const styles = StyleSheet.create({
    backgr: {
        backgroundColor: color.background,
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom:50
    },
    titleBox: {
        height: 50, width: '100%', alignItems: 'center'
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 21,
        fontWeight: '500',
        fontStyle: 'normal',
        color: 'black',
        paddingTop: 10,
    },
    textSearch: {
        color: color.drak,
        fontSize: 15,
        fontWeight: '400'
    },
    selectedText: {
        fontWeight: '500',
        color: 'black',
        borderBottomWidth: 1,
        borderColor: color.gray,
    },
    selectedTextBuy: {
        fontWeight: '400',
        color: 'white',
        backgroundColor: color.drak,
        borderRadius: 25,
        paddingLeft: 18,
        paddingRight: 18,
        padding: 8
    },
    Text1: {
        color: 'black',
        fontSize: 15,
        fontWeight: '500'
    },
    Text2: {
        fontSize: 12,
        fontWeight: '400'
    },
    boxrenderlist: {
        borderRadius: 10, 
        backgroundColor: 'white', 
        width: '100%', 
        padding: 20, 
        marginBottom: 10, 
        elevation: 3
    },
    boximglist: {
        alignItems: 'center', justifyContent: 'center', 
        width: 40, height: 40, 
        backgroundColor: color.bluemedium, 
        borderRadius: 40, 
        marginRight: 15 , 
        elevation:3
    },
    line: {
        width: '100%', 
        height: 1, 
        backgroundColor: color.gray, 
        marginVertical: 10
    }
})