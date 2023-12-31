import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import color from '../Color/color'
import { useNavigation } from '@react-navigation/native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { addSPStore, addTask, getListTasks, removeAllTask, removeTask } from '../Realm/StorageServices'
import realmHS from '../Realm/realmHistoryS'
import unidecode from 'unidecode'
import Animated, { Extrapolate, FadeIn, FadeInDown, FadeOut, Layout, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import axios from 'axios'
import { getAPIKeyAndDomainFromStorage } from '../AsysncStorage/AsysncAPI'

const ScreenSproduct = ({ navigation }: any) => {

    const navigationGoback = useNavigation()
    const [name, setName] = useState('')

    const [tasks, setTasks]: any = useState([])

    const addSP = realmHS.objects('AddProduct')
    const History: any = realmHS.objects('HistorySreach')

    const initialMode = useRef<boolean>(true)
    const [searchHistory, setsearchHistory] = useState(false)
    const [animateHistory, setAnimateHistory] = useState(true)
    const [sortedHistory, setSortedHistory] = useState([])
    const [showAnimatedBox, setShowAnimatedBox] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [showList, setShowList] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [dataProduct, setDataProduct] = useState<any>([])
    const [dataSearch, setdataSearch] = useState<any>([])
    const [searchedOnce, setSearchedOnce] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [APIkey, setAPIkey] = useState<any>(null)
    const [Domain, setDomain] = useState<any>(null)
    const formData = new FormData()
    formData.append('app_name', 'khttest')
    formData.append('page', currentPage)
    const apiProductlist = `${Domain}/client_product/list_all?apikey=${APIkey}`

    const scale = useSharedValue(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowList(true)
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
        getAPIShop()
    }, [APIkey, Domain])

    useEffect(() => {
        initialMode.current = false
        History.addListener(listener)
        if (!searchedOnce && dataProduct.length > 0 && name == '') {
            handleSearch()
        }
        return () => {
            History.removeListener(listener)
        }
    }, [dataProduct, searchedOnce,])

    useEffect(() => {
        if (searchHistory == true) {
            handleSearch()
            setsearchHistory(false)
        }
    }, [searchHistory])

    const getAPIShop = async () => {
        if (APIkey && Domain) {
            try {
                const response = await axios.post(apiProductlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataProduct1 = response.data.data.l
                    setDataProduct(dataProduct1)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const loadMoreData = async () => {
        if (APIkey && Domain && !isLoading) {
            setIsLoading(true) // Set loading state to prevent multiple requests
            try {
                const nextPage = currentPage + 1
                const formData = new FormData()
                formData.append('app_name', 'khttest')
                formData.append('page', nextPage)
                const response = await axios.post(apiProductlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const newData = response.data.data.l
                    setDataProduct((prevData: any) => [...prevData, ...newData])
                    setCurrentPage(nextPage)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            } finally {
                setIsLoading(false) // Reset loading state
            }
        }
    }


    const renderFooter = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="black" />
                </View>
            )
        }
        return null
    }
    const renderSP = ({ item, index }: any) => {
        const price = parseFloat(item.price)
        const pricecal = parseFloat(item.price_cal_commission)
        const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        const formattedDiscount = pricecal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ScreenDetailProduct', { item })}>
                <Animated.View
                    key={item.product_id}
                    entering={FadeIn.delay(50 * index)}
                    exiting={FadeOut}
                    layout={Layout.delay(50)}
                    style={{ elevation: 5, backgroundColor: 'white', height: 229, width: 169, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, marginRight: 15, marginBottom: 15 }}
                // from={{ opacity: 0, translateX: 50, translateY: 50 }}
                // animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                // transition={{ delay: index * 200 }}
                >
                    <Image source={{ uri: item.img_1 }} style={{ height: 130, width: 132, borderRadius: 5 }} />
                    <Text style={styles.ItemnameSP}>{limitText(item.product_name, 50)}</Text>
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
                </Animated.View>
            </TouchableOpacity>
        )
    }
    const renderHistory = ({ item, index }: any) => {
        if (animateHistory) {
            return (
                <Animated.View
                    key={item.id}
                    entering={FadeInDown}
                    exiting={FadeOut}
                    layout={Layout.delay(100)}
                >
                    <TouchableOpacity
                        style={styles.itemrenderHistoty}
                        onPress={() => handleHistoryItemClick(item.name)}>
                        <Image source={require('../Icon/historySearch.png')} />
                        <Text style={{ marginLeft: 20, flex: 1 }}>{item.name}</Text>
                        <TouchableOpacity onPress={() => handleDeleteHistory(item.id)}>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Animated.View>
            )
        } else {
            return null
        }
    }

    const listener = () => {
        getListTasks()
            .then(({ tasks, id }: any) => {
                setTasks(tasks)
                // Đảo ngược danh sách History
                const reversedHistory: any = [...History].reverse()
                // Loại bỏ mục cụ thể dựa trên id
                const updatedHistory: any = reversedHistory.filter((item: any) => item.id !== id)
                // Lấy 3 mục đầu tiên sau khi loại bỏ
                const slicedHistory = updatedHistory.slice(0, 3)
                // Cập nhật sortedHistory và kích hoạt animation
                setSortedHistory(slicedHistory)
                setAnimateHistory(true)
            })
    }
    const handleHistoryItemClick = (itemName: string) => {
        setName(itemName)
        setsearchHistory(true)
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
        scale.value = withSpring(1, { duration: 1500 }, () => {
            scale.value = withTiming(0)
        })
        setShowAnimatedBox(true)
        setIsPlaying(true)

        setTimeout(() => {
            setIsPlaying(false)
        }, 1500)

        console.log('Sản phẩm đã được thêm vào cơ sở dữ liệu Realm.')
    }
    const handleDeleteHistory = (id: string) => {
        removeTask(id)
    }
    function limitText(text: any, maxLength: any) {
        if (text.length <= maxLength) {
            return text
        }
        return text.slice(0, maxLength) + '...'
    }

    const rStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scale.value, [0, 1], [0, 1], Extrapolate.CLAMP),
        display: scale.value === 0 ? 'none' : 'flex',
    }))

    const filteredProducts = dataProduct.filter((product: any) =>
        unidecode(product.product_name.toLowerCase()).includes(unidecode(name.toLowerCase()))
    )
    const handleSearch = () => {
        setdataSearch(filteredProducts)
    }
    const addHistory = () => {
        if (name != '') {
            addTask(name)
        }
    }
    const searchProducts = () => {
        handleSearch()
        addHistory()
        setSearchedOnce(true)
    }

    return (
        <View style={styles.backgr}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                <View style={styles.BoxSearch}>
                    <Image source={require('../Icon/search.png')} />
                    <TextInput value={name}
                        onChangeText={(text) => setName(text)}
                        style={{ paddingLeft: 10, flex: 1 }}
                        onSubmitEditing={searchProducts}
                        placeholder="Tìm kiếm sản phẩm"
                        returnKeyType="search" >
                    </TextInput>
                </View>
                <TouchableOpacity onPress={() => navigationGoback.goBack()}>
                    <Image source={require('../Icon/X.png')} style={{ height: 17, width: 17, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>Tìm kiếm gần đây</Text>
                    <Text style={{ color: 'red' }} onPress={removeAllTask}>deleted all</Text>
                </View>
                <View>
                    {showList && (
                        <FlatList
                            data={sortedHistory}
                            keyExtractor={(item: any) => item.id.toString()}
                            renderItem={renderHistory}
                            initialNumToRender={1}
                            scrollEnabled={false}
                        />)}
                </View>
                <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '400' }}>Kết quả liên quan</Text>
                <View style={{ width: '100%', }}>
                    <FlatList
                        data={dataSearch}
                        keyExtractor={(item) => item.product_id}
                        renderItem={renderSP}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        initialNumToRender={1}
                        scrollEnabled={false}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                    />
                </View>
            </ScrollView>
            <Animated.View style={[showAnimatedBox ? {} : { display: 'none' }, { alignItems: 'center', justifyContent: 'center', width: 200, height: 100, backgroundColor: 'rgba(225, 225, 225, 0.8)', position: 'absolute', top: 350, left: 100, borderRadius: 20 }, rStyle]}>
                {isPlaying && (
                    <LottieView style={{ width: 100, height: 50 }} source={require('../LottieView/animation_lni9djrn.json')} autoPlay loop={false} />)}
                <Text style={{ color: 'black' }}>Da them san pham</Text>
            </Animated.View>
        </View>
    )
}

export default ScreenSproduct

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20,
    },
    ItemnameSP: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        height: 40
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
    BoxSearch: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '94%',
        paddingLeft: 20, paddingVertical: 3,
        borderRadius: 10,
        alignItems: 'center'
    },
    itemrenderHistoty: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 5
    },
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    taskItem: {
        fontSize: 18,
        marginBottom: 8,
    },
    loadingContainer: {
        padding: 16,
        alignItems: 'center',
    },
})