import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import realmHS from '../../Realm/realmHistoryS';
import { loadAddMember, removeMB } from '../../Realm/StorageServices';

const ScreenChTienB2 = ({ navigation }: any) => {

    const navigationGoback = useNavigation();
    const [selectedCategory1, setSelectedCategory1] = useState('');
    const [DataMemBer, setDataMemBer] = useState([])
    const [inputValue, setInputValue] = useState('');
    const AddMB = realmHS.objects('AddMember')

    useEffect(() => {
        AddMB.addListener(listener)
        return () => {
            AddMB.removeListener(listener)
        }
    }, [])

    const listener = (newTasks: any) => {
        loadAddMember()
            .then((tasks: any) => {
                setDataMemBer(tasks)
                console.log(AddMB)
            })
    }
    

    const datamember = [
        {
            id: '1',
            avata: require('../../Image/LKN.png'),
            name: 'Lê Kim Ngân',
            phone: '0839020007',
        },
        {
            id: '2',
            avata: require('../../Image/Dstore.png'),
            name: 'Thanh toán Dstore Hồ Chí Minh',
            phone: '1500015000',
        },
        {
            id: '3',
            avata: require('../../Image/Global.png'),
            name: 'Dstore Global',
            phone: '190070030',
        },
        {
            id: '4',
            avata: require('../../Image/LAU.png'),
            name: 'Lê Ánh Uyên',
            phone: '0839020007',
        },
    ]

    const renderAddmember = ({ item, index }: any) => {
        const member: any = datamember.find((sp) => sp.id === item.id);
        const truncatedName = member.name.length > 12 ? member.name.slice(0, 12) + '...' : member.name;
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 70, marginRight: 2 }}>
                <Image source={member.avata} style={{ width: 54, height: 54, borderRadius: 38 }} />
                <Text style={{ color: 'black', fontSize: 10, fontWeight: '500' }}>{truncatedName}</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 2 }} onPress={()=>handleDeleteMB(item.id)}>
                    <Image source={require('../../Icon/X.png')} style={{ width: 10, height: 10 }} />
                </TouchableOpacity>
            </View>
        )
    }


    const handleDeleteMB = (id: string) => {
        removeMB(id)
    };


    const handleCategorySelect1 = (category: any) => {
        setSelectedCategory1(category);
        setInputValue(category);
    };

    const handleTextInputChange = (text: string) => {
        setSelectedCategory1('');
        setInputValue(text);
    };

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Chuyển Dcash</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '400' }}>Người nhận</Text>
                <View>
                    <FlatList
                        data={AddMB}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={renderAddmember}
                        horizontal={true}
                    />
                </View>
                <Text style={{ marginVertical: 10, color: 'black', fontSize: 17, fontWeight: '400', marginTop: 40 }}>Nhập số tiền muốn chuyển</Text>
                <View>
                    <TextInput style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: 7, marginVertical: 10, color: 'black', fontSize: 21, fontWeight: '500' }}
                        value={inputValue}
                        onChangeText={handleTextInputChange}>
                    </TextInput>
                </View>
                <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity>
                        <TouchableOpacity style={[styles.touchMonney, selectedCategory1 === "500.000" && styles.touchMonneyClick]}
                            onPress={() => handleCategorySelect1("500.000")}>
                            <Text style={styles.MonneyText}>500.000</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TouchableOpacity style={[styles.touchMonney, selectedCategory1 === "50.000" && styles.touchMonneyClick]}
                            onPress={() => handleCategorySelect1("50.000")}>
                            <Text style={styles.MonneyText}>50.000</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TouchableOpacity style={[styles.touchMonney, selectedCategory1 === "5.000" && styles.touchMonneyClick]}
                            onPress={() => handleCategorySelect1("5.000")}>
                            <Text style={styles.MonneyText}>5.000</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginVertical: 10, color: 'black', fontSize: 17, fontWeight: '400' }}>Lời nhắn</Text>
                <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 10, borderStyle: 'dashed', borderWidth: 1 }}>
                    <TextInput multiline={true}></TextInput>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ScreenXacNhanCt')} style={{ backgroundColor: 'black', width: 150, padding: 15, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Text style={{ color: 'white' }}>Chuyển</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

export default ScreenChTienB2

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20,
    },
    BoxTitile: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 20
    },
    title: {
        color: 'black',
        fontSize: 21,
        fontWeight: '500'
    },
    MonneyText: {
        color: 'black', fontSize: 20, fontWeight: '500'
    },
    touchMonney: {
        backgroundColor: color.whitelow,
        width: 105,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
    },
    touchMonneyClick: {
        backgroundColor: color.whitelow,
        width: 105,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        elevation: 5
    }
})