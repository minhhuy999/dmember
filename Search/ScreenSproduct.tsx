import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import color from '../Color/color';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const ScreenSproduct = ({ navigation }: any) => {

    const navigationGoback = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [showList, setShowList] = useState(false);
    const textInputRef = useRef<TextInput | null>(null);

    const SanPham = [
        {
            id: '1',
            img: require('../SanPham/NTTpink.png'),
            name: 'Nước tẩy trang Dearanchy Purifying Pure Cleansing 30ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '2',
            img: require('../SanPham/NTTred.png'),
            name: 'Dầu tẩy trang Dearanchy Purifying Pure Cleansing 30ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '3',
            img: require('../SanPham/SRMdermaPH.png'),
            name: 'Sữa rửa mặt tạo bọt Dearanchy Purifying Derma PH Care 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '4',
            img: require('../SanPham/Gel.png'),
            name: 'Gel rửa mặt cho da dầu mụn 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '5',
            img: require('../SanPham/SRMvita.png'),
            name: 'Sữa rửa mặt vitamin làm trắng Dearanchy Moisture Vita 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '6',
            img: require('../SanPham/SRMvita.png'),
            name: 'Sữa rửa mặt vitamin làm trắng Dearanchy Moisture Vita 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '7',
            img: require('../SanPham/Gel.png'),
            name: 'Gel rửa mặt cho da dầu mụn 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
    ]

    const dataHistory = [
        {
            id: '1',
            name: 'Nước hoa hồng'
        },
        {
            id: '2',
            name: 'Kem nền'
        },
        {
            id: '3',
            name: 'Viên uống giảm mỡ'
        },
    ]

    const renderSP = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailProduct')}>
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
                    <View style={styles.Add}>
                        <Text style={{ color: 'white' }}>+</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderHistory = ({ item, index }: any) => {
        return (
            <View style={styles.itemrenderHistoty}>
                <Image source={require('../Icon/historySearch.png')} />
                <Text style={{ marginLeft: 20 }}>{item.name}</Text>
            </View>
        )
    }

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);

    return (
        <View style={styles.backgr}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <View style={styles.BoxSearch}>
                    <Image source={require('../Icon/search.png')} />
                    <TextInput value={searchText}
                        onChangeText={(text) => { setSearchText(text.toLowerCase()); setShowList(!!text); }}
                        ref={textInputRef} style={{ paddingLeft: 10 }}>
                    </TextInput>
                </View>
                <TouchableOpacity onPress={() => navigationGoback.goBack()}>
                    <Image source={require('../Icon/X.png')} style={{ height: 17, width: 17, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>Tìm kiếm gần đây</Text>
                    <Text style={{ color: 'red', fontSize: 15, fontWeight: '500' }}>Xóa</Text>
                </View>
                <View>
                    <FlatList
                        data={dataHistory}
                        keyExtractor={(item) => item.id}
                        renderItem={renderHistory}
                        scrollEnabled={false}
                    />
                </View>
                <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '400' }}>Kết quả liên quan</Text>
                <View style={{ width: '100%' }}>
                    {showList && (
                        <FlatList
                            data={SanPham.filter((item) =>
                                item.name.toLowerCase().includes(searchText)
                            )}
                            keyExtractor={(item) => item.id}
                            renderItem={renderSP}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            scrollEnabled={false}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

export default ScreenSproduct

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20,
    },
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
    BoxSearch:{
        flexDirection: 'row', 
        backgroundColor: 'white', 
        width: '90%', 
        paddingLeft: 20, paddingVertical: 3, 
        borderRadius: 10, 
        alignItems: 'center' 
    },
    itemrenderHistoty:{
        padding: 10, 
        backgroundColor: 'white', 
        flexDirection: 'row', 
        borderRadius: 5, 
        marginBottom: 5 
    }
})