import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Color/color';
import { useNavigation } from '@react-navigation/native';
import realmHS from '../Realm/realmHistoryS';
import { loadAddSPData, removeSP, updateSLSP } from '../Realm/StorageServices';
import DeletedAnimation from './AnimationShop/DeletedAnimation';


const ScreenStore = ({ navigation,route }: any) => {

    const { data } = route.params 

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

    const [DataSrore, setDataSrore] = useState([])
    const addSP = realmHS.objects('AddProduct')
    const navigationGoback = useNavigation();

    const handleDeleteSP = (id: string) => {
        removeSP(id)
    };

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 20, top: 10 }}>
                    <Image source={require('../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Giỏ hàng</Text>
            </View>
            {addSP.length > 0 ? (
                <View style={styles.hienthi}>
                    <View style={{ paddingHorizontal: 20, flex: 1 }}>
                        <FlatList
                            data={addSP}
                            keyExtractor={(item: any) => item.id.toString()}
                            renderItem={({ item }) => {
                                return <DeletedAnimation item={item} data={data}/>;
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.BoxALLmonney}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../Icon/gio.png')} />
                            <Text style={{ marginLeft: 20, color: color.organge, fontSize: 21, fontWeight: '600' }}>1,590,000</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ScreenTTdathang')}
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
    }
})