import React, { useRef } from 'react';
import { View, StyleSheet, } from 'react-native';
import { RNCamera } from 'react-native-camera'

const ScreenScanQR = () => {
    const cameraRef = useRef(null);
    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={{
                    height: 200,
                    width: '100%',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ScreenScanQR;
