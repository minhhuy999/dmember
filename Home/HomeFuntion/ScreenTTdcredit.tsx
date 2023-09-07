import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native';

const ScreenTTdcredit = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Thanh toán Dcredit</Text>
            </View>
            <View style={styles.Boxmuc}>
                <Text style={styles.TextTT}>Ví thanh toán</Text>
                <TextInput style={styles.TextInp}></TextInput>
            </View>
            <View style={styles.Boxmuc}>
                <Text style={styles.TextTT}>Số tiền thanh toán</Text>
                <TextInput style={styles.TextInp}></TextInput>
            </View>
            <View style={styles.BoxNote}>
                <Text style={styles.TextTT}>Lời nhắn</Text>
                <TextInput style={styles.Note} multiline={true}></TextInput>
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity>
                    <View style={{ backgroundColor: 'black', width: 200, padding: 15, borderRadius: 10 }}>
                        <Text style={styles.TextButt}>Thanh toán ngay</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScreenTTdcredit

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20
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
    Boxmuc: {
        width: '100%',
        height: 100,
    },
    TextTT: {
        color: 'black',
        fontSize: 17,
        fontWeight: '500',
        paddingBottom: 5
    },
    TextInp: {
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 7
    },
    BoxNote: {
        width: '100%',
        height: 200,
    },
    Note: {
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 7,
        height: 100,
        paddingBottom: 70,
        borderStyle: 'dashed',
        borderWidth: 1
    },
    TextButt: {
        color: 'white',
        textAlign: "center",
        fontSize:15,
        fontWeight:'600'
    }
})