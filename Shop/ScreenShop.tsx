import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import color from '../Color/color'
import realmHS from '../Realm/realmHistoryS'
import { addSPStore } from '../Realm/StorageServices'
import SearchAnimation from './AnimationShop/SearchAnimation'
import Animated, { runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { getAPIKeyAndDomainFromStorage, getAPIandDOMAIN } from '../AsysncStorage/AsysncAPI'
import axios from 'axios'
import CustomImageCarousalLandscape from './AnimationShop/CustomImageCarousalLandscape'

const ScreenShop = ({ navigation }: any) => {

    const [APIkey, setAPIkey] = useState<any>(null)
    const [Domain, setDomain] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1)   

    const formData = new FormData()
    formData.append('app_name', 'khttest')
    formData.append('page', currentPage)
    // formData.append('for_point', 0)
    const apiProductlist = `${Domain}/client_product/list_all?apikey=${APIkey}`

    const [currentIndex2, setCurrentIndex2] = useState(0)

    const [activeDotIndex2, setActiveDotIndex2] = useState(0)
    const flatListRef: any = useRef(null)
    const flatListRef2: any = useRef(null)

    const [dataProduct, setdataProduct] = useState<any>([])
    const [dataicontopic1, setdataicontopic1] = useState<any>([])
    const [loadingmore, setloadingmore] = useState(false)

    const addSP = realmHS.objects('AddProduct')

    const translateY: any = useSharedValue(0)
    const [pagingEnabled, setPagingEnabled] = useState(false)

    function limitText(text: any, maxLength: any) {
        if (text.length <= maxLength) {
            return text
        }
        return text.slice(0, maxLength) + '...'
    }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            translateY.value = event.contentOffset.y
        },
        onEndDrag: (e) => {
            if (translateY.value < 100) {
                runOnJS(setPagingEnabled)(true)
            } else {
                runOnJS(setPagingEnabled)(false)
            }
        },
    })

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

    const rendertest = ({ item, index }: any) => {
        return (
            <View style={{ width: '100%', alignContent: 'center', justifyContent: 'center' }}>
                {item.name == 'SẢN PHẨM MỚI' ?
                    <Text style={{ width: '100%', height: 20 }}>{item.name}</Text> : null}
                <FlatList
                    data={item.product_1_list}
                    keyExtractor={(product) => product.product_id}
                    renderItem={({ item: product }) => {
                        return (
                            <View style={{ width: '100%' }}>
                                <Text>{product.product_name}</Text>
                            </View>
                        )
                    }} />
            </View>
        )
    }

    const renderItemImg = ({ item, index }: any) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <CustomImageCarousalLandscape
                    data={item.slide_list}
                    autoPlay={true}
                    pagination={true}
                />
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
            <View style={{ width: '100%', alignContent: 'center', justifyContent: 'center' }}>
                {item.name == 'SẢN PHẨM MỚI' ?
                    <FlatList
                        data={item.product_1_list}
                        keyExtractor={(product) => product.product_id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: product }) => {
                            const price = parseFloat(product.price)
                            const pricecal = parseFloat(product.price_cal_commission)
                            const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            const formattedDiscount = pricecal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailProduct', { item: product })}>
                                    <View style={styles.ItemTopSP}>
                                        <Image source={{ uri: product.img_1 }} style={{ width: 110, height: 105, marginVertical: 10, borderRadius: 5 }} />
                                        <Text style={styles.ItemnameSP}>{limitText(product.product_name, 40)}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                            <Text style={styles.ItemtextSP}>Giá bán:</Text>
                                            <Text style={styles.ItemTextGia}> {formattedPrice}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                            <Text style={styles.ItemtextSP}>Chiết khấu:</Text>
                                            <Text style={styles.ItemTextCK}>  {formattedDiscount}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.Add} onPress={() => handleAddToCart(product)}>
                                            <Text style={{ color: 'white' }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        }} /> : null}
            </View>
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
        const price = parseFloat(item.price)
        const pricecal = parseFloat(item.price_cal_commission)
        const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        const formattedDiscount = pricecal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        // if (index < 5) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailProduct', { item })}>
                <View style={styles.renderSp}>
                    {item.img_1 == "" ? <View style={{ height: 130, width: 132, borderRadius: 5 }} /> :
                        <Image source={{ uri: item.img_1 }} style={{ height: 130, width: 132, borderRadius: 5 }} />}
                    <Text style={styles.ItemnameSP}>{limitText(item.product_name, 40)}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.ItemtextSP}>Giá bán: </Text>
                        <Text style={styles.ItemTextGia}>{formattedPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={styles.ItemtextSP}>Chiết khấu: </Text>
                        <Text style={styles.ItemTextCK}>{formattedDiscount}</Text>
                    </View>
                    <TouchableOpacity style={styles.Add} onPress={() => handleAddToCart(item)}>
                        <Text style={{ color: 'white' }}>+</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
        // }
        // else if (index == 5) {
        //     return (
        //         <View style={styles.renderSeenAll}>
        //             <Image source={require('../Icon/ArrowBall.png')} style={{ width: 48, height: 48 }} />
        //             <Text style={{ fontSize: 12, fontWeight: '400', color: 'white' }}>Xem tất cả</Text>
        //         </View>
        //     )
        // } else {
        //     return (
        //         <View></View>
        //     )
        // }
    }

    const renderDot2 = () => {
        return DataImg2.map((dot, index) => {
            const isActive = index === activeDotIndex2
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

    const rendertopic = ({ item, index }: any) => {
        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                <FlatList
                    data={item.category_1_list}
                    keyExtractor={(category) => category.id}
                    horizontal={true}
                    renderItem={({ item: category }) => {
                        return (
                            <TouchableOpacity style={{ marginHorizontal: 10 }}>
                                <View style={styles.Item}>
                                    <View style={styles.BoxItemImage}>
                                        <Image source={{ uri: category.icon }} style={{ width: 33, height: 31 }} />
                                    </View>
                                    <Text style={styles.TextItem}>{category.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        )
    }
    const handleAddToCart = (item: any) => {
        const existingProduct: any = addSP.filtered(`id == '${item.product_id}'`)[0]
        if (existingProduct) {
            realmHS.write(() => {
                existingProduct.soluong += 1
            })
        } else {
            const product = dataProduct.find((productItem: any) => productItem.product_id === item.product_id)
            const price = parseFloat(product.price)
            addSPStore(item.product_id, 1, price)
        }
        console.log('Sản phẩm đã được thêm vào cơ sở dữ liệu Realm.')
    }


    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex2 = (currentIndex2 + 1) % DataImg2.length
            setCurrentIndex2(nextIndex2)
            setActiveDotIndex2(nextIndex2)
            flatListRef2.current.scrollToIndex({ index: nextIndex2 })
        }, 3000)
        return () => clearInterval(timer)
    }, [currentIndex2])

    useEffect(() => {
        const fetchData = async () => {
            await getAPIandDOMAIN({ setAPIkey, setDomain }).then(() => {
                if (APIkey != null && Domain != null) {
                    getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
                    getAPIShop()
                }
            })
        }
        fetchData()
    }, [APIkey, Domain])

    const getAPIShop = async () => {
        if (APIkey && Domain) {
            try {
                const response = await axios.post(apiProductlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataProduct = response.data.data.l
                    const icontopic1 = response.data.data.theme
                    setdataProduct(dataProduct)
                    setdataicontopic1(icontopic1)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const loadMoreData = async () => {
        if (loadingmore) return

        try {
            setloadingmore(true)

            const newPage = currentPage + 1
            const newFormData = new FormData()
            newFormData.append('app_name', 'khttest')
            newFormData.append('page', newPage)
            // newFormData.append('for_point', 0)
            const response = await axios.post(apiProductlist, newFormData, {
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                },
            })

            if (response.status === 200) {
                const newData = response.data.data.l
                setdataProduct((prevData: any) => [...prevData, ...newData])
                setCurrentPage(newPage)
            } else {
                throw new Error('Network response was not ok')
            }
        } catch (error) {
            console.error('There was a problem with the operation:', error)
        } finally {
            setloadingmore(false)
        }
    }

    return (

        <View style={styles.backgr}>
            <SearchAnimation translateY={translateY} Domain={Domain} APIkey={APIkey} />
            <Animated.ScrollView showsVerticalScrollIndicator={false} onScroll={scrollHandler} pagingEnabled={pagingEnabled} fadingEdgeLength={100}>
                <View style={{ width: '100%', marginTop: 15 }}>
                    <FlatList
                        ref={flatListRef}
                        data={dataicontopic1.slice(2, 3)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItemImg}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <View style={styles.BoxItem}>
                        <FlatList
                            data={dataicontopic1.slice(0, 1)}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            renderItem={rendertopic}
                        />
                    </View>
                </View>
                {/* <View style={{ marginBottom: 20 }}>
                    <FlatList
                        data={dataicontopic1}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={rendertest}
                    />
                </View> */}
                <View style={styles.muc}>
                    <Text style={styles.title}>SẢN PHẨM BÁN CHẠY</Text>
                    <Image source={require('../Icon/arrow.png')} style={{ height: 13, width: 7, marginRight: 5 }} />
                </View>
                <View style={{ width: '100%', height: 250 }}>
                    <FlatList
                        data={dataicontopic1}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTopItem}
                        scrollEnabled={false}
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
                <View style={{ marginTop: 10, width: '100%', marginBottom: 100 }}>
                    <FlatList
                        data={dataProduct}
                        keyExtractor={(item) => item.product_id}
                        renderItem={renderSP}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        scrollEnabled={false}
                        initialNumToRender={1}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.1}
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
        backgroundColor: 'white',
        width: '98%',
        elevation: 4,
        borderRadius: 10,
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
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        height: 30
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