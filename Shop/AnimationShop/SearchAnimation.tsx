import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import realmHS from '../../Realm/realmHistoryS'
import { useNavigation } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Typewriter from '../../Point/Typewriter';


const { height, width } = Dimensions.get('window');

const SIZE: any = width * 0.77;

interface PageProps {
    translateY: any;
}

const SearchAnimation: React.FC<PageProps> = ({ translateY }) => {
    const navigation: any = useNavigation();
    const addSP = realmHS.objects('AddProduct')

    const rTextStyle = useAnimatedStyle(() => {

        const scaleY = interpolate(
            translateY.value,
            [0, 100],
            [1, 0, 5],
            Extrapolate.CLAMP
        );

        const translateX = interpolate(
            translateY.value,
            [0, 100],
            [0, -SIZE / 2],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            translateY.value,
            [0, 100],
            [1, 0],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [{ translateX }, { scale: scaleY }],
        };
    });

    const rStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            translateY.value,
            [0, 100],
            [0, 1],
            Extrapolate.CLAMP
        );

        return {
            opacity,
        };
    });

    const IconStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            translateY.value,
            [0, 100],
            [0, -SIZE + 35],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ translateX }]
        }
    })

    return (
        <Animated.View style={styles.BoxSreach}>
            <Animated.View style={[rStyle, styles.BoxIcon]} />
            <Animated.View style={[styles.BoxSreachAnimation, rTextStyle]}>
                <Typewriter delay={100} infinite />
            </Animated.View>
            <Image source={require('../../Icon/search.png')} style={{ position: 'absolute', left: 10 }} />
            <Animated.View style={[IconStyle]}>
                <Image source={require('../../Icon/Bell.png')} style={{ height: 25, width: 25, marginLeft: 10, marginBottom: 10 }} />
            </Animated.View>
            <Animated.View style={[IconStyle]}>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenStore')}>
                    <Image source={require('../../Icon/cart.png')} style={{ height: 25, width: 25, marginLeft: 10, marginBottom: 10 }} />
                    {addSP.length > 0 && <View style={styles.dotstore}></View>}
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    )
}

export default SearchAnimation

const styles = StyleSheet.create({
    BoxSreach: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    dotstore: {
        height: 10, width: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        position: 'absolute',
        right: 1,
        bottom: 15
    },
    BoxSreachAnimation: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: SIZE,
        paddingLeft: 20,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    BoxIcon: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: SIZE / 2.5,
        paddingLeft: 20,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        position: 'absolute',
        left: 0,
    }
})