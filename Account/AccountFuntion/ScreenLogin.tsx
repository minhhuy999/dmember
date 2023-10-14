import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, } from 'react-native'
import color from '../../Color/color'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import axios from 'axios'
import { saveUserDataToStorage } from '../../AsysncStorage/AsysncUser'

const ScreenLogin = ({ navigation, route }: any) => {

    const { APIkey, Domain } = route.params

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, seterror] = useState('')

    const formData = new FormData()
    formData.append('app_name', 'khttest')
    formData.append('username', username)
    formData.append('password', password)

    const [isPhoneInputFocused, setPhoneInputFocused] = useState(false)
    const [isPasswordInputFocused, setPasswordInputFocused] = useState(false)
    const opacityVector = useSharedValue(0)
    const scale = useSharedValue(0);

    const rStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            opacityVector.value,
            [0, 3000],
            [0, 1],
            Extrapolate.CLAMP
        )

        const translate = interpolate(
            opacityVector.value,
            [0, 3000],
            [200, 0],
            Extrapolate.CLAMP
        )

        return {
            opacity,
            transform: [{ translateX: translate }]
        }
    })

    const errorStyle = useAnimatedStyle(()=>{
        const scaleItem = interpolate(
            scale.value,
            [0,1500],
            [-100,0],
            Extrapolate.CLAMP
        )
        const opacity = interpolate(
            scale.value,
            [0, 1500],
            [0, 1],
            Extrapolate.CLAMP
        )
        return {
            opacity,
            transform:[{translateY:scaleItem}]
        }
    })

    const handleLogin = async () => {
        const loginUrl = `${Domain}/client_init/login?apikey=${APIkey}`;
        try {
            const response = await axios.post(loginUrl, formData, {
                headers: {
                    Accept: "application/x-www-form-urlencoded",
                },
            });
            if (response.status === 200 && response.data.message === 'success') {
                console.log(response.data.message);
                const userData = response.data.data;
                saveUserDataToStorage(userData);
                navigation.navigate('ScreenShop');
            } else if (response.status === 200) {
                console.log(response.data.message);
                scale.value = withSpring(1500, { duration: 2000 }, () => {
                    scale.value = withTiming(0);
                });
                seterror(response.data.message)
            }
        } catch (error) {
            console.error('Lỗi kết nối đến máy chủ:', error);
        }
    };


    useEffect(() => {
        opacityVector.value = withTiming(3000, { duration: 1500 })
        const fullURL = `${Domain}/client_init/login?apikey=${APIkey}`
        console.log('Full URL Register:', fullURL)
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: color.background, padding: 20 }}>
            <Animated.View style={[{ width: '100%',justifyContent:'center',alignItems:'center'},errorStyle]}>
                <View style={styles.boxtextanimation}>
                    <Text style={{color:'white'}}>{error}</Text>
                </View>
            </Animated.View>
            <View style={{ flexDirection: 'row', marginTop: 120, height: 200 }}>
                <View>
                    <Image
                        source={require('../../IconUser/XinChao.png')}
                        style={{ height: 22, width: 146 }}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            alignItems: 'center',
                            borderRadius: 10,
                            marginTop: 20,
                            width: 250,
                            padding: 5,
                        }}>
                        <Image
                            source={require('../../IconUser/call.png')}
                            style={{ height: 24, width: 24, margin: 10 }}
                        />
                        <View
                            style={[
                                styles.Click,
                                { display: isPhoneInputFocused ? 'flex' : 'none' },
                            ]}></View>
                        <TextInput
                            placeholder="Số điện thoại"
                            style={styles.TextLogin}
                            onFocus={() => {
                                setPhoneInputFocused(true)
                                setPasswordInputFocused(false)
                            }}
                            onBlur={() => setPhoneInputFocused(false)}
                            onChangeText={(text) => setUsername(text)}
                            value={username}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            alignItems: 'center',
                            borderRadius: 10,
                            marginTop: 15,
                            width: 250,
                            padding: 5,
                        }}>
                        <Image
                            source={require('../../IconUser/lock.png')}
                            style={{ height: 24, width: 24, margin: 10 }}
                        />
                        <View
                            style={[
                                styles.Click,
                                { display: isPasswordInputFocused ? 'flex' : 'none' },
                            ]}></View>
                        <TextInput
                            placeholder="Mật khẩu"
                            secureTextEntry={true}
                            style={styles.TextLogin}
                            onFocus={() => {
                                setPasswordInputFocused(true)
                                setPhoneInputFocused(false)
                            }}
                            onBlur={() => setPasswordInputFocused(false)}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                        />
                    </View>
                </View>
                <Animated.View style={[rStyle, { position: 'absolute', right: 18, bottom: -5 }]}>
                    <Image
                        source={require('../../Image/humanLogin.png')}
                        style={{ height: 240, width: 110, }}
                    />
                </Animated.View>
            </View>
            <View
                style={{
                    width: '100%',
                    height: 70,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        width: 150,
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 35,
                    }}
                    onPress={handleLogin}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
                <Image
                    source={require('../../Image/Vector.png')}
                    style={{ width: 33, height: 35, marginLeft: 20 }}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ScreenMissPass')}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>
                    Quên mật khẩu?
                </Text>
            </TouchableOpacity>
            <View
                style={{
                    height: 250,
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                <Text style={{ color: 'black', fontSize: 17, fontWeight: '400' }}>
                    Tôi chưa có tài khoản?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenRegister')}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: '700' }}>
                        Đăng kí
                    </Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default ScreenLogin

const styles = StyleSheet.create({
    TextLogin: {
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
    },
    Click: {
        width: 1,
        height: 16,
        backgroundColor: color.organge,
        opacity: 0.5,
    },
    boxtextanimation:{
        alignItems:'center',justifyContent:'center',
        paddingHorizontal:20,
        height:50, 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius:20
    }
})
