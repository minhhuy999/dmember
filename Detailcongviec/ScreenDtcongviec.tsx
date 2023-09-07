import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../Color/color'
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

const ScreenDtcongviec = ({ navigation }: any) => {

    const navigationGoback = useNavigation()
    const [detail, setdetail] = useState(false)

    const taskStatus = 'Hoàn thành';
    // const taskStatus = route.params.taskStatus;

    const toggleDetail = () => {
        setdetail(!detail); // Toggle between false and true
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10, }}>
                    <Image source={require('../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Chi tiết công việc</Text>
                <TouchableOpacity onPress={toggleDetail} style={{ position: 'absolute', right: 0, top: 10, }}>
                    <Image source={require('../Icon/detailmore.png')} style={{ width: 14, height: 23 }} />
                </TouchableOpacity>
            </View>
            {detail
                ? <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.textDetailmuc}>Chi nhánh</Text>
                        <View style={styles.boxTextdetail}>
                            <Text style={styles.Textdetail}>DSORE - HCM</Text>
                        </View>
                        <Text style={styles.textDetailmuc}>Phòng ban</Text>
                        <View style={styles.boxTextdetail}>
                            <Text style={styles.Textdetail}>Phòng công nghệ</Text>
                        </View>
                        <Text style={styles.textDetailmuc}>Phòng ban liên quan</Text>
                        <View style={styles.boxTextdetail}>
                            <Text style={styles.Textdetail}>Phòng công nghệ</Text>
                        </View>
                        <Text style={styles.textDetailmuc}>Loại công việc</Text>
                        <View style={styles.boxTextdetail}>
                            <Text style={styles.Textdetail}>Kỹ thuật</Text>
                        </View>
                        <Text style={styles.textDetailmuc}>Công việc</Text>
                        <View style={styles.boxTextdetail}>
                            <Text style={styles.Textdetail}>Đưa TV lên phòng họp VIP7</Text>
                        </View>
                        <Text style={styles.textDetailmuc}>Thời gian</Text>
                        <View style={styles.boxTextdetail}>
                            <Text style={styles.Textdetail}>24/05/2022</Text>
                        </View>
                        <Text style={styles.textDetailmuc}>Gán công việc cho</Text>
                        <View style={styles.boxTextdetail}>
                            <Text style={styles.Textdetail}>DUONGLONG, DUONG NHAT TAM</Text>
                        </View>
                        <Text style={styles.textDetailmuc}>Trạng thái</Text>
                        <View style={styles.boxTextdetail}>
                            <Text style={{ color: taskStatus === 'Hoàn thành' ? 'green' : 'orange', fontSize: 15, fontWeight: '500' }}>{taskStatus}</Text>
                        </View>
                        <View style={{ height: 50 }}></View>
                    </ScrollView>
                </View>
                : <View style={{ flex: 1 }}>
                    <Text style={styles.BoxText}>Công việc</Text>
                    <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 7 }}>
                        <Text style={styles.Textdetail}>Đưa TV lên phòng họp VIP7</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '48%' }}>
                            <Text style={styles.BoxText}>Thời gian</Text>
                            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 7, }}>
                                <Text style={{ color: 'black', fontSize: 15, fontWeight: '500', textAlign: 'center' }}>24/05/2022</Text>
                            </View>
                        </View>
                        <View style={{ width: '48%' }}>
                            <Text style={styles.BoxText}>Trạng thái</Text>
                            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 7 }}>
                                <Text style={{
                                    color: taskStatus === 'Hoàn thành' ? 'green' : 'orange',
                                    fontSize: 15, fontWeight: '500',
                                    textAlign: 'center'
                                }}>
                                    {taskStatus}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.BoxText}>Mô tả</Text>
                    <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 7, height: 300 }}>
                        <Text style={styles.Textdetail}></Text>
                    </View>
                </View>}

        </View>
    )
}

export default ScreenDtcongviec

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
    textDetailmuc: {
        paddingVertical: 10, color: 'black', fontSize: 15, fontWeight: '400'
    },
    boxTextdetail: {
        backgroundColor: 'white', padding: 14, borderRadius: 7
    },
    Textdetail: {
        color: 'black', fontSize: 15, fontWeight: '500'
    },
    BoxText: {
        paddingVertical: 15, color: 'black', fontSize: 15, fontWeight: '400'
    },
})