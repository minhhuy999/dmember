import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import AnimatedCard from './AnimatedCard';
import { View } from 'react-native-animatable';
import { FlatList } from 'react-native';
const Card = ({ data, maxVisibleItems }: any) => {
    const animatedValue = useSharedValue(0);
    const currentIndex = useSharedValue(0);
    const prevIndex = useSharedValue(0);
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%',height:300,top:-10}}>
            {data.map((item: any, index: any) => {
                return (
                    <AnimatedCard
                        maxVisibleItems={maxVisibleItems}
                        item={item}
                        index={index}
                        dataLength={data.length}
                        animatedValue={animatedValue}
                        currentIndex={currentIndex}
                        prevIndex={prevIndex}
                        key={index}
                    />
                );
            })}
        </View>
    );
};

export default Card;