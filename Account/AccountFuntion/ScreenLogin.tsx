import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, } from 'react-native';
import color from '../../Color/color';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';

const ScreenLogin = ({ navigation }: any) => {
    const [isPhoneInputFocused, setPhoneInputFocused] = useState(false);
    const [isPasswordInputFocused, setPasswordInputFocused] = useState(false);
    const opacityVector = useSharedValue(0)

    const rStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            opacityVector.value,
            [0, 3000],
            [0, 1],
            Extrapolate.CLAMP
        );

        const translate = interpolate(
            opacityVector.value,
            [0,3000],
            [200,0],
            Extrapolate.CLAMP
        )

        return {
            opacity,
            transform: [{ translateX:translate }]
        };
    });

    useEffect(() => {
        opacityVector.value = withTiming(3000,{duration:1500});
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: color.background, padding: 20 }}>
            <View style={{ flexDirection: 'row', marginTop: 150, height: 200 }}>
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
                                setPhoneInputFocused(true);
                                setPasswordInputFocused(false);
                            }}
                            onBlur={() => setPhoneInputFocused(false)}
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
                                setPasswordInputFocused(true);
                                setPhoneInputFocused(false);
                            }}
                            onBlur={() => setPasswordInputFocused(false)}
                        />
                    </View>
                </View>
                <Animated.View style={[rStyle,{position: 'absolute', right: 18, bottom: -5}]}>
                    <Image
                        source={require('../../Image/humanLogin.png')}
                        style={{ height: 240, width: 110,}}
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
                    onPress={() => navigation.navigate('HomeScreen')}>
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
    );
};

export default ScreenLogin;

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
});
