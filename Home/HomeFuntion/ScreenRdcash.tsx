import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenRdcash = ({ navigation }: any) => {

    const navigationGoback = useNavigation();

    const [selectedCategory1, setSelectedCategory1] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleCategorySelect1 = (category: any) => {
        setSelectedCategory1(category);
        setInputValue(category);
    };

    const handleTextInputChange = (text: string) => {
        setSelectedCategory1('');
        setInputValue(text);
    };


    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Rút Dcash</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('ScreenHistoryRdcash')} style={{ position: 'absolute', right: 0, top: 15 }}>
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
                    onChangeText={handleTextInputChange}>
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
                <TouchableOpacity>
                    <View style={{ backgroundColor: 'black', width: 200, padding: 15, borderRadius: 10, marginTop: 90 }}>
                        <Text style={styles.TextButt}>Rút tiền</Text>
                    </View>
                </TouchableOpacity>
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
    textinputMonney:{
        textAlign:'center', 
        backgroundColor: 'white', 
        borderRadius: 7, 
        marginVertical: 10, 
        color: 'black', 
        fontSize: 21, fontWeight: '500' 
    }
})