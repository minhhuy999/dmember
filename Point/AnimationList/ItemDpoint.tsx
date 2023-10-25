import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { removeDpoint, updateSLSPDpoint } from '../../Realm/StorageServices'
import realmHS from '../../Realm/realmHistoryS'
import Animated, { Extrapolate, clamp, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { getAPIDetail } from '../../AsysncStorage/AsysncStore'

const ItemDpoint = ({ item, Domain, APIkey }: any) => {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    const translateX = useSharedValue(0)
    const addSPDpoint = realmHS.objects('AddItemDpoint')
    const itemID = item.id

    function limitPoints(points:any) {
        return points.toString().slice(0, 5);
    }

    const [data, setdata] = useState<any>([])
    const [image, setimage] = useState('')
    

    const incrementQuantity = (id: string) => {
        const productToUpdate = addSPDpoint.find((product: any) => product.id === id)
        if (productToUpdate) {
            const newQuantity = productToUpdate.soluong + 1
            updateSLSPDpoint(id, newQuantity)
        }
    }

    const decrementQuantity = (id: string) => {
        const productToUpdate = addSPDpoint.find((product: any) => product.id === id)
        if (productToUpdate && productToUpdate.soluong > 1) {
            const newQuantity = productToUpdate.soluong - 1
            updateSLSPDpoint(id, newQuantity)
        }
    }



    const handleDeleteSP = (id: string) => {
        removeDpoint(id)
    }

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({

        onActive: (event) => {
            translateX.value = event.translationX
        },
        onEnd: () => {
            if (translateX.value < -200) {
                runOnJS(handleDeleteSP)(itemID)
            } else {
                translateX.value = withTiming(0)
            }
        },
    })

    const rStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [0, -200],
            [1, 0],
            Extrapolate.CLAMP
        )
        return {
            opacity,
            transform: [{ translateX: translateX.value }],
        }
    })

    const deletedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [0, -200],
            [0, 1],
            Extrapolate.CLAMP
        )
        return {
            opacity,
        }
    })

    useEffect(() => {
        getAPIDetail({ item, Domain, APIkey, setdata, setimage })
    }, [])

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
                    {image ? (
                        <Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: 5, marginRight: 10 }} />
                    ) : (
                        <ShimmerPlaceholder style={{ width: 80, height: 80, borderRadius: 5, marginRight: 10 }} shimmerColors={['#564d4d', '#8e8e8e', '#564d4d']} />
                    )}
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'black', fontSize: 13, fontWeight: '500', flex: 1 }}>{data.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <View style={{ flexDirection: 'row' , marginTop:10 }}>
                                    <Text style={styles.text1render}>Giá Dpoint: </Text>
                                    <Text style={styles.texxt2render}>{limitPoints(item.point)}</Text>
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

export default ItemDpoint

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