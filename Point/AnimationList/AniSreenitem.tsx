import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import color from '../../Color/color';

type ListItemProps = {
    item: any
    translateY: any
    index: any
};

const ITEM_MARGIN_BOTTOM = 15
const ITEM_HEIGHT = 112
const ITEM_SIZE = ITEM_HEIGHT + ITEM_MARGIN_BOTTOM

const AniSreenitem: React.FC<ListItemProps> = ({ item, index, translateY }) => {

    function limitText(text: any, maxLength: any) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }

    function limitPoints(points:any) {
        return points.toString().slice(0, 5);
    }

    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateY.value,
            [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            [1, 1, 1, 0]
        );
        return {
            transform: [{ scale }],
        };
    });

    return (
        <Animated.View style={[styles.BoxItem, rStyle]}>
            <Image source={{ uri: item.img_1 }} style={{ width: 127, height: 112, borderRadius: 10, }} />
            <View style={{ width: 240, justifyContent: 'center', padding: 10 }}>
                <Text style={styles.Texttitle}>{limitText(item.product_name, 50)}</Text>
                <Text style={styles.TextPointmust}>{limitPoints(item.point)} Dpoint</Text>
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
        height: ITEM_HEIGHT,
        marginBottom: ITEM_MARGIN_BOTTOM,
    },
    Texttitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: '700',
        paddingBottom: 30
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
        paddingLeft: 20
    },
})