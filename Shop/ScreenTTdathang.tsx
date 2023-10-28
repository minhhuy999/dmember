import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Color/color';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import realmHS from '../Realm/realmHistoryS';
import ListitemTTdathang from './AnimationShop/ListitemTTdathang';
import axios from 'axios';
import { retrieveUserData } from '../AsysncStorage/AsysncUser';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { removeAllData } from '../Realm/StorageServices';


const { height, width } = Dimensions.get('window');

const ScreenTTdathang = ({ route }: any) => {

    const navigation: any = useNavigation()
    const { Domain, APIkey } = route.params
    const addSP = realmHS.objects('AddProduct')

    const items = Array.from(addSP).map((item: any) => ({
        amount: item.soluong.toString(),
        price: item.price.toString(),
        product_id: item.id,
    }));

    const opacity = useSharedValue(0)
    const [showAnimatedBox, setShowAnimatedBox] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [nameTT, setnameTT] = useState('Thùy Linh')
    const [phoneTT, setphoneTT] = useState('0909078111')
    const [address, setaddress] = useState('256 Bạch Đằng, Phường 24, Q.Bình Thạnh, Thành phố Hồ Chí Minh')
    const [checked, setChecked] = React.useState('first');
    const [token, settoken] = useState('')

    const CartUrl = `${Domain}/client_order/checkout?apikey=${APIkey}`
    const formData = new FormData()
    formData.append('app_name', 'khttest')

    let totalPrice = 0;
    for (const item of addSP as unknown as { id: string; soluong: number, price: number }[]) {
        totalPrice += item.price * item.soluong;
    }
    const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    useEffect(() => {
        gettoken()
    }, [token])

    const gettoken = async () => {
        const userData = await retrieveUserData()
        if (userData) {
            const { session_token } = userData
            settoken(session_token)
            formData.append('token', token)
            formData.append('ship_name', nameTT)
            formData.append('ship_mobile', phoneTT)
            formData.append('ship_address', address)
            formData.append('ship_note', '')
            formData.append('lItems', JSON.stringify(items))
        } else {
            settoken('')
        }
    }

    const get = () => {
        if (token == '')
            console.log('vui long dang nhap');
        else {
            handleCart()
        }
    }

    const handleCart = async () => {
        opacity.value = withTiming(1000)
        setShowAnimatedBox(false)
        setIsPlaying(true)
        try {
            const response = await axios.post(CartUrl, formData)
            if (response.status == 200) {
                console.log(response.data.message)
                console.log(JSON.stringify(response.data))
            }
            if (response.data.message) {
                opacity.value = withTiming(0);
                setShowAnimatedBox(true);
                setIsPlaying(false)
                removeAllData()
                navigation.navigate('ScreenShop')
            }
            else {
                console.log('Sai', response.data);
                console.log(response.data.message)
            }
        } catch (error) {
            console.error('Lỗi kết nối đến máy chủ:', error)
        }
    }

    const rStyle = useAnimatedStyle(() => {
        const opacity1 = interpolate(
            opacity.value,
            [0, 1000],
            [0, 1],
            Extrapolate.CLAMP
        )
        return {
            opacity: opacity1,
            display: opacity.value === 0 ? 'none' : 'flex',
        }
    })

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Thông tin đặt hàng</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenDSdiachi')} style={styles.buttonDc}>
                    <Text style={styles.muc}>Địa chỉ nhận hàng</Text>
                    <Image source={require('../Icon/arrow.png')} style={{ height: 13, width: 7, marginRight: 5 }} />
                </TouchableOpacity>
                <View style={styles.boxlocation}>
                    <Image source={require('../Icon/location.png')} style={{ height: 35, width: 35, borderRadius: 35 }} />
                    <View style={{ paddingHorizontal: 25 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text1}>{nameTT}</Text>
                            <View style={{ backgroundColor: 'black', height: 20, width: 1, marginHorizontal: 10 }}></View>
                            <Text style={styles.Text1}>{phoneTT}</Text>
                        </View>
                        <Text style={styles.Text2}>{address}</Text>
                    </View>
                </View>
                <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '400' }}>Hình thức thanh toán</Text>
                <View style={styles.Boxcheck}>
                    <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                    />
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.Text1}>Thanh toán bằng ví Dcash</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text2}>Số dư hiện tại: </Text>
                            <Text style={{ color: color.green, fontSize: 12, fontWeight: '400' }}>434,403</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.Boxcheck}>
                    <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                    />
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.Text1}>Thanh toán bằng ví Dpoint</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text2}>Số dư hiện tại: </Text>
                            <Text style={{ color: color.green, fontSize: 12, fontWeight: '400' }}>434,403</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={styles.muc}>Sản phẩm chọn mua</Text>
                    <Image source={require('../Icon/arrow.png')} style={{ height: 13, width: 7, marginRight: 5 }} />
                </View>
                <View>
                    <FlatList
                        data={addSP}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={({ item }) => {
                            return <ListitemTTdathang item={item} APIkey={APIkey} Domain={Domain} />
                        }}
                        scrollEnabled={false}
                    />
                </View>
                <Text style={styles.chucnang}>Ghi chú</Text>
                <View style={styles.boxnote}>
                    <TextInput multiline={true}></TextInput>
                </View>
                <Text style={styles.chucnang}>Thanh toán</Text>
                <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                    <Image source={require('../Image/backgrdathang.png')} style={{ height: 120, width: 345 }} />
                    <View style={{ width: '100%', paddingHorizontal: 30, position: 'absolute', paddingTop: 20 }}>
                        <View style={styles.itemthanhtoan}>
                            <Text style={styles.Text1TT}>Tổng cộng:</Text>
                            <Text style={{ color: color.organge, fontSize: 17, fontWeight: '700' }}>{formattedTotalPrice}</Text>
                        </View>
                        <View style={styles.itemthanhtoan}>
                            <Text style={styles.Text2TT}>Chiết khấu:</Text>
                            <Text style={{ color: color.blue, fontSize: 15, fontWeight: '500' }}>790,000</Text>
                        </View>
                        <View style={styles.itemthanhtoan}>
                            <Text style={styles.Text2TT}>Hoa hồng:</Text>
                            <Text style={{ color: color.green, fontSize: 15, fontWeight: '500' }}>79,000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                <TouchableOpacity
                    style={styles.btThemHang}
                    onPress={get}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                        Đặt hàng
                    </Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[showAnimatedBox ? {} : { display: 'none' }, {
                width: width, height: height, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute',
                justifyContent: 'center', alignItems: 'center'
            }, rStyle]}>
                <Animated.View style={[
                    { width: 200, height: 120, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }
                    ,]}>
                    {isPlaying && (
                        <LottieView style={{ width: 70, height: 70 }} source={require('../LottieView/animation_lo83112w.json')} autoPlay />)}
                </Animated.View>
            </Animated.View>
        </View>
    )
}

export default ScreenTTdathang

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
    muc: {
        fontSize: 17,
        fontWeight: '500',
        color: 'black'
    },
    Text1: {
        fontSize: 13,
        fontWeight: '700',
        color: 'black'
    },
    Text2: {
        fontSize: 12,
        fontWeight: '500',
        color: 'black'
    },
    Boxcheck: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    chucnang: {
        marginVertical: 10, color: 'black', fontSize: 17, fontWeight: '400'
    },
    boxnote: {
        backgroundColor: 'white', width: '100%', borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, padding: 20
    },
    btThemHang: {
        backgroundColor: 'black',
        width: 200,
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
    },
    itemthanhtoan: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10
    },
    Text1TT: {
        color: 'black', fontSize: 17, fontWeight: '700'
    },
    Text2TT: {
        color: 'black', fontSize: 15, fontWeight: '400'
    },
    buttonDc: {
        justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingVertical: 10
    },
    boxlocation: {
        padding: 10, backgroundColor: 'white', width: '100%', height: 80, borderRadius: 10, flexDirection: 'row', marginTop: 10
    }
})