import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Color/color'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import AniSreenitem from './AnimationList/AniSreenitem'
import axios from 'axios'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getAPIKeyAndDomainFromStorage } from '../AsysncStorage/AsysncAPI'
import { retrieveUserData } from '../AsysncStorage/AsysncUser'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import realmHS from '../Realm/realmHistoryS'
import unidecode from 'unidecode'

const ScreenPoint = () => {

    const navigation: any = useNavigation();

    const dataSPDpoint = realmHS.objects('AddItemDpoint')

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const numberOfRenders = 5
    const renderData = Array.from({ length: numberOfRenders }, (_, index) => index)

    const [name, setName] = useState('')
    const [dataSearch, setdataSearch] = useState<any>([])

    const [APIkey, setAPIkey] = useState<any>(null)
    const [Domain, setDomain] = useState<any>(null)
    const [point, setpoint] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataProduct, setdataProduct] = useState<any>([])

    const formData = new FormData()
    formData.append('app_name', 'khttest')
    formData.append('page', currentPage)
    formData.append('for_point', 1)
    const apiProductlist = `${Domain}/client_product/list_all?apikey=${APIkey}`

    const Item = [
        {
            id: '1',
            img: require('../Image/Boost.png'),
            title: 'Immune Boost',
            note: 'Siêu phẩm tăng cường sức đề kháng toàn diện',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '2',
            img: require('../Image/Dfix.png'),
            title: 'Dfix',
            note: 'Trà giảm cân thiên nhiên',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '3',
            img: require('../Image/CellMask.png'),
            title: 'Brilliant Cell Mask',
            note: 'Mặt nạ tinh chất cô đặc trắng da, mờ thâm',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '4',
            img: require('../Image/Boost.png'),
            title: 'Immune Boost',
            note: 'Siêu phẩm tăng cường sức đề kháng toàn diện',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '5',
            img: require('../Image/Dfix.png'),
            title: 'Dfix',
            note: 'Trà giảm cân thiên nhiên',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '6',
            img: require('../Image/CellMask.png'),
            title: 'Brilliant Cell Mask',
            note: 'Mặt nạ tinh chất cô đặc trắng da, mờ thâm',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '7',
            img: require('../Image/Boost.png'),
            title: 'Immune Boost',
            note: 'Siêu phẩm tăng cường sức đề kháng toàn diện',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '8',
            img: require('../Image/Dfix.png'),
            title: 'Dfix',
            note: 'Trà giảm cân thiên nhiên',
            pointm: '1,790,000 Dpoint'
        },
        {
            id: '9',
            img: require('../Image/CellMask.png'),
            title: 'Brilliant Cell Mask',
            note: 'Mặt nạ tinh chất cô đặc trắng da, mờ thâm',
            pointm: '1,790,000 Dpoint'
        },
    ]

    const translateY = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateY.value = event.contentOffset.y
    })

    useEffect(() => {
        getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
        gettoken()
        getAPIShop()
    }, [APIkey, Domain])


    useEffect(() => {
        if (dataProduct.length > 0) {
            handleSearch();
        }
    }, [dataProduct])

    const gettoken = async () => {
        const userData = await retrieveUserData()
        if (userData) {
            const { session_token, point } = userData
            setpoint(point)
            formData.append('token', session_token)
        } else {
            setpoint(null)
        }
    }

    const getAPIShop = async () => {
        if (APIkey && Domain) {
            await gettoken()
            try {
                const response = await axios.post(apiProductlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataProduct = response.data.data.l
                    setdataProduct(dataProduct)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    const loadMoreData = async () => {
        if (APIkey && Domain && !loading) {
            setLoading(true); // Set loading state to prevent multiple requests
            try {
                const nextPage = currentPage + 1;
                const formData = new FormData();
                formData.append('app_name', 'khttest');
                formData.append('page', nextPage);
                const response = await axios.post(apiProductlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                });
                if (response.status === 200) {
                    const newData = response.data.data.l;
                    setdataProduct((prevData: any) => [...prevData, ...newData]);
                    setCurrentPage(nextPage);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error);
            } finally {
                setLoading(false); // Reset loading state
            }
        }
    };

    const renderFooter = () => {
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="black" />
                </View>
            )
        }
        return null
    }

    const renderLoadItem = () => {
        return (
            <View style={[styles.BoxItem]}>
                <ShimmerPlaceholder style={{ width: 127, height: 112, borderRadius: 10 }} shimmerColors={['#564d4d', '#8e8e8e', '#564d4d']} />
                <View style={{ width: 240, justifyContent: 'center', padding: 10 }}>
                    <ShimmerPlaceholder style={styles.Texttitle} shimmerColors={['#564d4d', '#8e8e8e', '#564d4d']} />
                    <ShimmerPlaceholder style={styles.TextPointmust} shimmerColors={['#564d4d', '#8e8e8e', '#564d4d']} />
                </View>
            </View>
        )
    }

    const filteredProducts = dataProduct.filter((product: any) =>
        unidecode(product.product_name.toLowerCase()).includes(unidecode(name.toLowerCase()))
    );

    const handleSearch = () => {
        setdataSearch(filteredProducts);
    };

    return (
        <View style={styles.backgr}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Đổi điểm</Text>
                <View style={styles.boxpoint}>
                    <Text style={styles.TextPoint}>{point}</Text>
                    <Image source={require('../Icon/ViPoint.png')} style={{ marginLeft: 8 }} />
                </View>
            </View>
            <View style={styles.boxSearch}>
                <View style={styles.inputSearch}>
                    <Image source={require('../Icon/search.png')} />
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder='Immune Boost'
                        returnKeyType="search"
                        onSubmitEditing={() => handleSearch()}
                        style={{ paddingLeft: 10 }} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenStorePoint', { Domain, APIkey })}>
                    <Image source={require('../Icon/cart.png')} style={{ height: 25, width: 25, marginLeft: 10 }} />
                    {dataSPDpoint.length > 0 && <View style={styles.dotstore}></View>}
                </TouchableOpacity>
            </View>
            <Text style={styles.muc}>Có thể đổi</Text>
            {dataProduct.length === 0 ? ( // Check if dataProduct is an empty array
                <View style={{ flex: 1, marginBottom: 50 }}>
                    <FlatList
                        data={renderData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(index) => index.toString()}
                        renderItem={renderLoadItem}
                    />
                </View>
            ) : (
                <View style={{ flex: 1, marginBottom: 50 }}>
                    <Animated.FlatList
                        data={dataSearch}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <AniSreenitem item={item} index={index} translateY={translateY} />
                            )
                        }}
                        onScroll={scrollHandler}
                        initialNumToRender={1}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                    />
                </View>
            )}
        </View>

    )
}

