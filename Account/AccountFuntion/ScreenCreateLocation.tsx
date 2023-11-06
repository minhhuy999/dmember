import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import color from '../../Color/color'
import CheckBox from '@react-native-community/checkbox'
import { getAPIKeyAndDomainFromStorage } from '../../AsysncStorage/AsysncAPI'
import axios from 'axios'
import { retrieveUserData } from '../../AsysncStorage/AsysncUser'

const { height, width } = Dimensions.get('window')

const ScreenCreateLocation = () => {

    const navigation: any = useNavigation()
    const [showview, setshowview] = useState<any>(false)

    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [TinhThanh, setTinhThanh] = useState('')
    const [idtinhthanh, setidtinhthanh] = useState('')
    const [QuanHuyen, setQuanHuyen] = useState('')
    const [idquanhuyen, setidquanhuyen] = useState('')
    const [PhuongXa, setPhuongXa] = useState('')
    const [idphuongxa, setidphuongxa] = useState('')
    const [diachi, setdiachi] = useState('')
    const [isChecked, setIsChecked] = useState(false);

    const [APIkey, setAPIkey] = useState<string>('')
    const [Domain, setDomain] = useState<string>('')
    const [token, settoken] = useState('')
    const [datatinhthanh, setdatatinhthanh] = useState<any>([])
    const [dataquanhuyen, setdataquanhuyen] = useState<any>([])
    const [dataphuongxa, setdataphuongxa] = useState<any>([])
    const [selectedLocationType, setSelectedLocationType] = useState<any>(null);

    const formData = new FormData()
    formData.append('app_name', 'khttest')
    const apitinhthanh = `${Domain}/location/city?apikey=${APIkey}`
    const apiquanhuyen = `${Domain}/location/district?apikey=${APIkey}`
    const apiphuongxa = `${Domain}/location/ward?apikey=${APIkey}`
    const apicreateLocation = `${Domain}/location/new?apikey=${APIkey}`

    useEffect(() => {
        getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
        getAPItinhthanh()
    }, [Domain, APIkey])

    useEffect(() => {
        getAPIquanhuyen()
    }, [idtinhthanh])

    useEffect(() => {
        getAPIphuongxa()
    }, [idquanhuyen])

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

    const getAPICreateLocation = async () => {
        formData.append('fullname', name)
        formData.append('mobile', phone)
        formData.append('city_id', idtinhthanh)
        formData.append('district_id', idquanhuyen)
        formData.append('ward_id', idphuongxa)
        formData.append('address', diachi)
        formData.append('is_default', isChecked ? 1 : 0);
        if (APIkey && Domain) {
            await gettoken()
            try {
                const response = await axios.post(apicreateLocation, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataLocation = response.data
                    console.log(dataLocation)
                    // console.log(dataLocation)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }


    const getAPItinhthanh = async () => {
        if (APIkey && Domain) {
            await gettoken()
            try {
                const response = await axios.post(apitinhthanh, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataLocation = response.data.data
                    // console.log(dataLocation)
                    setdatatinhthanh(dataLocation)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const getAPIquanhuyen = async () => {
        formData.append('city_id', idtinhthanh)
        if (APIkey && Domain && idtinhthanh != '') {
            await gettoken()
            try {
                const response = await axios.post(apiquanhuyen, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataLocation = response.data.data
                    // console.log('idthanhpho',idtinhthanh)
                    // console.log('QUAN:', dataLocation)
                    setdataquanhuyen(dataLocation)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const getAPIphuongxa = async () => {
        formData.append('district_id', idquanhuyen)
        if (APIkey && Domain && idquanhuyen != '') {
            await gettoken()
            try {
                const response = await axios.post(apiphuongxa, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataLocation = response.data.data
                    // console.log('id huyen',idquanhuyen)
                    // console.log('huyen',dataLocation)
                    setdataphuongxa(dataLocation)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={{ borderTopWidth: 1, borderTopColor: color.graymedium, padding: 10 }}
                onPress={() => handleChoose(item)}>
                <Text>{item.name} - {item.id}</Text>
            </TouchableOpacity>
        )
    }

    const handleChoose = (item: any) => {
        if (selectedLocationType == 'Tỉnh/ thành phố') {
            setTinhThanh(item.name)
            setQuanHuyen('')
            setPhuongXa('')
            setidquanhuyen('')
            setidphuongxa('')
            setidtinhthanh(item.id)
        }
        if (selectedLocationType == 'Quận/ huyện') {
            setQuanHuyen(item.name)
            setPhuongXa('')
            setidphuongxa('')
            setidquanhuyen(item.id)
        }
        if (selectedLocationType == 'Phường/ xã') {
            setPhuongXa(item.name)
            setidphuongxa(item.id)
        }
        setshowview(false)
    }

    const dataLocation = [
        {
            id: '1',
            value: 'Tỉnh/ thành phố',
            name: TinhThanh,
        },
        {
            id: '2',
            value: 'Quận/ huyện',
            name: QuanHuyen,
        },
        {
            id: '3',
            value: 'Phường/ xã',
            name: PhuongXa,
        },
    ]

    const getSelectedLocationData = () => {
        switch (selectedLocationType) {
            case 'Tỉnh/ thành phố':
                return datatinhthanh;
            case 'Quận/ huyện':
                return dataquanhuyen;
            case 'Phường/ xã':
                return dataphuongxa;
            default:
                return [];
        }
    };

    const renderLocation = ({ item, index }: any) => {
        return (
            <View>
                <Text style={{ color: 'black', padding: 5 }}>{item.value}</Text>
                <TouchableOpacity style={styles.ItemInput}
                    onPress={() => {
                        setSelectedLocationType(item.value)
                        setshowview(true)
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Text style={styles.TextLocation}>Chọn Tỉnh/ Thành Phố</Text> */}
                        <Text style={styles.TextLocation}>{item.name}</Text>
                        <Image source={require('../../Icon/arrow.png')} style={{ marginRight: 10 }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Tạo địa chỉ mới</Text>
            </View>
            <Text style={{ color: 'black', padding: 5 }}>Họ và Tên</Text>
            <View style={styles.ItemInput}>
                <TextInput placeholder={'Nhập Họ Tên'} style={{ color: 'black', flex: 1 }}
                    value={name}
                    onChangeText={(text) => setname(text)}>
                </TextInput>
            </View>
            <Text style={{ color: 'black', padding: 5 }}>Số điện thoại</Text>
            <View style={styles.ItemInput}>
                <TextInput placeholder={'Nhập Số Điện Thoại'} style={{ color: 'black', flex: 1 }}
                    value={phone}
                    onChangeText={(text) => setphone(text)}
                    keyboardType='number-pad'>
                </TextInput>
            </View>
            <View>
                <FlatList
                    data={dataLocation}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderLocation}
                    scrollEnabled={false} />
            </View>
            <Text style={{ color: 'black', paddingTop: 5, paddingLeft: 5 }}>Địa chỉ cụ thể</Text>
            <Text style={{ color: 'black', padding: 4 }}>Số nhà, tên tòa nhà, tên đường,tên khu vực</Text>
            <View style={styles.ItemInput}>
                <TextInput placeholder={'Nhập địa chỉ cụ thể'} style={{ color: 'black', flex: 1 }}
                    value={diachi}
                    onChangeText={(text) => setdiachi(text)}
                    keyboardType='number-pad'>
                </TextInput>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                <CheckBox
                    value={isChecked}
                    onValueChange={(newValue) => setIsChecked(newValue)}
                />
                <Text>Đặt làm mặt định</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        width: 150,
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 10,
                    }} onPress={() => getAPICreateLocation()}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                        Thêm
                    </Text>
                </TouchableOpacity>
            </View>
            {showview == true ?
                <ScrollView style={{ position: 'absolute', height: height, width: width, backgroundColor: 'white' }}>
                    <FlatList
                        data={getSelectedLocationData()}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView> : null}
        </View>
    )
}

export default ScreenCreateLocation

const styles = StyleSheet.create({
    backgr: {
        height: height,
        width: width,
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
    Click: {
        width: 1,
        height: 16,
        backgroundColor: color.organge,
        opacity: 0.5,
    },
    ItemInput: {
        backgroundColor: 'white',
        width: '100%',
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3
    },
    TextLocation: {
        padding: 15, marginLeft: -10, flex: 1
    }
})