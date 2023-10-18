import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
} from 'react-native-reanimated';
import Pagination from './Pagination';
const CustomImageCarousal = ({ data, autoPlay, pagination }:any) => {
    const scrollViewRef:any = useAnimatedRef();
    const interval:any = useRef();
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
    const [newData] = useState([
        { key: 'spacer-left' },
        ...data,
        { key: 'spacer-right' },
    ]);
    const { width } = useWindowDimensions();
    const SIZE = 370;
    const SPACER = (370 - SIZE) / 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });

    useEffect(() => {
        if (isAutoPlay === true) {
            let _offSet = offSet.value;
            interval.current = setInterval(() => {
                if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
                    _offSet = 0;
                } else {
                    _offSet = Math.floor(_offSet + SIZE);
                }
                scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });
            }, 4000);
        } else {
            clearInterval(interval.current);
        }
    }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);
    
    return (
        <View>
            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false);
                }}
                onMomentumScrollEnd={e => {
                    offSet.value = e.nativeEvent.contentOffset.x;
                    setIsAutoPlay(autoPlay);
                }}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={SIZE}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}>
                {newData.map((item, index) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const style = useAnimatedStyle(() => {
                        const scale = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [0.8, 1, 0.8],
                        );
                        const opacity = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [0.5, 1, 0.5],
                        );
                        return {
                            opacity,
                            transform: [{ scale }],
                        };
                    });
                    if (!item.banner) {
                        return <View style={{ width: SPACER }} key={index} />;
                    }
                    return (
                        <View style={{ width: SIZE}} key={index}>
                            <Animated.View style={[styles.imageContainer, style]}>
                                <Image source={{ uri: item.banner }} style={styles.image} />
                            </Animated.View>
                        </View>
                    );
                })}
            </Animated.ScrollView>
            {pagination && <Pagination data={data} x={x} size={SIZE} />}
        </View>
    );
};

export default CustomImageCarousal;

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'pink',
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    image: {
        width: 360,
        height: 220,
        borderRadius: 10,
        overflow: 'hidden',
    },
});