export default ScreenPoint

const styles = StyleSheet.create({
    backgr: {
        backgroundColor: color.background,
        flex: 1,
        padding: 10,
    },
    titleBox: {
        height: 50, width: '100%',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 21,
        fontWeight: '500',
        fontStyle: 'normal',
        color: 'black',
    },
    TextPoint: {
        color: color.green,
        fontSize: 14,
        fontWeight: '600'
    },
    muc: {
        fontSize: 17,
        fontWeight: '600',
        padding: 10,
        color: 'black',
        paddingVertical: 20
    },
    BoxItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        marginBottom: 15,
    },
    Texttitle: {
        width: 200,
        height: 40,
        marginBottom: 20,
        borderRadius: 20,
    },
    TextPointmust: {
        width: 100,
        height: 20,
        borderRadius: 20,
    },
    boxpoint: {
        flexDirection: 'row',
        backgroundColor: 'white',
        position: 'absolute', right: 12, top: 1,
        padding: 8,
        borderRadius: 20
    },
    boxSearch: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center', alignItems: 'center',
        paddingTop: 10
    },
    inputSearch: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '88%',
        paddingLeft: 20,
        height: 40,
        borderRadius: 10,
        alignItems: 'center'
    },
    loadingContainer: {
        padding: 16,
        alignItems: 'center',
    },
    dotstore: {
        height: 10, width: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        position: 'absolute',
        right: 1,
        top: 10
    },

})