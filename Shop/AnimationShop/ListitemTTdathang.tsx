import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { getAPIDetail } from '../../AsysncStorage/AsysncStore'

const ListitemTTdathang = ({ item, APIkey, Domain }: any) => {

    const [data, setdata] = useState<any>([])
    const [image, setimage] = useState('')

    useEffect(() => {
        getAPIDetail({ item, Domain, APIkey, setdata, setimage })
    }, [])

    const fotmatedmonney = ((item: any) => {
        const monney = parseFloat(item)
        const formattedMonney = monney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        return formattedMonney;
    })

    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: 90, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            {image ? (
                <Image source={{ uri: image }} style={{ width: 53, height: 53, paddingVertical: 10, marginLeft: 10, marginRight: 10, borderRadius: 5 }} />
            ) : (
                <View style={{ width: 53, height: 53, paddingVertical: 10, marginLeft: 10, marginRight: 10, borderRadius: 5, backgroundColor: 'gray' }} />
            )}
            <View style={{ width: 280, padding: 5, height: 80 }}>
                <View style={{ height: 40 }}>
                    <Text style={styles.Text1}>{data.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 30 }}>
                    <View style={{ height: 30, width: '75%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text2}>Giá bán: </Text>
                            <Text style={{ color: color.organge, fontSize: 12, fontWeight: '400' }}>{fotmatedmonney(data.price)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text2}>Chiết khấu: </Text>
                            <Text style={{ color: color.blue, fontSize: 12, fontWeight: '400' }}>{fotmatedmonney(data.price_cal_commission)}</Text>
                        </View>
                    </View>
                    <View style={{ height: 30, justifyContent: 'flex-end' }}>
                        <Text style={styles.Text2}>Số lượng: {item.soluong}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ListitemTTdathang

const styles = StyleSheet.create({
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
})