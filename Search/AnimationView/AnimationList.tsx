import { Image, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native'
import React from 'react'
import realmHS from '../../Realm/realmHistoryS'
import { addSPStore } from '../../Realm/StorageServices'
import { useNavigation } from '@react-navigation/native'
import color from '../../Color/color'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type ListItemProps = {
    viewableItems: typeof useSharedValue<ViewToken[]>;
    item: {
        id: number;
    };
};


const AnimationList: React.FC<ListItemProps> = React.memo(
    ({ item, viewableItems }: any) => {

        const navigation: any = useNavigation()

        const addSP = realmHS.objects('AddProduct')

        const handleAddToCart = (item: any) => {
            const existingProduct: any = addSP.filtered(`id == '${item.id}'`)[0]
            if (existingProduct) {
                realmHS.write(() => {
                    existingProduct.soluong += 1
                })
            } else {
                // addSPStore(item.id, 1)
            }
            console.log('Sản phẩm đã được thêm vào cơ sở dữ liệu Realm.')
        }

        const rStyle = useAnimatedStyle(() => {
            const isVisible = Boolean(
                viewableItems.value
                    .filter((item: any) => item.isViewable)
                    .find((viewableItem: any) => viewableItem.item.id === item.id)
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
            <Animated.View style={[rStyle]}>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailProduct', { item })}>
                    <View style={{ elevation: 3, backgroundColor: 'white', height: 229, width: 169, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, marginRight: 15, marginBottom: 15 }}>
                        <Image source={item.img} style={{ height: 130, width: 132 }} />
                        <Text style={styles.ItemnameSP}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            <Text style={styles.ItemtextSP}>Giá bán: </Text>
                            <Text style={styles.ItemTextGia}>{item.gia}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            <Text style={styles.ItemtextSP}>Chiết khấu: </Text>
                            <Text style={styles.ItemTextCK}>{item.chietkhau}</Text>
                        </View>
                        <TouchableOpacity style={styles.Add} onPress={() => handleAddToCart(item)}>
                            <Text style={{ color: 'white' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }
)

export { AnimationList }

const styles = StyleSheet.create({
    ItemnameSP: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '500',
        color: 'black',
        marginTop: 10
    },
    ItemtextSP: {
        color: 'black',
        fontSize: 10,
        fontWeight: '400',
        marginLeft: 5
    },
    ItemTextGia: {
        color: color.grow,
        fontSize: 10,
        fontWeight: '600'
    },
    ItemTextCK: {
        color: color.blue,
        fontSize: 10,
        fontWeight: '600'
    },
    Add: {
        height: 27, width: 27,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 27,
        position: 'absolute',
        bottom: 2, right: 2
    },
})