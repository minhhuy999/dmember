import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { SelectList } from 'react-native-dropdown-select-list';

const ScreenDsviec = ({ navigation }: any) => {

    const navigationGoback = useNavigation();
    const [selectedCategory2, setSelectedCategory2] = useState('Việc được giao');
    const [ViewSearch, setViewSearch] = useState(false)
    const [quan, setquan] = useState('')

    const dataquan: any = [
        {
            key: '1',
            value: 'Quan 1'
        },
        {
            key: '2',
            value: 'Quan 2'
        },
    ]

    const datawork = [
        {
            id: '1',
            seri: '#1603',
            name: 'Set camera A69 - Nông',
            dayend: '18/05/2022',
            tiendo: 'Hoàn thành'
        },
        {
            id: '2',
            seri: '#1603',
            name: 'Dời TV lên phòng họp VIP7',
            dayend: '18/05/2022',
            tiendo: 'Đang xử lí'
        },
        {
            id: '3',
            seri: '#1603',
            name: 'Dời TV lên phòng họp VIP7',
            dayend: '18/05/2022',
            tiendo: 'Chờ xử lí'
        },
        {
            id: '4',
            seri: '#1603',
            name: 'Set camera A69 - Nông',
            dayend: '18/05/2022',
            tiendo: 'Hoàn thành'
        },
        {
            id: '5',
            seri: '#1603',
            name: 'Dời TV lên phòng họp VIP7',
            dayend: '18/05/2022',
            tiendo: 'Đang xử lí'
        },
        {
            id: '6',
            seri: '#1603',
            name: 'Dời TV lên phòng họp VIP7',
            dayend: '18/05/2022',
            tiendo: 'Chờ xử lí'
        },
    ]

    const handleCategorySelect2 = (category: any) => {
        setSelectedCategory2(category);
    };

    const renderwork = ({ item, index }: any) => {
        let textColor = color.organge;
        if (item.tiendo === 'Hoàn thành') {
            textColor = color.green;
        }
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ScreenDtcongviec')} style={styles.renderwork}>
                <View style={{ width: '75%' }}>
                    <Text style={{ paddingVertical: 5, color: 'black', fontSize: 15, fontWeight: '500' }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: color.gray, fontSize: 13, fontWeight: '500' }}>{item.seri}</Text>
                        <Text style={{ color: 'black', fontSize: 13, fontWeight: '400' }}>Kết thúc:  {item.dayend}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{item.tiendo}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {ViewSearch
                ? <View style={styles.backgr}>
                    <View style={styles.BoxTitile}>
                        <TouchableOpacity onPress={() => setViewSearch(false)} style={{ position: 'absolute', right: 0, top: 10, }}>
                            <Image source={require('../../Icon/xsmall.png')} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>Chọn chi nhánh cần xem</Text>
                        <SelectList
                            setSelected={setquan}
                            data={dataquan}
                            placeholder='Tất cả chi nhánh'
                            boxStyles={styles.boxoption}
                            dropdownStyles={{ backgroundColor: 'white' }}
                        />
                    </View>
                    <View>
                        <Text>Chọn phòng ban</Text>
                        <SelectList
                            setSelected={setquan}
                            data={dataquan}
                            placeholder='Phòng công nghệ'
                            boxStyles={styles.boxoption}
                            dropdownStyles={{ backgroundColor: 'white' }}
                        />
                    </View>
                    <View>
                        <Text>Loại công việc</Text>
                        <SelectList
                            setSelected={setquan}
                            data={dataquan}
                            placeholder='Kỹ thuật'
                            boxStyles={styles.boxoption}
                            dropdownStyles={{ backgroundColor: 'white' }}
                        />
                    </View>
                    <View>
                        <Text>Trạng thái công việc</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }}>
                            <Text style={styles.texttiendo}>Đã hoàn thành</Text>
                            <Text style={styles.texttiendo}>Đã xác nhận</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                            <Text style={{ backgroundColor: 'white', padding: 10, width: '40%', textAlign: 'center', borderRadius: 30 }}>Đang xử lí</Text>
                            <Text style={{ backgroundColor: 'white', padding: 10, width: '40%', textAlign: 'center', borderRadius: 30, marginLeft: 10 }}>Chờ xử lí</Text>
                        </View>
                    </View>
                    <Text style={{ marginVertical: 10 }}>Thời gian</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 100, }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'black',
                                width: 180,
                                alignItems: 'center',
                                padding: 15,
                                borderRadius: 10,
                            }}
                            onPress={() => navigation.navigate('')}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                                Lưu
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : <View style={styles.backgr}>
                    <View style={styles.BoxTitile}>
                        <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10, }}>
                            <Image source={require('../../Icon/arrowback.png')} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Danh sách công việc</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10, }}>
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', width: '88%', paddingLeft: 20, borderRadius: 5, alignItems: 'center' }}>
                            <Image source={require('../../Icon/search.png')} />
                            <TextInput placeholder='Tên công việc/ Người tạo' style={{ paddingLeft: 10 }}></TextInput>
                        </View>
                        <TouchableOpacity onPress={() => setViewSearch(true)}>
                            <Image source={require('../../Icon/locds.png')} style={{ height: 31, width: 31, marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', marginVertical: 20, width: '100%', borderRadius: 45 }}>
                        <TouchableOpacity style={[styles.textLocation, selectedCategory2 === "Việc được giao" && styles.selectedTextlLocation]}
                            onPress={() => handleCategorySelect2("Việc được giao")}>
                            <Text style={[styles.colorText, selectedCategory2 === "Việc được giao" && styles.selectedcolortext]}>Việc được giao</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.textLocation, selectedCategory2 === "Việc đã giao" && styles.selectedTextlLocation]}
                            onPress={() => handleCategorySelect2("Việc đã giao")}>
                            <Text style={[styles.colorText, selectedCategory2 === "Việc đã giao" && styles.selectedcolortext]}>Việc đã giao</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        {selectedCategory2 === "Việc được giao" ? (
                            <FlatList
                                data={datawork}
                                keyExtractor={(item) => item.id}
                                renderItem={renderwork}
                            />
                        ) : (
                            <View>
                            </View>
                        )}
                    </View>
                </View>
            }
        </View>
    )
}

export default ScreenDsviec

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20
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
    renderwork:{
        paddingVertical: 10, paddingHorizontal: 20, 
        backgroundColor: 'white', 
        width: '100%', 
        borderRadius: 10, 
        flexDirection: 'row', 
        marginBottom: 10, 
        alignItems: 'center', justifyContent: 'space-between', 
        elevation: 2 
    },
    boxoption:{
        backgroundColor: 'white', 
        borderRadius: 5, 
        paddingLeft: 20, 
        marginVertical: 10
    },
    texttiendo:{
        backgroundColor: 'white', 
        padding: 10, 
        width: '48%', 
        textAlign: 'center', 
        borderRadius: 30
    }
})