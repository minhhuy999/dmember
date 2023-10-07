import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import color from '../../Color/color';
import { removeSP, updateSLSP } from '../../Realm/StorageServices';
import realmHS from '../../Realm/realmHistoryS';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const DeletedAnimation = ({ item }: any) => {

    const translateX = useSharedValue(0);
    const addSP = realmHS.objects('AddProduct')
    const itemID = item.id

    const incrementQuantity = (id: string) => {
        const productToUpdate = addSP.find((product: any) => product.id === id);
        if (productToUpdate) {
            const newQuantity = productToUpdate.soluong + 1;
            updateSLSP(id, newQuantity);
        }
    };

    const decrementQuantity = (id: string) => {
        const productToUpdate = addSP.find((product: any) => product.id === id);
        if (productToUpdate && productToUpdate.soluong > 1) {
            const newQuantity = productToUpdate.soluong - 1;
            updateSLSP(id, newQuantity);
        }
    };

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
        {
            id: '7',
            img: require('../../SanPham/Gel.png'),
            name: 'Gel rửa mặt cho da dầu mụn 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '8',
            img: require('../../SanPham/PhanP.png'),
            name: 'Phấn phủ trang điểm siêu mịn',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '9',
            img: require('../../SanPham/SonAe.png'),
            name: 'Son Aery Jo Art Lipstick',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '10',
            img: require('../../SanPham/TrangD.png'),
            name: 'Son Aery Jo Art Lipstick',
            gia: '523,000',
            chietkhau: '53,000'
        },
    ]

    const product: any = SanPham.find((sp) => sp.id === item.id);

    const handleDeleteSP = (id: string) => {
        removeSP(id)
    };

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            if (translateX.value < -200) {
                runOnJS(handleDeleteSP)(itemID);
            } else {
                translateX.value = withTiming(0);
            }
        },
    });

    const rStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [0, -200],
            [1, 0],
            Extrapolate.CLAMP
        );
        return {
            opacity,
            transform: [{ translateX: translateX.value }],
        };
    });

    const deletedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [0, -200],
            [0, 1],
            Extrapolate.CLAMP
        );
        return {
            opacity,
        };
    });

    return (
        <PanGestureHandler onGestureEvent={panGesture} >
            <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Animated.View style={[deletedStyle, { position: 'absolute', right: 20 }]}>
                    <TouchableOpacity>
                        <View style={styles.Boxdelete}>
                            <Image source={require('../../Icon/thungrac.png')} style={{ width: 25, height: 25 }} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.boxrenderSp, rStyle]}>
                    <Image source={product.img} style={{ width: 80, height: 80 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'black', fontSize: 13, fontWeight: '500', flex: 1 }}>{product.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text1render}>Giá bán: </Text>
                                    <Text style={styles.texxt2render}>{product.gia}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text1render}>Chiết khấu: </Text>
                                    <Text style={styles.texxt2render}>{product.chietkhau}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                                    <View style={styles.boxcalculate}>
                                        <Text style={styles.calculate}>-</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ paddingHorizontal: 10, color: 'black', fontSize: 17, fontWeight: '500' }}>
                                    {item.soluong}
                                </Text>
                                <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                                    <View style={styles.boxcalculate}>
                                        <Text style={styles.calculate}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default DeletedAnimation

const styles = StyleSheet.create({
    boxrenderSp: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        elevation: 2
    },
    text1render: {
        color: 'black',
        fontSize: 11,
        fontWeight: '400'
    },
    texxt2render: {
        color: color.organge,
        fontSize: 11,
        fontWeight: '600'
    },
    calculate: {
        color: 'white',
        fontSize: 17,
        fontWeight: '500'
    },
    boxcalculate: {
        width: 24, height: 24,
        backgroundColor: 'black',
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 7
    },
    Boxdelete: {
        width: 35, height: 35,
        backgroundColor: 'red',
        borderRadius: 35,
        justifyContent: 'center', alignItems: 'center'
    },
})