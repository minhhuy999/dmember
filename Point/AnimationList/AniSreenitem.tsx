import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import color from '../../Color/color';

type ListItemProps = {
    item: any
    translateY: any
    index: any
};

const AniSreenitem: React.FC<ListItemProps> = ({ item, index, translateY }) => {

    function limitText(text: any, maxLength: any) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }

    return (
        <Animated.View style={[styles.BoxItem]}>
            <Image source={{ uri: item.img_1 }} style={{ width: 127, height: 112, borderRadius: 10 }} />
            <View style={{ width: 240, justifyContent: 'center', padding: 10 }}>
                <Text style={styles.Texttitle}>{limitText(item.product_name, 50)}</Text>
                <Text style={styles.TextPointmust}>{item.referral_vnd} Dpoint</Text>
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