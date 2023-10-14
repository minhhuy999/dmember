import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import color from '../Color/color'
import realmHS from '../Realm/realmHistoryS';
import { addSPStore } from '../Realm/StorageServices';
import SearchAnimation from './AnimationShop/SearchAnimation';
import Animated, { runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { getAPIandDOMAIN } from '../AsysncStorage/AsysncAPI';
import axios from 'axios';

const ScreenShop = ({ navigation }: any) => {

    // const { APIkey, Domain } = route.params
    // const [APIkey, setAPIkey] = useState<string>('')
    // const [Domain, setDomain] = useState<string>('')
    // const apiProductlist = `${Domain}/client_product/list_all?apikey=${APIkey}`
    // const formData = new FormData()
    // formData.append('app_name', 'khttest')

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);

    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const [activeDotIndex2, setActiveDotIndex2] = useState(0);
    const flatListRef: any = useRef(null);
    const flatListRef2: any = useRef(null);

    // const [dataId, setdataId] = useState<any>([])

    const addSP = realmHS.objects('AddProduct')

    const translateY: any = useSharedValue(0);
    const [pagingEnabled, setPagingEnabled] = useState(false);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            translateY.value = event.contentOffset.y;
        },
        onEndDrag: (e) => {
            if (translateY.value < 100) {
                runOnJS(setPagingEnabled)(true);
            } else {
                runOnJS(setPagingEnabled)(false);
            }
        },
    });

    const DataImg = [
        {
            id: '1',
            img: require('../Image/imgLoad1.png')
        },
        {
            id: '2',
            img: require('../Image/imgLoad1.png')
        },
        {
            id: '3',
            img: require('../Image/imgLoad1.png')
        },
    ]

    const DataImg2 = [
        {
            id: '1',
            img: require('../Image/imgLoad2.png')
        },
        {
            id: '2',
            img: require('../Image/imgLoad2.png')
        },
        {
            id: '3',
            img: require('../Image/imgLoad2.png')
        },
        {
            id: '4',
            img: require('../Image/imgLoad2.png')
        },
        {
            id: '5',
            img: require('../Image/imgLoad2.png')
        },
    ]

    const TopItem = [
        {
            id: '8',
            img: require('../SanPham/PhanP.png'),
            name: 'Phấn phủ trang điểm siêu mịn',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '9',
            img: require('../SanPham/SonAe.png'),
            name: 'Son Aery Jo Art Lipstick',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '10',
            img: require('../SanPham/TrangD.png'),
            name: 'Son Aery Jo Art Lipstick',
            gia: '523,000',
            chietkhau: '53,000'
        },
    ]

    const SanPham = [
        {
            id: '1',
            img: require('../SanPham/NTTpink.png'),
            name: 'Nước tẩy trang Dearanchy Purifying Pure Cleansing 30ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '2',
            img: require('../SanPham/NTTred.png'),
            name: 'Dầu tẩy trang Dearanchy Purifying Pure Cleansing 30ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '3',
            img: require('../SanPham/SRMdermaPH.png'),
            name: 'Sữa rửa mặt tạo bọt Dearanchy Purifying Derma PH Care 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '4',
            img: require('../SanPham/Gel.png'),
            name: 'Gel rửa mặt cho da dầu mụn 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '5',
            img: require('../SanPham/SRMvita.png'),
            name: 'Sữa rửa mặt vitamin làm trắng Dearanchy Moisture Vita 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
        {
            id: '6',
            img: require('../SanPham/SRMvita.png'),
            name: 'Sữa rửa mặt vitamin làm trắng Dearanchy Moisture Vita 150ml',
            gia: '523,000',
            chietkhau: '53,000'
        },
    ]

    const TypeSp = [
        {
            id: '1',
            img: require('../Image/csdm.png'),
            name: 'Chăm sóc da mặt'
        },
        {
            id: '2',
            img: require('../Image/td.png'),
            name: 'Trang điểm'
        },
        {
            id: '3',
            img: require('../Image/spbd.png'),
            name: 'Sản phẩm body - tay'
        },
        {
            id: '4',
            img: require('../Image/cst.png'),
            name: 'Chăm sóc tóc'
        },
        {
            id: '5',
            img: require('../Image/cst.png'),
            name: 'Chăm sóc tóc'
        },
    ]

    const renderItemImg = ({ item, index }: any) => {
        return (
            <View style={{ flex: 1 }}>
                <Image source={item.img} style={{ width: 365, height: 185 }} />
            </View>
        )
    }

    const renderItemImg2 = ({ item, index }: any) => {
        return (
            <View style={{ flex: 1 }}>
                <Image source={item.img} style={{ width: 365, height: 141 }} />
            </View>
        )
    }

    const renderTopItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailProduct', { item })}>
                <View style={styles.ItemTopSP}>
                    <Image source={item.img} style={{ width: 110, height: 105, marginVertical: 10 }} />
                    <Text style={styles.ItemnameSP}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.ItemtextSP}>Giá bán:</Text>
                        <Text style={styles.ItemTextGia}> {item.gia}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.ItemtextSP}>Chiết khấu:</Text>
                        <Text style={styles.ItemTextCK}>  {item.chietkhau}</Text>
                    </View>
                    <TouchableOpacity style={styles.Add} onPress={() => handleAddToCart(item)}>
                        <Text style={{ color: 'white' }}>+</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    const renderTypeSP = ({ item, index }: any) => {
        return (
            <TouchableOpacity>
                <View style={styles.ItemTypeSP}>
                    <Image source={item.img} style={{ height: 38, width: 38 }} />
                    <Text style={styles.TextType}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderSP = ({ item, index }: any) => {
        if (index < 5) {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailProduct', { item })}>
                    <View style={styles.renderSp}>
                        <Image source={item.img} style={{ height: 130, width: 132 }} />
                        <Text style={styles.ItemnameSP}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            <Text style={styles.ItemtextSP}>Giá bán: </Text>
                            <Text style={styles.ItemTextGia}>{item.gia}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            <Text style={styles.ItemtextSP}>Chiết khấu: </Text>
                            <Text style={styles.ItemTextCK}>{item.chietkhau}</Text>
                        </View>
                        <TouchableOpacity style={styles.Add} onPress={() => handleAddToCart(item)}>
                            <Text style={{ color: 'white' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (index == 5) {
            return (
                <View style={styles.renderSeenAll}>
                    <Image source={require('../Icon/ArrowBall.png')} style={{ width: 48, height: 48 }} />
                    <Text style={{ fontSize: 12, fontWeight: '400', color: 'white' }}>Xem tất cả</Text>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    const renderDot = () => {
        return DataImg.map((dot, index) => {
            const isActive = index === activeDotIndex;
            return (
                <View
                    key={index}
                    style={{
                        marginHorizontal: 2,
                        backgroundColor: 'white',
                        height: isActive ? 10 : 7,
                        width: isActive ? 10 : 7,
                        borderRadius: 5
                    }}
                ></View>
            )
        })
    }

    const renderDot2 = () => {
        return DataImg2.map((dot, index) => {
            const isActive = index === activeDotIndex2;
            return (
                <View
                    key={index}
                    style={{
                        marginHorizontal: 2,
                        backgroundColor: isActive ? 'white' : 'black',
                        height: 2,
                        width: 15,
                        borderRadius: 5
                    }}
                ></View>
            )
        })
    }


    const handleAddToCart = (item: any) => {
        const existingProduct: any = addSP.filtered(`id == '${item.id}'`)[0]
        if (existingProduct) {
            realmHS.write(() => {
                existingProduct.soluong += 1
            })
        } else {
            addSPStore(item.id, 1)
        }
        console.log('Sản phẩm đã được thêm vào cơ sở dữ liệu Realm.')
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % DataImg.length;
            const nextIndex2 = (currentIndex2 + 1) % DataImg2.length;
            setCurrentIndex(nextIndex);
            setCurrentIndex2(nextIndex2);
            setActiveDotIndex(nextIndex);
            setActiveDotIndex2(nextIndex2);
            flatListRef.current.scrollToIndex({ index: nextIndex });
            flatListRef2.current.scrollToIndex({ index: nextIndex2 });
        }, 3000);
        return () => clearInterval(timer);
    }, [currentIndex, currentIndex2]);

    // useEffect(() => {
    //     getAPIandDOMAIN({ setAPIkey, setDomain })
    // }, [])

    // const checkapishop = () => {
    //     console.log('Da ket noi duoc Shop: ', apiProductlist)
        // getAPIShop()
    // }

    // const getAPIShop = async () => {
    //     try {
    //         const response = await axios.post(apiProductlist, formData, {
    //             headers: {
    //                 Accept: 'application/x-www-form-urlencoded',
    //             },
    //         })
    //         if (response.status === 200) {
    //             setdataId(JSON.stringify(response.data.data.theme))
    //             console.log(dataId);
    //         }
    //     } catch (error) {
    //         console.error('There was a problem with the operation:', error);
    //     }
    // };

    return (

        <View style={styles.backgr}>
            <SearchAnimation translateY={translateY} />
            <Animated.ScrollView showsVerticalScrollIndicator={false} onScroll={scrollHandler} pagingEnabled={pagingEnabled}>
                <View style={{ width: '98%', height: 200, marginTop: 15, alignItems: 'center' }}>
                    <FlatList
                        ref={flatListRef}
                        data={DataImg}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItemImg}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.dot}>{renderDot()}</View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <View style={styles.BoxItem}>
                        <TouchableOpacity>
                            <View style={styles.Item}>
                                <View style={styles.BoxItemImage}>
                                    <Image source={require('../Image/khotd.png')} style={{ width: 33, height: 31 }} />
                                </View>
                                <Text style={styles.TextItem}>Kho tiêu dùng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.Item}>
                                <View style={styles.BoxItemImage}>
                                    <Image source={require('../Image/khoqt.png')} style={{ width: 33, height: 31 }} />
                                </View>
                                <Text style={styles.TextItem}>Kho quà tặng - KM</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.Item}>
                                <View style={styles.BoxItemImage}>
                                    <Image source={require('../Image/khokn.png')} style={{ width: 33, height: 31 }} />
                                </View>
                                <Text style={styles.TextItem}>Kho khởi nghề</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.Item}>
                                <View style={styles.BoxItemImage}>
                                    <Image source={require('../Image/khosi.png')} style={{ width: 33, height: 31 }} />
                                </View>
                                <Text style={styles.TextItem}>Kho sỉ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {/* <Text>{dataId}</Text> */}
                </View>
                <View style={styles.muc}>
                    <Text style={styles.title}>SẢN PHẨM BÁN CHẠY</Text>
                    <Image source={require('../Icon/arrow.png')} style={{ height: 13, width: 7, marginRight: 5 }} />
                </View>
                <View style={{ width: '100%', height: 250 }}>
                    <FlatList
                        data={TopItem}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTopItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.muc}>
                    <Text style={styles.title}>MỸ PHẨM MILKYDRESS</Text>
                    <Image source={require('../Icon/arrow.png')} style={{ height: 13, width: 7, marginRight: 5 }} />
                </View>
                <View style={{ width: '98%', height: 155, alignItems: 'center' }}>
                    <FlatList
                        ref={flatListRef2}
                        data={DataImg2}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItemImg2}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.line}>{renderDot2()}</View>
                </View>
                <View style={{ width: '100%', height: 90 }}>
                    <FlatList
                        data={TypeSp}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTypeSP}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{ marginTop: 10, width: '100%', height: 800 }}>
                    <FlatList
                        data={SanPham}
                        keyExtractor={(item) => item.id}
                        renderItem={renderSP}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        scrollEnabled={false}
                        initialNumToRender={5}
                    />
                </View>
            </Animated.ScrollView>
        </View>
    )
}

