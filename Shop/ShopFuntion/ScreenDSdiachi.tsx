import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const ScreenDSdiachi = ({ navigation }: any) => {

    const navigationGoback = useNavigation();
    const [selectedCategory2, setSelectedCategory2] = useState('Văn phòng');

    const dataLocation = [
        {
            id: '1',
            name: 'HN',
            phone: '0909078111',
            location: '1196 đường 3/2, Phường 8, Quận 11, Thành phố Hồ Chí Minh'
        },
        {
            id: '2',
            name: 'Thùy Linh',
            phone: '0909078111',
            location: '256 Bạch Đằng, Phường 24, Q.Bình Thạnh, Thành phố Hồ Chí Minh'
        },
        {
            id: '3',
            name: 'Showroom 3/2',
            phone: '0909078111',
            location: '1196 đường 3/2, Phường 8, Quận 11, Thành phố Hồ Chí Minh'
        },
    ]

    const handleCategorySelect2 = (category: any) => {
        setSelectedCategory2(category);
    };

    const renderLocation = ({ item, index }: any) => {
        return (
            <View style={styles.boxrenderlocation}>
                <Image source={require('../../Icon/location.png')} style={{ height: 35, width: 35, borderRadius: 35 }} />
                <View style={{ paddingRight: 30, marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Text3}>{item.name}</Text>
                        <View style={{ backgroundColor: 'black', height: 20, width: 1, marginHorizontal: 10 }}></View>
                        <Text style={styles.Text3}>{item.phone}</Text>
                    </View>
                    <Text style={styles.Text2}>{item.location}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Danh sách địa chỉ</Text>
            </View>
            <View style={styles.boxmuc}>
                <TouchableOpacity style={[styles.textLocation, selectedCategory2 === "Văn phòng" && styles.selectedTextlLocation]}
                    onPress={() => handleCategorySelect2("Văn phòng")}>
                    <Text style={[styles.colorText, selectedCategory2 === "Văn phòng" && styles.selectedcolortext]}>Văn phòng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.textLocation, selectedCategory2 === "Showroom" && styles.selectedTextlLocation]}
                    onPress={() => handleCategorySelect2("Showroom")}>
                    <Text style={[styles.colorText, selectedCategory2 === "Showroom" && styles.selectedcolortext]}>Showroom</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                {selectedCategory2 === "Showroom" ? (
                    <FlatList
                        data={dataLocation}
                        keyExtractor={(item) => item.id}
                        renderItem={renderLocation}
                    />
                ) : (
                    <View>
                    </View>
                )}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center',padding:20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        width: 150,
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 10,
                    }}
                    onPress={() => navigation.navigate('ScreenAddLocation')}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                        Thêm địa chỉ mới
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScreenDSdiachi

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
    Text2: {
        fontSize: 12,
        fontWeight: '500',
        color: 'black'
    },
    Text3: {
        color: 'black',
        fontSize: 13,
        fontWeight: '500'
    },
    textLocation: {
        backgroundColor: 'white',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 45
    },
    selectedTextlLocation: {
        backgroundColor: 'black',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 45
    },
    colorText: {
        color: 'black'
    },
    selectedcolortext: {
        color: 'white'
    },
    boxrenderlocation:{
        paddingVertical: 10, paddingHorizontal: 20, 
        backgroundColor: 'white', 
        width: '100%', 
        borderRadius: 10, 
        flexDirection: 'row', 
        marginBottom: 10 
    },
    boxmuc:{
        flexDirection: 'row', 
        backgroundColor: 'white', 
        marginVertical: 20, 
        width: '100%', 
        borderRadius: 45
    }
})