import React, { useRef } from 'react';
import { View, StyleSheet, } from 'react-native';
import { RNCamera } from 'react-native-camera'

const ScreenScanQR = () => {
    const cameraRef = useRef(null);
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <RNCamera
                    ref={cameraRef}
                    style={{
                        flex: 1,
                        width: '100%',
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ScreenScanQR;
