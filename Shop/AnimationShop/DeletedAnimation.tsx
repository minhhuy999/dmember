import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color';
import { removeSP, updateSLSP } from '../../Realm/StorageServices';
import realmHS from '../../Realm/realmHistoryS';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const DeletedAnimation = ({ item, Domain, APIkey }: any) => {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    const translateX = useSharedValue(0);
    const addSP = realmHS.objects('AddProduct')
    const itemID = item.id

    const apiProductlist = `${Domain}/client_product/detail?apikey=${APIkey}`

    const [data, setdata] = useState<any>([])
    const [image, setimage] = useState('')
    const formData = new FormData()
    formData.append('app_name', 'khttest')
    formData.append('id', item.id)

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

    const price = parseFloat(data.price);
    const pricecal = parseFloat(data.price_cal_commission);
    const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    const formattedDiscount = pricecal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

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

    return (
        <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Animated.View style={[deletedStyle, { position: 'absolute', right: 20 }]}>
                    <TouchableOpacity>
                        <View style={styles.Boxdelete}>
                            <Image source={require('../../Icon/thungrac.png')} style={{ width: 25, height: 25 }} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.boxrenderSp, rStyle]}>
                    {image ? (
                        <Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: 5, marginRight: 10 }} />
                    ) : (
                        <ShimmerPlaceholder style={{ width: 80, height: 80, borderRadius: 5, marginRight: 10 }} shimmerColors={['#564d4d', '#8e8e8e', '#564d4d']} />
                    )}
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'black', fontSize: 13, fontWeight: '500', flex: 1 }}>{data.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text1render}>Giá bán: </Text>
                                    <Text style={styles.texxt2render}>{formattedPrice}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text1render}>Chiết khấu: </Text>
                                    <Text style={styles.texxt2render}>{formattedDiscount}</Text>
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