import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';

const ScreenDtNews = ({ route }: any) => {

    const { item } = route.params
    
    const customHTMLElementModels: any = {
        iframe: {
            contentModel: 'iframe',
            isTranslatableTextual: (attributes: any) => {
                return true
            },
            isVoid: true
        },
    };

    return (
        <ScrollView style={{flex:1}}>
            <RenderHtml
                contentWidth={300}
                source={{ html: item.description }}
                customHTMLElementModels={customHTMLElementModels}
            />
        </ScrollView>
    )
}

export default ScreenDtNews

const styles = StyleSheet.create({})