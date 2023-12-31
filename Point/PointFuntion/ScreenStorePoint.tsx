import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color';
import { useNavigation } from '@react-navigation/native';
import realmHS from '../../Realm/realmHistoryS';
import { loadAddDpointData, } from '../../Realm/StorageServices';
import { ScrollView } from 'react-native-gesture-handler';
import ItemDpoint from '../AnimationList/ItemDpoint';

const ScreenStorePoint = ({ route }: any) => {

    const { Domain,APIkey } = route.params

    useEffect(() => {
        addSPDpoint.addListener(listener);
        return () => {
            addSPDpoint.removeListener(listener);
        };
    }, [])

    const listener = (newTasks: any) => {
        loadAddDpointData()
            .then((tasks: any) => {
                setDataSrore(tasks)
                console.log(addSPDpoint)
            })
    };

    const [DataSrore, setDataSrore] = useState([])

    const addSPDpoint = realmHS.objects('AddItemDpoint')
    const navigation: any = useNavigation();

    let totalPrice = 0;
    let totalnumber = 0;

    for (const item of addSPDpoint as unknown as { id: string; soluong: number , point: number }[]) {
            totalPrice += item.point * item.soluong;
            totalnumber += item.soluong
    }

    const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Giỏ hàng Dpoint</Text>
            </View>
            {addSPDpoint.length > 0 ? (
                <View style={styles.hienthi}>
                    <ScrollView style={{ paddingHorizontal: 20, flex: 1 }}>
                        <FlatList
                            data={addSPDpoint}
                            keyExtractor={(item: any) => item.id.toString()}
                            scrollEnabled={false}
                            initialNumToRender={1}
                            renderItem={({ item }) => {
                                return <ItemDpoint item={item} Domain={Domain} APIkey={APIkey}/>;
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={{ width: '100%', height: 100 }} />
                    </ScrollView>
                    <View style={styles.BoxALLmonney}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../Icon/gio.png')} />
                            <View style={styles.numberSP}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{totalnumber}</Text>
                            </View>
                            <Text style={{ marginLeft: 20, color: color.organge, fontSize: 21, fontWeight: '600' }}>{formattedTotalPrice}</Text>
                        </View>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('ScreenTTdathang',{Domain,APIkey})}
                            style={{
                                backgroundColor: 'black',
                                width: 100,
                                alignItems: 'center',
                                padding: 15,
                                borderRadius: 10,
                            }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.khonghienthi}>
                    <Image source={require('../../Icon/cartnull.png')} style={{ width: 103, height: 103 }} />
                    <Text>Giỏ hàng của bạn đang trống!</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ScreenBieumau')}
                        style={{
                            backgroundColor: 'black',
                            width: 200,
                            alignItems: 'center',
                            padding: 15,
                            marginTop: 40,
                            borderRadius: 10,
                        }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                            Thêm vào giỏ
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default ScreenStorePoint

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
    },
    BoxTitile: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    title: {
        color: 'black',
        fontSize: 21,
        fontWeight: '500'
    },
    hienthi: {
        flex: 1,
    },
    khonghienthi: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    BoxALLmonney: {
        backgroundColor: 'white',
        width: '100%', height: 70,
        position: 'absolute', bottom: 0,
        flexDirection: 'row',
        alignItems: "center", justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    numberSP:
    {
        backgroundColor: 'red',
        height: 20, width: 20,
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'center',
        position: 'absolute',
        left: 20,
        top: 15
    }
})