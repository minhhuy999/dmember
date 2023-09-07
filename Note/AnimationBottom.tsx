import { Button, View, StyleSheet, TouchableOpacity, PanResponder, Text, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import color from '../Color/color';

const AnimationBottom = () => {
    const translateY = useSharedValue(0);
    const minTranslateY = -450; // Giới hạn kéo tối thiểu
    const maxTranslateY = 0; // Giới hạn kéo tối đa

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            translateY.value = Math.min(maxTranslateY, Math.max(minTranslateY, gestureState.dy));
        },
        onPanResponderRelease: (_, gestureState) => {
            // Khi người dùng kết thúc kéo, bạn có thể kiểm tra giá trị translateY và thực hiện các xử lý cụ thể.
            if (gestureState.dy < -100) { // Ngưỡng ví dụ để quay trở lại
                translateY.value = withSpring(minTranslateY);
            } else {
                translateY.value = withSpring(maxTranslateY);
            }
        },
    });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value) }],
    }));
    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={[styles.box, animatedStyles]} {...panResponder.panHandlers}>
                <View style={{ padding: 20, backgroundColor: 'white', width: '100%', height: 600, borderRadius: 30, borderWidth: 0.5 }}>
                    <View style={{ alignItems: 'center', paddingHorizontal: 50 }}>
                        <Image source={require('../Image/shareapp.png')} />
                        <Image source={require('../Image/go.png')} />
                        <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginVertical: 10, textAlign: 'center' }}>Mời bạn bè bằng mã giới thiệu của bạn</Text>
                        <View style={{ backgroundColor: color.bluehidden, borderRadius: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 10, paddingHorizontal: 20 }}>
                            <Text style={{ color: 'black' }}>09337910161</Text>
                            <Text>Sao chép</Text>
                        </View>
                        <Text style={{ width: '100%', color: 'black', fontSize: 17, fontWeight: '500', marginVertical: 10 }}>Link chia sẻ:</Text>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                            <Text style={{ color: 'black', backgroundColor: color.bluehidden, borderRadius: 20, justifyContent: 'space-between', padding: 10, paddingHorizontal: 20 }}>https://sees.asia/70jg1w</Text>
                            <TouchableOpacity>
                                <Image source={require('../Icon/copyshare.png')} style={{ marginLeft: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}

export default AnimationBottom

const styles = StyleSheet.create({
    box: {
        position: 'absolute',
        width: '100%',
        height: 600,
        backgroundColor: 'violet',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        bottom: -580,
    },
})