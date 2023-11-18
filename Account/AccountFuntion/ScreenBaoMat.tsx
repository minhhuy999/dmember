import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const ScreenHistoryTH = () => {

    const navigation:any = useNavigation();
    const apinew = useSelector((state: any) => state.app.apinew);

    useEffect(() => {
        console.log(apinew)
    }, []);

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Thiết lập bảo mật</Text>
            </View>
            <View style={{ backgroundColor: 'white', padding: 20, flexDirection: 'row', borderRadius: 10, marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.Textbm}>Sử dụng vân tay</Text>
                <Switch
                    trackColor={{ false: "black", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={styles.switch}
                />
            </View>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginTop: 20 }}>
                <Text style={styles.Textbm}>Đổi mật khẩu</Text>
                <TextInput placeholder='Mật khẩu cũ' style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 20, marginTop: 20 }}></TextInput>
                <TextInput placeholder='Mật khẩu mới' style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 20, marginTop: 20 }}></TextInput>
                <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, width: 100, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Thay đổi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ScreenHistoryTH

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
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    Textbm:{
        fontSize:17,
        fontWeight:'500',
        color:'black'
    }
})