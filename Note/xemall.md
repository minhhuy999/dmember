import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const DATA = [
    // 10 lists with their data
    {
        id: '1',
        title: 'List 1',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '2',
        title: 'List 2',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '3',
        title: 'List 3',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '4',
        title: 'List 4',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '5',
        title: 'List 5',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '6',
        title: 'List 6',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '7',
        title: 'List 7',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '8',
        title: 'List 8',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '9',
        title: 'List 9',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        id: '10',
        title: 'List 10',
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
];

const App = () => {
    const [showAllLists, setShowAllLists] = useState(false);

    const renderListItem = ({ item }: any) => (
        <View>
            <Text>{item.title}</Text>
            <FlatList
                data={item.data}
                keyExtractor={(subItem, index) => index.toString()}
                renderItem={({ item: subItem }) => <Text>{subItem}</Text>}
            />
        </View>
    );

    const renderLists = () => {
        if (showAllLists) {
            return (
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderListItem}
                />
            );
        } else {
            return (
                <FlatList
                    data={DATA.slice(0, 3)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderListItem}
                />
            );
        }
    };

    return (
        <View>
            <Text>List Page</Text>
            <Button
                title={showAllLists ? 'Show Less' : 'Show All Lists'}
                onPress={() => setShowAllLists(!showAllLists)}
            />
            {renderLists()}
        </View>
    );
};

export default App;
