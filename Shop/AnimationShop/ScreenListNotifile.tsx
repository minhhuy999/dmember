import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { retrieveUserData } from '../../AsysncStorage/AsysncUser';
import axios from 'axios';
import moment from 'moment';

const ScreenListNotifile = ({ route }: any) => {

    const { Domain, APIkey } = route.params
    const navigation: any = useNavigation()

    const [dataListNotifile, setdataListNotifile] = useState<any>([])
    const [token, settoken] = useState('')
    const apinotifile = `${Domain}/client_notification/list?apikey=${APIkey}`
    const formData = new FormData()
    formData.append('app_name', 'khttest')

    useEffect(() => {
        getAPIListNotifile()
    }, [dataListNotifile])

    useFocusEffect(
        React.useCallback(() => {
            gettoken()
        }, [])
    )

    const gettoken = async () => {
        const userData = await retrieveUserData()
        if (userData) {
            const { session_token, point } = userData
            settoken(session_token)
            formData.append('token', token)
        } else {
            settoken('')
        }
    }

    const getAPIListNotifile = async () => {
        formData.append('page', 1)
        // if (APIkey && Domain) {
            await gettoken()
            try {
                const response = await axios.post(apinotifile, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataNotifile = response.data.data.l
                    // console.log(dataNotifile)
                    setdataListNotifile(dataNotifile)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        // }
    }

    const renderItem = ({ item, index }: any) => {
        const formattedDate = moment.unix(item.created_at).format('d DD/MM/YYYY HH:mm:ss');
        return (
            <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 3,marginBottom:10 }}>
                <Image source={require('../../Icon/bellnotifile.png')} style={{ width: 40, height: 40, margin: 10 }} />
                <View style={{ flex: 1, padding: 10 ,paddingRight:20}}>
                    <Text style={{ color: color.background }}>{item.subject}</Text>
                    <Text style={{ color: color.green }}>Thu {formattedDate}</Text>
                    <Text style={{ color: 'black' }}>{item.content_app}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Thông báo</Text>
            </View>
            <View style={{ flex: 1, padding: 20 }}>
                <FlatList
                    data={dataListNotifile}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false} />
            </View>
        </View>
    )
}

export default ScreenListNotifile

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