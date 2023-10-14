import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const HomeBottomTab = (props: any) => {

    const translateY = useSharedValue(0);
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;

    const IconStyle = useAnimatedStyle(() => {
        const translate = interpolate(
            translateY.value,
            [0, 10],
            [0, -20],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ translateY: translate },]
        }
    })


    const TextStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateY.value,
            [0, 10],
            [0, 1],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ scale }]
        }
    })

    const CricleStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateY.value,
            [0, 10],
            [0, 1],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }]
        }
    })

    useEffect(() => {
        SplashScreen.hide();
        if (focused) {
            translateY.value = withTiming(10);
        } else {
            translateY.value = withTiming(0);
        }
    }, [focused])

    return (
        <Animated.View style={[IconStyle, { flex: 1, justifyContent: 'space-between' }]}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={1}
                style={styles.container}>
                <View style={styles.btn}>
                    <Animated.View
                        style={[styles.circle, CricleStyle]} />
                    <Image source={item.type} style={{ height: 23.75, width: 25, position: 'absolute' }} />
                </View>
                <Animated.View style={[TextStyle]}>
                    <Text style={styles.text}>{item.label}</Text>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default HomeBottomTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        height: 60,
        position: 'absolute',
        bottom: 10,
        right: 16,
        left: 16,
        borderRadius: 16,
        elevation: 5
    },
    btn: {
        marginTop: 20,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: 50,
        height: 50,
        borderRadius: 15,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})