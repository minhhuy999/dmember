import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import color from '../Color/color';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import realmHS from '../Realm/realmHistoryS';
import { loadAddSPData, } from '../Realm/StorageServices';
import DeletedAnimation from './AnimationShop/DeletedAnimation';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { retrieveUserData } from '../AsysncStorage/AsysncUser';

const ScreenStore = ({ route }: any) => {

    const { Domain, APIkey } = route.params

    const scrollRef = useRef(null);
    const [token, settoken] = useState('')
    const [datalocationVP, setdatalocationVP] = useState<any>([])
    const [item, setitem] = useState<any>([])
    const [first, setfirst] = useState(false)
    const apilocation = `${Domain}/location/list?apikey=${APIkey}`
    const formData = new FormData()

    const [DataSrore, setDataSrore] = useState([])

    const addSP = realmHS.objects('AddProduct')
    const navigation: any = useNavigation();

    let totalPrice = 0;
    let totalnumber = 0;

    useEffect(() => {
        addSP.addListener(listener);
        return () => {
            addSP.removeListener(listener);
        };
    }, [])

    const listener = (newTasks: any) => {
        loadAddSPData()
            .then((tasks: any) => {
                setDataSrore(tasks)
                console.log(addSP)
            })
    };

    for (const item of addSP as unknown as { id: string; soluong: number, price: number }[]) {
        totalPrice += item.price * item.soluong;
        totalnumber += item.soluong
    }

    const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    useFocusEffect(
        React.useCallback(() => {
            gettoken()
        }, [])
    )

    const gettoken = async () => {
        const userData = await retrieveUserData()
        if (userData) {
            const { session_token, point } = userData
            settoken(session_token)
            formData.append('token', token)
        } else {
            settoken('')
        }
    }


    const getAPIlocation = async () => {
        await gettoken()
        try {
            const response = await axios.post(apilocation, formData, {
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                },
            })
            if (response.status === 200) {
                const dataLocation = response.data.data
                setdatalocationVP(dataLocation)
            } else {
                throw new Error('Network response was not ok')
            }
        } catch (error) {
            console.error('There was a problem with the operation:', error)
        }
    }

    useEffect(() => {
        getAPIlocation()
        if (datalocationVP && datalocationVP.length > 0) {
            const filteredItems = datalocationVP.filter((item: any) => item.is_default === '1');
            if (filteredItems.length > 0 && !first) {
                const firstItem = filteredItems[0]
                setitem(firstItem)
                setfirst(true);
            }
        }
    }, [datalocationVP])

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20, top: 10 }}>
                    <Image source={require('../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Giỏ hàng</Text>
            </View>
            {addSP.length > 0 ? (
                <View style={styles.hienthi}>
                    <ScrollView ref={scrollRef} style={{ paddingHorizontal: 20, flex: 1 }}>
                        <FlatList
                            data={addSP}
                            keyExtractor={(item: any) => item.id.toString()}
                            scrollEnabled={false}
                            initialNumToRender={1}
                            renderItem={({ item }) => {
                                return <DeletedAnimation
                                    simultaneousHandlers={scrollRef}
                                    item={item} Domain={Domain} APIkey={APIkey} />;
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={{ width: '100%', height: 100 }} />
                    </ScrollView>
                    <View style={styles.BoxALLmonney}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../Icon/gio.png')} />
                            <View style={styles.numberSP}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{totalnumber}</Text>
                            </View>
                            <Text style={{ marginLeft: 20, color: color.organge, fontSize: 21, fontWeight: '600' }}>{formattedTotalPrice}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ScreenTTdathang', { Domain, APIkey, item })}
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
                    <Image source={require('../Icon/cartnull.png')} style={{ width: 103, height: 103 }} />
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

export default ScreenStore

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
        height: 22, width: 22,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center', justifyContent: 'center',
        position: 'absolute',
        left: 20,
        top: 15
    }
})