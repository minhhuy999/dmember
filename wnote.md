import { Image, StyleSheet, Text, View, ViewToken } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import color from '../../Color/color';

type ListItemProps = {
    item:any
    translateY:any; 
};

const AniSreenitem: React.FC<ListItemProps> = ({translateY ,item }: ListItemProps) => {

    const ITEM_HEIGHT = 200;

    const rTextStyle = useAnimatedStyle(() => {
        const translate = interpolate(
            translateY.value,
            [(item.id - 1) * ITEM_HEIGHT, item.id * ITEM_HEIGHT, (item.id + 1) * ITEM_HEIGHT],
            [0, 1, 0],
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            translateY.value,
            [(item.id - 1) * ITEM_HEIGHT, item.id * ITEM_HEIGHT, (item.id + 1) * ITEM_HEIGHT],
            [1, 0, 1],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            translateY.value,
            [(item.id - 1) * ITEM_HEIGHT, item.id * ITEM_HEIGHT, (item.id + 1) * ITEM_HEIGHT],
            [1, 0, 1],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY: translate }, { scale: scale }],
        };
    });
    

    return (
        <Animated.View style={[styles.BoxItem, rTextStyle]}>
            <Image source={item.img} style={{ width: 127, height: 112 }} />
            <View style={{ width: 240, justifyContent: 'center', padding: 10 }}>
                <Text style={styles.Texttitle}>{item.title}</Text>
                <Text style={styles.TextNote}>{item.note}</Text>
                <Text style={styles.TextPointmust}>{item.pointm}</Text>
            </View>
        </Animated.View>
    )
}

export default AniSreenitem

const styles = StyleSheet.create({
    BoxItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        marginBottom: 15,
    },
    Texttitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: '700'
    },
    TextNote: {
        color: 'black',
        fontSize: 13,
        fontWeight: '500',
        marginBottom: 10,
        height: 40
    },
    TextPointmust: {
        backgroundColor: color.organrelow,
        color: 'white',
        width: 130,
        borderRadius: 7,
        paddingVertical: 1,
        textAlign: 'center'
    },
})