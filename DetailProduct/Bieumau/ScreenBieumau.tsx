import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenBieumau = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    const SanPham = [
        {
            id: '1',
            img: require('../../SanPham/NTTpink.png'),
            name: 'Nước tẩy trang Dearanchy Purifying Pure Cleansing 30ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '2',
            img: require('../../SanPham/NTTred.png'),
            name: 'Dầu tẩy trang Dearanchy Purifying Pure Cleansing 30ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '3',
            img: require('../../SanPham/SRMdermaPH.png'),
            name: 'Sữa rửa mặt tạo bọt Dearanchy Purifying Derma PH Care 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '4',
            img: require('../../SanPham/Gel.png'),
            name: 'Gel rửa mặt cho da dầu mụn 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '5',
            img: require('../../SanPham/SRMvita.png'),
            name: 'Sữa rửa mặt vitamin làm trắng Dearanchy Moisture Vita 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '6',
            img: require('../../SanPham/SRMvita.png'),
            name: 'Sữa rửa mặt vitamin làm trắng Dearanchy Moisture Vita 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
    ]


    const renderTopItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailProduct')}>
                <View style={styles.ItemTopSP}>
                    <Image source={item.img} style={{ width: 110, height: 105, marginVertical: 10 }} />
                    <Text style={styles.ItemnameSP}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.ItemtextSP}>Giá bán:</Text>
                        <Text style={styles.ItemTextGia}> {item.gia}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.ItemtextSP}>Chiết khấu:</Text>
                        <Text style={styles.ItemTextCK}>  {item.chietkhau}</Text>
                    </View>
                    <View style={styles.Add}>
                        <Text style={{ color: 'white' }}>+</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View style={styles.backgr}>
                <View style={styles.BoxTitile}>
                    <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                        <Image source={require('../../Icon/arrowback.png')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Nước tẩy trang làm sạch, kh</Text>
                </View>
                <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 30, padding: 15 }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                        <Image source={require('../../IconUser/avata.png')} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.muc}>Mỹ phẩm Milky Dress</Text>
                            <Text style={styles.textDetail}>17/06/2022, 17:50</Text>
                        </View>
                    </View>
                    <Text style={styles.muc}>Nước tẩy trang làm sạch, khỏe da - Dearanchy-Purifying Pure - Cleasing Water</Text>
                    <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                        <Image source={require('../../Icon/hand.png')} style={{ width: 20, height: 20 }} />
                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '400', marginHorizontal: 10 }}>Giá ưu đãi:</Text>
                        <Text style={{ color: 'red', fontSize: 15, fontWeight: '600' }}>412,500đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                        <Image source={require('../../Icon/traitim.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                        <Text style={styles.muc}>VÌ SAO BẠN SẼ THÍCH?</Text>
                    </View>
                    <Text style={styles.textDetail}>Nước tẩy trang Dearanchy-Purifying Pure có công thức được lựa chọn kĩ càng với các thành phần làm sạch dịu nhẹ phù hợp cho da dầu và da mụn nhạy cảm. Sản phẩm nhẹ nhàng loại bỏ độc tố cho da nhờ vào các hoạt chất làm sạch được chọn lọc cho làn da nhạy cảm, đồng thời loại bỏ bã nhờn dư thừa, mang lại làn da sạch và thoáng mát.</Text>
                    <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                        <Image source={require('../../Icon/co4la.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                        <Text style={styles.muc}>ƯU ĐIỂM NỔI BẬT</Text>
                    </View>
                    <Text style={styles.textDetail}>👉 Làm sạch đến 99% lớp trang điểm, 70% mascara và các hạt bụi siêu nhỏ có trong khói xe và môi trường ô nhiễm chỉ sau một lượt bông cotton*. 👉 Cung cấp độ ẩm và giảm ma sát tối đa khi làm sạch. 👉 Chống oxy hóa, giúp bảo vệ da trước môi trường ô nhiễm.</Text>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 1, width: '80%', backgroundColor: color.graymedium, marginVertical: 10 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../Icon/downImg.png')} style={{ width: 17, height: 17, marginRight: 10, marginVertical: 10 }} />
                            <Text style={styles.textDetail}>Tải ảnh</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../Icon/link.png')} style={{ width: 17, height: 17, marginRight: 10, marginVertical: 10 }} />
                            <Text style={styles.textDetail}>Sao chép</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../Icon/post.png')} style={{ width: 17, height: 17, marginRight: 10, marginVertical: 10 }} />
                            <Text style={styles.textDetail}>Đăng bán</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
                    <Text style={styles.title}>BÀI VIẾT CÙNG DANH MỤC</Text>
                </View>
                <View style={{ width: '100%', height: 250 }}>
                    <FlatList
                        data={SanPham}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTopItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', height: 120, flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ScreenBieumau')}
                            style={{
                                backgroundColor: 'black',
                                width: 170,
                                alignItems: 'center',
                                padding: 15,
                                borderRadius: 10,
                            }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                                Thêm vào giỏ
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ScreenBieumau')}
                            style={{
                                backgroundColor: 'black',
                                width: 170,
                                alignItems: 'center',
                                padding: 15,
                                borderRadius: 10,
                            }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                                Tạo bài viết mẫu
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ScreenBieumau

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
        color: 'black',
        fontSize: 17,
        fontWeight: '700'
    },
    textDetail: {
        color: 'black',
        textAlign: 'justify',
        fontSize: 15,
        paddingTop: 10,
    },
    ItemTopSP: {
        backgroundColor: 'white',
        width: 132, height: 230,
        borderRadius: 10,
        paddingLeft: 10, padding: 5, paddingRight: 10,
        marginRight: 10
    },
    ItemnameSP: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '500',
        color: 'black',
        marginTop: 10
    },
    ItemtextSP: {
        color: 'black',
        fontSize: 10,
        fontWeight: '400',
        marginLeft: 5
    },
    ItemTextGia: {
        color: color.grow,
        fontSize: 10,
        fontWeight: '600'
    },
    ItemTextCK: {
        color: color.blue,
        fontSize: 10,
        fontWeight: '600'
    },
    Add: {
        height: 27, width: 27,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 27,
        position: 'absolute',
        bottom: 2, right: 2
    },
})