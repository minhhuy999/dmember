import { StyleSheet, Text, TextInput, View , Image, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenMissPass = () => {
    
    const navigation = useNavigation();

    return (
        <View style={{flex:1,backgroundColor:color.background,paddingHorizontal:20}}>
            <View style={{width:'100%',height:100,alignItems:'center',justifyContent:'flex-end',paddingBottom:20}}>
                <Text style={{color:'black',fontSize:21,fontWeight:'600'}}>Lấy lại mật khẩu</Text>
            </View>
            <View style={{paddingVertical:10,width:'100%'}}>
                <Text style={{paddingRight:12,color:'black',fontSize:20,fontWeight:'400'}}>Vui lòng nhập email hoặc số điện thoại để lấy lại mật khẩu</Text>
            </View>
            <View style={{width:'100%'}}>
                <View style={{flexDirection:'row',backgroundColor:'white',alignItems:'center',borderRadius:10,paddingVertical:5}}>
                    <Image source={require('../../IconUser/mail.png')} style={{marginHorizontal:20}}/>
                    <TextInput placeholder='Nhap Email' style={{flex:1,color:'black'}}></TextInput>
                    <Image source={require('../../IconUser/ArrowLong.png')} style={{width:30,height:10,marginHorizontal:20}}/>
                </View>
            </View>
            <View style={{width:'100%',height:180,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{backgroundColor:'black',width:200,borderRadius:35,padding:15}}>
                    <Text style={{color:'white',textAlign:'center',fontSize:15,fontWeight:'600'}}>Trở về trang đang nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScreenMissPass

const styles = StyleSheet.create({})