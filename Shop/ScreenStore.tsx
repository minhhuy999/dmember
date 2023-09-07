import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import color from '../Color/color';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';


const ScreenStore = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    const SanPham = [
        {
            id: '1',
            img: require('../SanPham/NTTpink.png'),
            name: 'Nước tẩy trang Dearanchy Purifying Pure Cleansing 30ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '2',
            img: require('../SanPham/NTTred.png'),
            name: 'Dầu tẩy trang Dearanchy Purifying Pure Cleansing 30ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '3',
            img: require('../SanPham/SRMdermaPH.png'),
            name: 'Sữa rửa mặt tạo bọt Dearanchy Purifying Derma PH Care 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '4',
            img: require('../SanPham/Gel.png'),
            name: 'Gel rửa mặt cho da dầu mụn 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
    ]

    const delet = () => {
        return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }}>
                    <View style={styles.Boxdelete}>
                        <Image source={require('../Icon/thungrac.png')} style={{ width: 25, height: 25 }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const renderSP = ({ item, index }: any) => {
        return (
            <Swipeable renderRightActions={delet}>
                <View style={styles.boxrenderSp}>
                    <Image source={item.img} style={{ width: 80, height: 80 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'black', fontSize: 13, fontWeight: '500', flex: 1 }}>{item.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text1render}>Giá bán: </Text>
                                    <Text style={styles.texxt2render}>{item.gia}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text1render}>Chiết khấu: </Text>
                                    <Text style={styles.texxt2render}>{item.chietkhau}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <View style={styles.boxcalculate}>
                                    <Text style={styles.calculate}>-</Text>
                                </View>
                                <Text style={{ paddingHorizontal: 10, color: 'black', fontSize: 17, fontWeight: '500' }}>1</Text>
                                <View style={styles.boxcalculate}>
                                    <Text style={styles.calculate}>+</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 20, top: 10 }}>
                    <Image source={require('../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Giỏ hàng</Text>
            </View>
            {SanPham.length > 0 ? (
                <View style={styles.hienthi}>
                    <View style={{paddingHorizontal: 20, flex:1 }}>
                        <FlatList
                            data={SanPham}
                            keyExtractor={(item) => item.id}
                            renderItem={renderSP}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.BoxALLmonney}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../Icon/gio.png')} />
                            <Text style={{ marginLeft: 20, color: color.organge, fontSize: 21, fontWeight: '600' }}>1,590,000</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ScreenTTdathang')}
                            style={{
                                backgroundColor: 'black',
                                width: 100,
                                alignItems: 'center',
                                padding: 15,
                                borderRadius: 10,
                            }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.khonghienthi}>
                    <Image source={require('../Icon/cartnull.png')} style={{ width: 103, height: 103 }} />
                    <Text>Giỏ hàng của bạn đang trống!</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ScreenBieumau')}
                        style={{
                            backgroundColor: 'black',
                            width: 200,
                            alignItems: 'center',
                            padding: 15,
                            marginTop:40,
                            borderRadius: 10,
                        }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                            Thêm vào giỏ
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default ScreenStore

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
    },
    BoxTitile: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    title: {
        color: 'black',
        fontSize: 21,
        fontWeight: '500'
    },
    hienthi: {
        flex: 1,
    },
    khonghienthi: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    Boxdelete:{
        width: 35, height: 35, 
        backgroundColor: 'red', 
        borderRadius: 35, 
        justifyContent: 'center', alignItems: 'center' 
    },
    boxrenderSp:{
        flexDirection: 'row', 
        backgroundColor: 'white', 
        borderRadius: 10, 
        padding: 10, 
        marginBottom: 10, 
        elevation: 2
    },
    text1render:{
        color: 'black', 
        fontSize: 11, 
        fontWeight: '400'
    },
    texxt2render:{
        color: color.organge, 
        fontSize: 11, 
        fontWeight: '600' 
    },
    calculate:{
        color: 'white', 
        fontSize: 17, 
        fontWeight: '500' 
    },
    boxcalculate:{
        width: 24, height: 24, 
        backgroundColor: 'black', 
        justifyContent: 'center', alignItems: 'center', 
        borderRadius: 7 
    },
    BoxALLmonney:{
        backgroundColor: 'white', 
        width: '100%', height: 70, 
        position: 'absolute', bottom: 0, 
        flexDirection: 'row', 
        alignItems: "center", justifyContent: 'space-between', 
        paddingHorizontal: 20
    }
})