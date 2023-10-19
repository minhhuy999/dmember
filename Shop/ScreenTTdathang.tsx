import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Color/color';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import realmHS from '../Realm/realmHistoryS';
import axios from 'axios';

const ScreenTTdathang = ({ route }: any) => {

    const { Domain, APIkey } = route.params

    const navigation: any = useNavigation();

    const [checked, setChecked] = React.useState('first');
    const addSP = realmHS.objects('AddProduct')

    const apiProductlist = `${Domain}/client_product/detail?apikey=${APIkey}`

    const [data, setdata] = useState<any>([])
    const [image, setimage] = useState('')
    const formData = new FormData()
    formData.append('app_name', 'khttest')
    for (const item of addSP) {
        formData.append('id', item.id);
    }

    useEffect(() => {
        getAPIDetail()
    }, [])

    const getAPIDetail = async () => {
        if (APIkey && Domain) {
            try {
                const response = await axios.post(apiProductlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataProduct = response.data.data
                    setdata(dataProduct)
                    setimage(dataProduct.img_1)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const renderlist = ({ item, index }: any) => {
        const product: any = data.find((sp: any) => sp.id === item.id);
        return (
            <View style={{ backgroundColor: 'white', width: '100%', height: 90, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                {image ? (
                    <Image source={{ uri: image }} style={{ width: 53, height: 53, paddingVertical: 10, marginLeft: 10, marginRight: 10, borderRadius: 5 }} />
                ) : (
                    <View style={{ width: 53, height: 53, paddingVertical: 10, marginLeft: 10, marginRight: 10, borderRadius: 5, backgroundColor: 'gray' }} />
                )}

                <View style={{ width: 280, padding: 5, height: 80 }}>
                    <View style={{ height: 40 }}>
                        <Text style={styles.Text1}>{product.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 30 }}>
                        <View style={{ height: 30, width: '75%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.Text2}>Giá bán: </Text>
                                <Text style={{ color: color.organge, fontSize: 12, fontWeight: '400' }}>{data.price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.Text2}>Chiết khấu: </Text>
                                <Text style={{ color: color.blue, fontSize: 12, fontWeight: '400' }}>{data.price_cal_commission}</Text>
                            </View>
                        </View>
                        <View style={{ height: 30, justifyContent: 'flex-end' }}>
                            <Text style={styles.Text2}>Số lượng: {item.soluong}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Thông tin đặt hàng</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenDSdiachi')} style={styles.buttonDc}>
                    <Text style={styles.muc}>Địa chỉ nhận hàng</Text>
                    <Image source={require('../Icon/arrow.png')} style={{ height: 13, width: 7, marginRight: 5 }} />
                </TouchableOpacity>
                <View style={styles.boxlocation}>
                    <Image source={require('../Icon/location.png')} style={{ height: 35, width: 35, borderRadius: 35 }} />
                    <View style={{ paddingHorizontal: 25 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text1}>Thùy Linh</Text>
                            <View style={{ backgroundColor: 'black', height: 20, width: 1, marginHorizontal: 10 }}></View>
                            <Text style={styles.Text1}>0909078111</Text>
                        </View>
                        <Text style={styles.Text2}>256 Bạch Đằng, Phường 24, Q.Bình Thạnh, Thành phố Hồ Chí Minh</Text>
                    </View>
                </View>
                <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '400' }}>Hình thức thanh toán</Text>
                <View style={styles.Boxcheck}>
                    <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                    />
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.Text1}>Thanh toán bằng ví Dcash</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text2}>Số dư hiện tại: </Text>
                            <Text style={{ color: color.green, fontSize: 12, fontWeight: '400' }}>434,403</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.Boxcheck}>
                    <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                    />
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.Text1}>Thanh toán bằng ví Dpoint</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text2}>Số dư hiện tại: </Text>
                            <Text style={{ color: color.green, fontSize: 12, fontWeight: '400' }}>434,403</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={styles.muc}>Sản phẩm chọn mua</Text>
                    <Image source={require('../Icon/arrow.png')} style={{ height: 13, width: 7, marginRight: 5 }} />
                </View>
                <View>
                    <FlatList
                        data={addSP}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={renderlist}
                        scrollEnabled={false}
                    />
                </View>
                <Text style={styles.chucnang}>Ghi chú</Text>
                <View style={styles.boxnote}>
                    <TextInput multiline={true}></TextInput>
                </View>
                <Text style={styles.chucnang}>Thanh toán</Text>
                <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                    <Image source={require('../Image/backgrdathang.png')} style={{ height: 120, width: 345 }} />
                    <View style={{ width: '100%', paddingHorizontal: 30, position: 'absolute', paddingTop: 20 }}>
                        <View style={styles.itemthanhtoan}>
                            <Text style={styles.Text1TT}>Tổng cộng:</Text>
                            <Text style={{ color: color.organge, fontSize: 17, fontWeight: '700' }}>3,580,000</Text>
                        </View>
                        <View style={styles.itemthanhtoan}>
                            <Text style={styles.Text2TT}>Chiết khấu:</Text>
                            <Text style={{ color: color.blue, fontSize: 15, fontWeight: '500' }}>790,000</Text>
                        </View>
                        <View style={styles.itemthanhtoan}>
                            <Text style={styles.Text2TT}>Hoa hồng:</Text>
                            <Text style={{ color: color.green, fontSize: 15, fontWeight: '500' }}>79,000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                <TouchableOpacity
                    style={styles.btThemHang}
                    onPress={() => navigation.navigate('')}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                        Đặt hàng
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ScreenTTdathang

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
    muc: {
        fontSize: 17,
        fontWeight: '500',
        color: 'black'
    },
    Text1: {
        fontSize: 13,
        fontWeight: '700',
        color: 'black'
    },
    Text2: {
        fontSize: 12,
        fontWeight: '500',
        color: 'black'
    },
    Boxcheck: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    chucnang: {
        marginVertical: 10, color: 'black', fontSize: 17, fontWeight: '400'
    },
    boxnote: {
        backgroundColor: 'white', width: '100%', borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, padding: 20
    },
    btThemHang: {
        backgroundColor: 'black',
        width: 200,
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
    },
    itemthanhtoan: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10
    },
    Text1TT: {
        color: 'black', fontSize: 17, fontWeight: '700'
    },
    Text2TT: {
        color: 'black', fontSize: 15, fontWeight: '400'
    },
    buttonDc: {
        justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingVertical: 10
    },
    boxlocation: {
        padding: 10, backgroundColor: 'white', width: '100%', height: 80, borderRadius: 10, flexDirection: 'row', marginTop: 10
    }
})