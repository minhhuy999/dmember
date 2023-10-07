import { StyleSheet, Text, View, Image, TextInput, FlatList, ViewToken, ScrollView } from 'react-native'
import React, { useState } from 'react'
import color from '../Color/color'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import AniSreenitem from './AnimationList/AniSreenitem'

const ScreenPoint = () => {

    const Item = [
        {
            id: '1',
            img: require('../Image/Boost.png'),
            title: 'Immune Boost',
            note: 'Siêu phẩm tăng cường sức đề kháng toàn diện',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '2',
            img: require('../Image/Dfix.png'),
            title: 'Dfix',
            note: 'Trà giảm cân thiên nhiên',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '3',
            img: require('../Image/CellMask.png'),
            title: 'Brilliant Cell Mask',
            note: 'Mặt nạ tinh chất cô đặc trắng da, mờ thâm',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '4',
            img: require('../Image/Boost.png'),
            title: 'Immune Boost',
            note: 'Siêu phẩm tăng cường sức đề kháng toàn diện',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '5',
            img: require('../Image/Dfix.png'),
            title: 'Dfix',
            note: 'Trà giảm cân thiên nhiên',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '6',
            img: require('../Image/CellMask.png'),
            title: 'Brilliant Cell Mask',
            note: 'Mặt nạ tinh chất cô đặc trắng da, mờ thâm',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '7',
            img: require('../Image/Boost.png'),
            title: 'Immune Boost',
            note: 'Siêu phẩm tăng cường sức đề kháng toàn diện',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '8',
            img: require('../Image/Dfix.png'),
            title: 'Dfix',
            note: 'Trà giảm cân thiên nhiên',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '9',
            img: require('../Image/CellMask.png'),
            title: 'Brilliant Cell Mask',
            note: 'Mặt nạ tinh chất cô đặc trắng da, mờ thâm',
            pointm: '1,790,000 Dpoint'
        },
    ]

    // const translateY = useSharedValue(0);

    const viewableItems:any = useSharedValue<ViewToken[]>([]);

    // const scrollHandler = useAnimatedScrollHandler((event) => {
    //     translateY.value = event.contentOffset.y;
    // });

    return (
        <View style={styles.backgr}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Đổi điểm</Text>
                <View style={styles.boxpoint}>
                    <Text style={styles.TextPoint}>254,975</Text>
                    <Image source={require('../Icon/ViPoint.png')} style={{ marginLeft: 8 }} />
                </View>
            </View>
            <View style={styles.boxSearch}>
                <View style={styles.inputSearch}>
                    <Image source={require('../Icon/search.png')} />
                    <TextInput placeholder='Immune Boost' style={{ paddingLeft: 10 }}></TextInput>
                </View>
                <Image source={require('../Icon/cart.png')} style={{ height: 25, width: 25, marginLeft: 10 }} />
            </View>
            <Text style={styles.muc}>Có thể đổi</Text>
            <View style={{ flex: 1, marginBottom: 100 }}>
                <FlatList
                    data={Item}
                    // scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={({ viewableItems: vItems }) => {
                        viewableItems.value = vItems;
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return <AniSreenitem item={item} viewableItems={viewableItems} />;
                    }}
                />
            </View>
        </View>

    )
}

export default ScreenPoint

const styles = StyleSheet.create({
    backgr: {
        backgroundColor: color.background,
        flex: 1,
        padding: 10,
    },
    titleBox: {
        height: 50, width: '100%',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 21,
        fontWeight: '500',
        fontStyle: 'normal',
        color: 'black',
    },
    TextPoint: {
        color: color.green,
        fontSize: 14,
        fontWeight: '600'
    },
    muc: {
        fontSize: 17,
        fontWeight: '600',
        padding: 10,
        color: 'black',
        paddingVertical: 20
    },
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
    boxpoint: {
        flexDirection: 'row',
        backgroundColor: 'white',
        position: 'absolute', right: 12, top: 1,
        padding: 8,
        borderRadius: 20
    },
    boxSearch: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center', alignItems: 'center',
        paddingTop: 10
    },
    inputSearch: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '88%',
        paddingLeft: 20,
        height: 40,
        borderRadius: 10,
        alignItems: 'center'
    }
})