import { Image, StyleSheet, Text, View, ViewToken } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import color from '../../Color/color';

type ListItemProps = {
    item: any
    viewableItems: typeof useSharedValue<ViewToken[]>;
};

const AniSreenitem: React.FC<ListItemProps> = React.memo(({ item, viewableItems }: any) => {

    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(
            viewableItems?.value
                .filter((item:any) => item.isViewable)
                .find((viewableItem:any) => viewableItem.item.id === item.id)
        );

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isVisible ? 1 : 0.6),
                },
            ],
        };
    }, []);

    return (
        <Animated.View style={[styles.BoxItem, rStyle]}>
            <Image source={item.img} style={{ width: 127, height: 112 }} />
            <View style={{ width: 240, justifyContent: 'center', padding: 10 }}>
                <Text style={styles.Texttitle}>{item.title}</Text>
                <Text style={styles.TextNote}>{item.note}</Text>
                <Text style={styles.TextPointmust}>{item.pointm}</Text>
            </View>
        </Animated.View>
    )
}
)
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