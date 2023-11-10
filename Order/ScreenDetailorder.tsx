import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatListComponent } from 'react-native'
import React, { useState } from 'react'
import color from '../Color/color';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const ScreenDetailorder = ({ route }: any) => {

    const navigation: any = useNavigation()
    const { item } = route.params

    const fotmatedmonney = ((item: any) => {
        const monney = parseFloat(item)
        const formattedMonney = monney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        return formattedMonney;
    })

    const datalist = [
        {
            id: '1',
            img: require('../SanPham/NTTpink.png'),
            name: 'Dearanchy-Purifying Pure - Cleasing Water - Nước tẩy trang làm sạch, khỏe da',
            giaban: '412,500',
            chietkhau: '412,500',
            soluong: '1',
        },
        {
            id: '2',
            img: require('../SanPham/NTTred.png'),
            name: 'Dearanchy-Purifying Oil to - Foarm Cleanser - Dầu tẩy trang làm sạch sâu.',
            giaban: '412,500',
            chietkhau: '412,500',
            soluong: '1',
        }
    ]

    const renderlist = ({ item, index }: any) => {
        return (
            <View style={styles.Boxrenderlist}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={{ width: 53, height: 53, paddingVertical: 10, marginLeft: 5, borderRadius: 5 }} />
                ) : (
                    <View style={{backgroundColor: color.bluemedium, width: 53, height: 53, paddingVertical: 10, marginLeft: 5, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>cb</Text>
                    </View>
                )}
                <View style={{ width: 280, padding: 5, height: 80, paddingHorizontal: 10 }}>
                    <View style={{ height: 40, width: 200 }}>
                        <Text style={styles.Text3}>{item.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 30 }}>
                        <View style={{ height: 30, width: '75%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.Text2}>Giá bán: </Text>
                                <Text style={{ color: color.organge, fontSize: 12, fontWeight: '400' }}>{fotmatedmonney(item.price)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.Text2}>Chiết khấu: </Text>
                                <Text style={{ color: color.blue, fontSize: 12, fontWeight: '400' }}>{fotmatedmonney(item.retail_price)}</Text>
                            </View>
                        </View>
                        <View style={{ height: 30, justifyContent: 'flex-end' }}>
                            <Text style={styles.Text2}>Số lượng: {parseFloat(item.quantity)}</Text>
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
                <Text style={styles.title}>Chi tiết đơn hàng</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.box1}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Text1}>Mã đơn hàng: </Text>
                        <Text style={styles.Text1}>{item.id}</Text>
                    </View>
                    <View style={{ marginTop: 10, padding: 10, borderWidth: 1, borderStyle: 'dashed', borderRadius: 10 }}>
                        <Text>Ghi chú: Đến A69 gửi bảo vệ</Text>
                    </View>
                </View>
                <Text style={styles.muc}>Thông tin xuất bán</Text>
                <View style={styles.box1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.Text5}>Tổng tiền hàng:</Text>
                        <Text style={styles.Text4}>{fotmatedmonney(item.total)}</Text>
                    </View>
                    <View style={styles.boxtext}>
                        <Text style={styles.Text5}>Tổng thành tiền:</Text>
                        <Text style={styles.Text4}>{fotmatedmonney(item.total)}</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: color.gray, marginVertical: 10 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.Text4}>Thanh toán khi nhận hàng:</Text>
                        <Text style={{ color: color.organge, fontSize: 15, fontWeight: '600' }}>{fotmatedmonney(item.total)}</Text>
                    </View>
                </View>
                <Text style={styles.muc}>Thông tin đơn hàng</Text>
                <View style={styles.box1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.Text5}>Tổng tiền hàng:</Text>
                        <Text style={styles.Text4}>1,580,000</Text>
                    </View>
                    <View style={styles.boxtext}>
                        <Text style={styles.Text5}>Lợi nhuận:</Text>
                        <Text style={{ color: color.green, fontSize: 15, fontWeight: '600' }}>580,000</Text>
                    </View>
                    <View style={styles.boxtext}>
                        <Text style={styles.Text5}>Lợi nhuận đơn hàng:</Text>
                        <Text style={{ color: color.green, fontSize: 15, fontWeight: '600' }}>580,000</Text>
                    </View>
                    <View style={styles.boxtext}>
                        <Text style={styles.Text5}>Tổng thành tiền:</Text>
                        <Text style={styles.Text4}>1,580,000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: color.gray, marginVertical: 10 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.Text4}>Số tiền thanh toán:</Text>
                        <Text style={{ color: color.organge, fontSize: 15, fontWeight: '600' }}>1,580,000</Text>
                    </View>
                </View>
                <Text style={styles.muc}>Địa chỉ nhận hàng</Text>
                <View style={styles.boxlocation}>
                    <Image source={require('../Icon/location.png')} style={{ height: 35, width: 35, borderRadius: 35 }} />
                    <View style={{ paddingRight: 30, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text3}>{item.ship_name}</Text>
                            <View style={{ backgroundColor: 'black', height: 20, width: 1, marginHorizontal: 10 }}></View>
                            <Text style={styles.Text3}>{item.ship_mobile}</Text>
                        </View>
                        <Text style={styles.Text2}>{item.ship_address}</Text>
                    </View>
                </View>
                <Text style={styles.muc}>Sản phẩm đã mua</Text>
                <View>
                    <FlatList
                        data={item.lItems}
                        keyExtractor={(item) => item.id}
                        renderItem={renderlist}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ScreenDetailorder

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
    Text1: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500'
    },
    Text2: {
        fontSize: 12,
        fontWeight: '500',
        color: 'black'
    },
    Text3: {
        color: 'black',
        fontSize: 13,
        fontWeight: '500'
    },
    Text4: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black'
    },
    Text5: {
        fontSize: 15,
        fontWeight: '400',
        color: 'black'
    },
    box1: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    Boxrenderlist: {
        backgroundColor: 'white',
        width: '100%', height: 90,
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    muc: {
        marginVertical: 20,
        color: 'black',
        fontSize: 17,
        fontWeight: '400'
    },
    boxtext: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    boxlocation: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row'
    }
})