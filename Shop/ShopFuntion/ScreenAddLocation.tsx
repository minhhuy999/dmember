import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { SelectList } from 'react-native-dropdown-select-list';

const ScreenAddLocation = ({ navigation }: any) => {

    const navigationGoback = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [quan, setquan] = useState('1')
    const [phuong, setphuong] = useState('')

    const dataquan:any = [
        {
            key: '1',
            value: 'Quan 1'
        },
        {
            key: '2',
            value: 'Quan 2'
        },
    ]

    const dataphuong:any = {
        '1':[
            {
                key:'tp',value:'phuong Binh Tri Dong B'
            },
            {
                key:'huyen',value:'phuong binh tri dong a'
            }
        ],
        '2':[
            {
                key:'tp1',value:'phuong tan tao'
            },
            {
                key:'huyen1',value:'phuong 5'
            }
        ]
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm địa chỉ mới</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>Tên người nhận</Text>
                    <TextInput placeholder='Nhập tên người nhận' style={styles.stylemuc}></TextInput>
                </View>
                <View>
                    <Text>Số điện thoại</Text>
                    <TextInput placeholder='Nhập số điện thoại' style={styles.stylemuc}></TextInput>
                </View>
                <View>
                    <Text>Địa chỉ nhận hàng</Text>
                    <TextInput placeholder='Nhập số nhà, tên đường' style={styles.stylemuc}></TextInput>
                </View>
                <View>
                    <Text>Tỉnh/ Thành phố</Text>
                    <TextInput placeholder='Nhập tỉnh/ thành phố' style={styles.stylemuc}></TextInput>
                </View>
                <View>
                    <Text>Quận/ Huyện</Text>
                    <SelectList
                        setSelected={setquan}
                        data={dataquan}
                        placeholder='Vui lòng chọn'
                        boxStyles={styles.stylemuc}
                        dropdownStyles={{backgroundColor:'white'}}
                    />
                </View>
                <View>
                    <Text>Phường/ Xã</Text>
                    <SelectList
                        setSelected={setphuong}
                        data={dataphuong[quan]}
                        placeholder='Vui lòng chọn'
                        boxStyles={styles.stylemuc}
                        dropdownStyles={{backgroundColor:'white'}}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        tintColors={{ true: 'black', false: 'black' }}
                    />
                    <Text style={{ color: 'black' }}>Đặt làm địa chỉ mặc định</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            width: 140,
                            alignItems: 'center',
                            padding: 15,
                            borderRadius: 10,
                        }}
                        onPress={() => navigation.navigate('')}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                            Thêm
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ScreenAddLocation

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
    stylemuc:{
        backgroundColor: 'white', 
        borderRadius: 5, 
        paddingLeft: 20, 
        marginVertical: 10 
    }
})