import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import color from '../../Color/color'

const ScreenChoosenLocation = ({route}:any) => {

    const { data } = route.params
    
    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={{ borderTopWidth: 1, borderTopColor: color.graymedium, padding: 10 }}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={renderItem}
            // scrollEnabled={false}
            />
        </View>
    )
}

export default ScreenChoosenLocation

const styles = StyleSheet.create({})