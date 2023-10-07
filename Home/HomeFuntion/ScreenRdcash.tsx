import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const ScreenRdcash = ({ navigation }: any) => {

    const navigationGoback = useNavigation();
    const scale = useSharedValue(0);
    const scaleacess = useSharedValue(0);
    const [showAnimatedBox, setShowAnimatedBox] = useState(false);
    const [showAnimatedBoxacesss, setShowAnimatedBoxacess] = useState(false);

    const handlePress = () => {
        const inputValueNumber = parseFloat(inputValue.replace(/,/g, '')); // Chuyển đổi giá trị TextInput thành số

        if (!isNaN(inputValueNumber) && inputValueNumber < 50000) {
            scale.value = withSpring(1);
            setShowAnimatedBox(true);
        }
        else if(!isNaN(inputValueNumber) && inputValueNumber == 0){

        } 
        else {
            scaleacess.value = withSpring(1);
            setShowAnimatedBoxacess(true);
        }
    };

    const unhandlePress = () => {
        scale.value = withSpring(0)
        scaleacess.value = withSpring(0)
    };

    const [selectedCategory1, setSelectedCategory1] = useState('');
    const [inputValue, setInputValue] = useState('0');

    const handleCategorySelect1 = (category: any) => {
        setSelectedCategory1(category);
        setInputValue(category);
    };

    const handleTextInputChange = (text: string) => {
        setSelectedCategory1('');
        setInputValue(text);
    };


    const rStyle = useAnimatedStyle(() => ({
        transform: [{ scale: Math.max(scale.value, 0) }],
        opacity: interpolate(scale.value, [0, 1], [0, 1], Extrapolate.CLAMP), 
        display: scale.value === 0 ? 'none' : 'flex',
    }));

    const rStyleacess = useAnimatedStyle(() => ({
        transform: [{ scale: Math.max(scaleacess.value, 0) }],
        opacity: interpolate(scaleacess.value, [0, 1], [0, 1], Extrapolate.CLAMP),
        display: scaleacess.value === 0 ? 'none' : 'flex',
    }));


    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Rút Dcash</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenHistoryRdcash')} style={{ position: 'absolute', right: 0, top: 15 }}>
                    <Image source={require('../../Icon/LoadScreen.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', width: '100%', height: 160, justifyContent: 'center' }}>
                <Image source={require('../../Image/ImgDcash.png')} style={{ width: 350, height: 133 }} />
                <View style={{ position: 'absolute' }}>
                    <Image source={require('../../Image/monney.png')} style={{ width: 90, height: 60 }} />
                    <Text style={{
                        textAlign: 'center', fontSize: 26, fontWeight: '700', color: 'white'
                    }}>434,403</Text>
                </View>
            </View>
            <Text style={{ fontSize: 17, fontWeight: '500', color: 'black', padding: 10 }}>Bạn cần rút bao nhiêu?</Text>
            <View>
                <TextInput style={styles.textinputMonney}
                    value={inputValue}
                    onChangeText={handleTextInputChange} keyboardType='numeric'>
                </TextInput>
            </View>
            <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity>
                    <TouchableOpacity style={[styles.touchMonney, selectedCategory1 === "500.000" && styles.touchMonneyClick]}
                        onPress={() => handleCategorySelect1("500.000")}>
                        <Text style={styles.MonneyText}>500.000</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity>
                    <TouchableOpacity style={[styles.touchMonney, selectedCategory1 === "50.000" && styles.touchMonneyClick]}
                        onPress={() => handleCategorySelect1("50.000")}>
                        <Text style={styles.MonneyText}>50.000</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity>
                    <TouchableOpacity style={[styles.touchMonney, selectedCategory1 === "5.000" && styles.touchMonneyClick]}
                        onPress={() => handleCategorySelect1("5.000")}>
                        <Text style={styles.MonneyText}>5.000</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={handlePress}>
                    <View style={{ backgroundColor: 'black', width: 200, padding: 15, borderRadius: 10, marginTop: 90 }}>
                        <Text style={styles.TextButt}>Rút tiền</Text>
                    </View>
                </TouchableOpacity>
                <Animated.View style={[styles.box, rStyle,showAnimatedBox ? {} : { display: 'none' }]}>
                    <View style={styles.minibox}>
                        <View style={styles.iconbox}>
                            <Image source={require('../../Icon/luuy.png')} />
                        </View>
                        <Text>Thông báo</Text>
                        <Text>Vui lòng nạp tối thiểu 50,000</Text>
                        <TouchableOpacity onPress={unhandlePress} style={styles.customerdongy}>
                            <Text style={{ color: 'white' }}>Đồng ý</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.box2,rStyleacess,showAnimatedBox ? {} : {display:'none'}]}>
                    <Text>Vui lòng xác nhận mật khẩu</Text>
                    <TextInput style={styles.inputxacnhan}></TextInput>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'100%',alignItems:'center',paddingLeft:20}}>
                        <TouchableOpacity onPress={unhandlePress} style={styles.customerhuy}>
                            <Text>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.customerxacnhan}>
                            <Text style={{color:'white'}}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}

export default ScreenRdcash

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
    TextButt: {
        color: 'white',
        textAlign: "center",
        fontSize: 15,
        fontWeight: '600'
    },
    MonneyText: {
        color: 'black', fontSize: 20, fontWeight: '500'
    },
    touchMonney: {
        backgroundColor: color.whitelow,
        width: 105,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
    },
    touchMonneyClick: {
        backgroundColor: color.whitelow,
        width: 105,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        elevation: 5
    },
    textinputMonney: {
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 7,
        marginVertical: 10,
        color: 'black',
        fontSize: 21, fontWeight: '500'
    },
    box: {
        height: 262,
        width: 304,
        backgroundColor: color.background,
        borderRadius: 20,
        marginVertical: 50,
        position: 'absolute',
        elevation: 4,
        top: -200
    },
    box2: {
        height: 222,
        width: 341,
        backgroundColor: 'white',
        borderRadius: 20,
        marginVertical: 50,
        position: 'absolute',
        elevation: 4,
        top: -200,
        alignItems:'center',
        justifyContent:'center'
    },
    minibox: {
        backgroundColor: 'white',
        bottom: 0,
        width: '100%',
        height: 200,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconbox:{
        elevation:3,
        height:87,
        width:87,
        borderRadius:44,
        position:'absolute',
        top:-40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    inputxacnhan:{
        borderRadius:30,
        padding:10,
        width:'90%',
        marginVertical:30,
        borderColor:'black',
        borderWidth:1,
        paddingHorizontal:40
    },
    customerdongy:{
        backgroundColor: 'black', 
        borderRadius: 20, 
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        marginTop: 20 
    },
    customerhuy:{
        backgroundColor:color.gray,
        paddingVertical:10,paddingHorizontal:30,
        borderRadius:20
    },
    customerxacnhan:{
        backgroundColor:'black',
        paddingVertical:10,paddingHorizontal:30,
        borderRadius:20
    },
})