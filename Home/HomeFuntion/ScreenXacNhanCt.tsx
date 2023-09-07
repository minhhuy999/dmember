import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const ScreenXacNhanCt = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Thông tin chuyển khoản</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>Ngân hàng</Text>
                    <TextInput placeholder='Nhập Ngân hàng' style={styles.textinput}></TextInput>
                </View>
                <View>
                    <Text>Chi nhánh</Text>
                    <TextInput placeholder='Nhập Chi nhánh' style={styles.textinput}></TextInput>
                </View>
                <View>
                    <Text>Số tài khoản</Text>
                    <TextInput placeholder='Nhập Số tài khoản' style={styles.textinput}></TextInput>
                </View>
                <View>
                    <Text>Tên người thụ hưởng</Text>
                    <TextInput placeholder='Nhập Tên người thụ hưởng' style={styles.textinput}></TextInput>
                </View>
                <View>
                    <Text>Số tiền chuyển khoản</Text>
                    <TextInput style={styles.inputmonney}></TextInput>
                </View>
                <View>
                    <Text>Nội dung chuyển khoản</Text>
                    <View style={styles.noteck}>
                        <TextInput style={{ backgroundColor: 'white',flex:1 }}></TextInput>
                        <Image source={require('../../Icon/copy.png')}/>
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            width: 160,
                            alignItems: 'center',
                            padding: 15,
                            borderRadius: 10,
                        }}
                        onPress={() => navigation.navigate('')}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                            Xác nhận
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ScreenXacNhanCt

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
    textinput:{
        backgroundColor: 'white', 
        borderRadius: 5, 
        paddingLeft: 20, 
        marginVertical: 10
    },
    inputmonney:{
        backgroundColor: 'white', 
        borderRadius: 5, 
        paddingLeft: 20, 
        marginVertical: 10, 
        textAlign: 'center' 
    },
    noteck:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        borderRadius:5,
        paddingHorizontal:15,
        marginVertical:10
    }
})