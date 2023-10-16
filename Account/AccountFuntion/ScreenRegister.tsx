import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { getAPIKeyAndDomainFromStorage } from '../../AsysncStorage/AsysncAPI'

const ScreenRegister = () => {

    const navigation: any = useNavigation()
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1)
    const [APIkey, setAPIkey] = useState<string>('')
    const [Domain, setDomain] = useState<string>('')

    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [confpassword, setconfPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [referralBy, setReferralBy] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const isNumeric = /^[0-9]+$/.test(mobile);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const Item = [
        {
            id: '1',
            icon: require('../../IconUser/user.png'),
            textitem: 'Ho ten',
            value: fullname,
            onchange: setFullname,
            keyboardType: 'default',
            secureTextEntry: false,
        },
        {
            id: '2',
            icon: require('../../IconUser/mail.png'),
            textitem: 'Email',
            value: email,
            onchange: setEmail,
            keyboardType: 'email-address',
            secureTextEntry: false,
        },
        {
            id: '3',
            icon: require('../../IconUser/call.png'),
            textitem: 'Số điện thoại',
            value: mobile,
            onchange: setMobile,
            keyboardType: 'phone-pad',
            secureTextEntry: false,
        },
        {
            id: '4',
            icon: require('../../IconUser/lock.png'),
            textitem: 'Mật khẩu',
            value: password,
            onchange: setPassword,
            keyboardType: 'default',
            secureTextEntry: true,
        },
        {
            id: '5',
            icon: require('../../IconUser/lock.png'),
            textitem: 'Xác nhận mật khẩu',
            value: confpassword,
            onchange: setconfPassword,
            keyboardType: 'default',
            secureTextEntry: true,
        },
        {
            id: '6',
            icon: require('../../IconUser/userfriends.png'),
            textitem: 'Mã giới thiệu',
            value: referralBy,
            onchange: setReferralBy,
            keyboardType: 'default',
            secureTextEntry: false,
        },
    ]

    useEffect(() => {
        getAPIKeyAndDomainFromStorage({setAPIkey,setDomain})
    }, []);

    const checktext = () => {
        if (!fullname || !password || !mobile || !email) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin')
            return
        }
        else if (!isEmailValid) {
            setErrorMessage('Địa chỉ email không hợp lệ');
            return;
        }
        else if (!isNumeric) {
            setErrorMessage('Số điện thoại chỉ được chứa chữ số');
            return;
        }
        else if (password === confpassword) {
            setErrorMessage('')
        } else {
            setErrorMessage('Mật khẩu nhập lại không khớp với mật khẩu gốc')
            return
        }
    }
    const handleRegister = () => {

        checktext()

        // Tạo dữ liệu form
        const formData = new FormData();
        formData.append('app_name', 'khttest');
        formData.append('fullname', fullname);
        formData.append('password', password);
        formData.append('mobile', mobile);
        formData.append('email', email);
        formData.append('referral_by', referralBy);

        // Gửi yêu cầu đăng ký qua API
        fetch(`${Domain}/client_init/register?apikey=${APIkey}`, {
            method: 'POST',
            headers: {
                Accept: 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then((response: any) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'Số điện thoại đã tồn tại, vui lòng chọn số điện thoại khác.' 
                || data.message === 'Mã giới thiệu không tồn tại.'
                || data.message === 'Vui lòng nhập số điện thoại.') {
                    setApiErrorMessage(data.message);
                } else {
                    setApiErrorMessage('');
                    console.log('Registration success:', data);
                    navigation.navigate('ScreenLogin');
                }
            })
            .catch((error) => {
                console.error('There was a problem with the registration:', error);
            });
    };

    const renderItem = ({ item, index }: any) => {
        const isItemSelected = selectedItemIndex === index
        const isInvalid = !item.value;

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.ItemInput}>
                    <Image source={item.icon} style={{ width: 24, height: 24, marginRight: 20 }} />
                    {isItemSelected && <View style={styles.Click}></View>}
                    <TextInput placeholder={item.textitem} style={{ color: 'black', height: 50, flex: 1 }}
                        onFocus={() => setSelectedItemIndex(index)}
                        onBlur={() => {
                            setSelectedItemIndex(-1)
                        }}
                        value={item.value}
                        onChangeText={(text) => item.onchange(text)}
                        keyboardType={item.keyboardType}
                        secureTextEntry={item.secureTextEntry}>
                    </TextInput>
                </View>
                {isInvalid && (
                    <Text style={{ color: 'red', marginBottom: 10, marginLeft: 20 }}>
                        Vui lòng điền thông tin {item.textitem.toLowerCase()}
                    </Text>
                )}
            </View>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={{ width: '100%', height: 80, alignItems: 'center', paddingTop: 20 }}>
                <Text style={{ color: 'black', fontSize: 21, fontWeight: '600' }}>Thông tin đăng kí</Text>
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
                    {errorMessage || apiErrorMessage}
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                <View style={{ width: '100%' }} >
                    <FlatList
                        data={Item}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        scrollEnabled={false}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            width: 150,
                            alignItems: 'center',
                            padding: 15,
                            borderRadius: 35,
                        }} onPress={handleRegister}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                            Đăng kí
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        height: 70,
                        width: '100%',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: '400' }}>
                        Tôi đã có tài khoản?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: 'black', fontSize: 17, fontWeight: '700' }}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ScreenRegister

const styles = StyleSheet.create({
    backgr: {
        backgroundColor: color.background,
        flex: 1,
        paddingHorizontal: 20,
    },
    Click: {
        width: 1,
        height: 16,
        backgroundColor: color.organge,
        opacity: 0.5,
    },
    ItemInput: {
        backgroundColor: 'white',
        height: 65, width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3
    }
})