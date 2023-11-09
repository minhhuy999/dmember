import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import color from '../../Color/color';

const ScreenQRcode = ({ route }: any) => {

    const { QRcode } = route.params
    const navigation: any = useNavigation()

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Hồ sơ cá nhân</Text>
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingBottom:100}}>
                <Text style={{fontSize:20,fontWeight:'bold',marginBottom:20}}>Đây là mã QR của bạn</Text>
                <View>
                    {QRcode == '' ? <View style={{backgroundColor:'gray',width:300,height:300,borderRadius:10}}/> :
                    <Image source={{uri:QRcode}} style={{width:300,height:300,borderRadius:10}}/>}
                </View>
            </View>
        </View>
    )
}

export default ScreenQRcode

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
})