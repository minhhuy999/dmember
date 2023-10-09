import { StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
    useAnimatedStyle,
    interpolate,
    withTiming,
} from 'react-native-reanimated';
import {
    FlingGestureHandler,
    Directions,
    State,
} from 'react-native-gesture-handler';

const AnimatedCard = ({
    maxVisibleItems,
    item,
    index,
    dataLength,
    animatedValue,
    currentIndex,
    prevIndex,
}: any) => {
    const IMAGE_WIDTH = 250;
    const IMAGE_HEIGHT = 250;

    const animatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            animatedValue.value,
            [index - 1, index, index + 1],
            [-20, 1, 20],
        );
        const translateY2 = interpolate(
            animatedValue.value,
            [index - 1, index, index + 1],
            [-200, 1, 200],
        );
        const scale = interpolate(
            animatedValue.value,
            [index - 1, index, index + 1],
            [0.9, 1, 1.1],
        );
        const opacity = interpolate(
            animatedValue.value,
            [index - 1, index, index + 1],
            [1, 1, 0],
        );
        return {
            transform: [
                {
                    translateY: index === prevIndex.value ? translateY2 : translateY,
                },
                { scale },
            ],
            opacity:
                index < currentIndex.value + maxVisibleItems - 1
                    ? opacity
                    : index === currentIndex.value + maxVisibleItems - 1
                        ? withTiming(1)
                        : withTiming(0),
        };
    });

    return (
        <FlingGestureHandler
            key="up"
            direction={Directions.LEFT}
            onHandlerStateChange={ev => {
                if (ev.nativeEvent.state === State.END) {
                    if (currentIndex.value !== 0) {
                        animatedValue.value = withTiming((currentIndex.value -= 1));
                        prevIndex.value = currentIndex.value - 1;
                    }
                }
            }}>
            <FlingGestureHandler
                key="down"
                direction={Directions.RIGHT}
                onHandlerStateChange={ev => {
                    if (ev.nativeEvent.state === State.END) {
                        if (currentIndex.value !== dataLength - 1) {
                            animatedValue.value = withTiming((currentIndex.value += 1));
                            prevIndex.value = currentIndex.value;
                        }
                    }
                }}>
                <Animated.Image
                    source={item.image}
                    style={[
                        styles.image,
                        {
                            zIndex: dataLength - index,
                            width: IMAGE_WIDTH,
                            height: IMAGE_HEIGHT,
                        },
                        animatedStyle,
                    ]}
                />
            </FlingGestureHandler>
        </FlingGestureHandler>
    );
};

export default AnimatedCard;

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        borderRadius: 20,
        borderColor:'white',
        borderWidth: 0.5,
        backgroundColor:'black'
    },
});