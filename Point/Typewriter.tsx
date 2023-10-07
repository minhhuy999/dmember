import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const SIZE: any = width * 0.77;

const Typewriter = ({ delay, infinite }: any) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation: any = useNavigation();
    const text="Tim Kiem San Pham"

    useEffect(() => {
        let timeout: any;

        if (currentIndex < text.length) {
            timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

        } else if (infinite) { // ADD THIS CHECK
            setCurrentIndex(0);
            setCurrentText('');
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);

    return (
        <View style={{flex:1}}>
            <TouchableOpacity onPress={() => navigation.navigate('ScreenSproduct')} style={{ width: SIZE - 40, height: '100%', justifyContent: 'center' }}>
                <Text style={{marginLeft:20}}>{currentText}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Typewriter

const styles = StyleSheet.create({})