export default ScreenShop

const styles = StyleSheet.create({
    backgr: {
        backgroundColor: color.background,
        flex: 1,
        padding: 10
    },
    TextPoint: {
        color: color.green,
        fontSize: 14,
        fontWeight: '600',
    },
    BoxItem: {
        padding: 15,
        marginTop: 10,
        backgroundColor: 'white',
        width: '98%', height: 110,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    BoxItemImage: {
        width: 46, height: 46,
        alignItems: 'center',
        backgroundColor: color.bluemedium,
        justifyContent: 'center',
        borderRadius: 50
    },
    Item: {
        height: '100%', width: 65,
        alignItems: 'center'
    },
    TextItem: {
        fontSize: 11,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center',
        marginTop: 5
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: 'black'
    },
    ItemTypeSP: {
        marginRight: 10,
        backgroundColor: 'white',
        height: 80,
        width: 80,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextType: {
        color: 'black',
        fontSize: 10,
        fontWeight: '400',
        textAlign: 'center'
    },
    ItemTopSP: {
        elevation: 2,
        backgroundColor: 'white',
        width: 132, height: 230,
        borderRadius: 10,
        paddingLeft: 10, padding: 5, paddingRight: 10,
        marginRight: 10
    },
    ItemnameSP: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '500',
        color: 'black',
        marginTop: 10
    },
    ItemtextSP: {
        color: 'black',
        fontSize: 10,
        fontWeight: '400',
        marginLeft: 5
    },
    ItemTextGia: {
        color: color.grow,
        fontSize: 10,
        fontWeight: '600'
    },
    ItemTextCK: {
        color: color.blue,
        fontSize: 10,
        fontWeight: '600'
    },
    Add: {
        height: 27, width: 27,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 27,
        position: 'absolute',
        bottom: 2, right: 2
    },
    line: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20
    },
    dot: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    muc: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    renderSp: {
        elevation: 3,
        backgroundColor: 'white',
        height: 229,
        width: 174,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 15,
        marginBottom: 15
    },
    renderSeenAll: {
        height: 229,
        width: 174,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
})