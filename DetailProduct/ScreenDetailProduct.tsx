import { StyleSheet, FlatList, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import color from '../Color/color'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import realmHS from '../Realm/realmHistoryS'
import { addSPStore } from '../Realm/StorageServices'
import Card from './AnimatedDetailPd/Card'
import { getAPIKeyAndDomainFromStorage } from '../AsysncStorage/AsysncAPI'
import axios from 'axios'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'

const ScreenDetailProduct = ({ route }: any) => {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    const [soLuong, setSoLuong] = useState<any>(1)
    const scrollViewRef: any = useRef(null)
    const addSP = realmHS.objects('AddProduct')
    const navigation: any = useNavigation()
    const { item } = route.params || {}

    const [APIkey, setAPIkey] = useState<any>(null)
    const [Domain, setDomain] = useState<any>(null)
    const formData = new FormData()
    formData.append('app_name', 'khttest')
    formData.append('id', item.product_id)

    const apiProductlist = `${Domain}/client_product/detail?apikey=${APIkey}`
    const [imageUrls, setImageUrls] = useState<any>([])

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

    const tangSoLuong = () => {
        setSoLuong(soLuong + 1)
    }
    const giamSoLuong = () => {
        if (soLuong > 1) {
            setSoLuong(soLuong - 1)
        }
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
                    <View style={styles.Add}>
                        <Text style={{ color: 'white' }}>+</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    // const renderImgmore = ({ item, index }: any) => {
    //     return (
    //         <Image source={item.img} style={{ width: 100, height: 252 }} />
    //     )
    // }

    // const scrollToTop = () => {
    //     scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
    // }

    const handleAddToCart = (item: any) => {
        const existingProduct: any = addSP.filtered(`id == '${item.product_id}'`)[0]
        if (existingProduct) {
            realmHS.write(() => {
                existingProduct.soluong += soLuong
            })
        } else {
            const price = parseFloat(item.price);
            addSPStore(item.product_id, soLuong, price)
        }
        console.log('Sản phẩm đã được thêm vào cơ sở dữ liệu Realm.')
    }

    useEffect(() => {
        getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getAPIDetail()
        }, [APIkey, Domain])
    )

    const getAPIDetail = async () => {
        if (APIkey && Domain) {
            try {
                const response = await axios.post(apiProductlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const dataProduct = response.data.data
                    const imageUrls = []
                    if (dataProduct.img_1) {
                        imageUrls.push(dataProduct.img_1)
                    }
                    if (dataProduct.img_2) {
                        imageUrls.push(dataProduct.img_2)
                    }
                    if (dataProduct.img_3) {
                        imageUrls.push(dataProduct.img_3)
                    }
                    if (dataProduct.img_4) {
                        imageUrls.push(dataProduct.img_4)
                    }
                    if (dataProduct.img_5) {
                        imageUrls.push(dataProduct.img_5)
                    }
                    if (dataProduct.img_6) {
                        imageUrls.push(dataProduct.img_6)
                    }
                    setImageUrls(imageUrls)
                } else {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error)
            }
        }
    }

    return (
        <View>
            <ScrollView ref={scrollViewRef}>
                <View style={styles.backgr}>
                    <View style={styles.BoxTitile}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, }}>
                            <Image source={require('../Icon/arrowback.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', right: 80, }}>
                            <Image source={require('../Icon/share.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', right: 40, }}>
                            <Image source={require('../Icon/down.png')} style={{ height: 20, width: 18 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', right: 0, }} onPress={() => navigation.navigate('ScreenStore', { Domain, APIkey })}>
                            <Image source={require('../Icon/cart.png')} style={{ width: 26, height: 25 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 330, alignItems: 'center' }}>
                        <View style={{ width: 302, height: 279, borderRadius: 40, borderWidth: 2, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 320, height: 140, backgroundColor: color.background, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 151, height: 290, backgroundColor: color.background, justifyContent: 'center', alignItems: 'center' }}></View>
                            </View>
                        </View>
                        {imageUrls.length > 0 ? (
                            <Card data={imageUrls} maxVisibleItems={3} />
                        ) : (
                            <ShimmerPlaceholder style={styles.loadimage}
                                shimmerColors={['#564d4d', '#8e8e8e', '#564d4d']} />
                        )}
                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                            <Text style={{ color: 'black', fontSize: 21, fontWeight: '400' }}>Giá bán: </Text>
                            <Text style={{ color: 'white', fontSize: 21, fontWeight: '600' }}>{item?.price}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 100, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={giamSoLuong} style={styles.Boxtotal}>
                                    <Text style={styles.Texttotal}>-</Text>
                                </TouchableOpacity>
                                <Text style={{ paddingHorizontal: 10, color: 'black', fontSize: 17, fontWeight: '500' }}>{soLuong}</Text>
                                <TouchableOpacity onPress={tangSoLuong} style={styles.Boxtotal}>
                                    <Text style={styles.Texttotal}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={styles.ButtonThem} onPress={() => handleAddToCart(item)}>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                                        Thêm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, width: '100%', marginBottom: 20, paddingHorizontal: 15 }}>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={styles.muc}>{item?.product_name}</Text>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <View style={{ height: 1, width: '80%', backgroundColor: color.graymedium, marginVertical: 10 }}></View>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View style={{ height: '100%', width: '60%' }}>
                                        <Text style={styles.textDetail}>Giá bán</Text>
                                        <Text style={styles.textDetail}>Giá nhập</Text>
                                        <Text style={styles.textDetail}>Chiết khấu</Text>
                                        <Text style={styles.textDetail}>Hoa hồng thành viên cũ</Text>
                                        <Text style={styles.textDetail}>Hoa hồng thành viên mới</Text>
                                    </View>
                                    <View style={{ height: '100%', width: '40%' }}>
                                        <Text style={{ textAlign: 'right', color: 'black', fontSize: 15, fontWeight: '600', paddingTop: 10 }}>{item?.price}</Text>
                                        <Text style={{ textAlign: 'right', color: 'black', fontSize: 15, fontWeight: '600', paddingTop: 10 }}>309,375</Text>
                                        <Text style={{ textAlign: 'right', color: color.blue, fontSize: 15, fontWeight: '600', paddingTop: 10 }}>{item?.price_cal_commission}</Text>
                                        <Text style={{ textAlign: 'right', color: color.green, fontSize: 15, fontWeight: '600', paddingTop: 10 }}>12,375</Text>
                                        <Text style={{ textAlign: 'right', color: color.green, fontSize: 15, fontWeight: '600', paddingTop: 10 }}>12,375</Text>
                                    </View>
                                </View>
                                <View style={{ height: 1, width: '80%', backgroundColor: color.graymedium, marginTop: 10 }}></View>
                            </View>
                        </View>
                        <View style={{ width: '100%', padding: 10, }}>
                            <Text style={styles.muc}>Công dụng</Text>
                            <Text style={styles.textDetail}>Nước tẩy trang có khả năng làm sạch mạnh mẽ, đánh bay lớp trang điểm cứng đầu nhưng vẫn đảm bảo an toàn, không gây kích ứng cho những vùng da nhạy cảm như mắt, môi. Không những làm sạch mà nước tẩy trang còn giúp nuôi dưỡng, bổ sung độ ẩm, giúp da khỏe mạnh. Ngoài ra, sản phẩm còn có khả năng chống rụng mi và nuôi dưỡng môi mềm mịn. Thích hợp cho mọi loại da.</Text>
                        </View>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={styles.muc}>Thành phần nổi bật</Text>
                            <Text style={styles.textDetail}>Nước, Glycerin, PEG-6 Caprylic, PEG-60 Hydrogenated Castor Oil, Allantoin, Disodium EDTA, Citrus Limon (Lemon) Fruit Extract, Water, Propanediol, Butylene Clycol, Citrus Paradisi (Bưởi), Rosa Damascena Flower Water, Caprylic/Capric Triglyceride, Dầu trái cây Olea Europaea (Ôliu), Hydrogenated Lecithin.</Text>
                        </View>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={styles.muc}>Cách dùng</Text>
                            <Text style={styles.textDetail}>Lắc đều sản phẩm trước khi sử dụng. Cho dung dịch ra bông cotton rồi đặt vào vùng mắt, để vài giấy sau đó vuốt nhẹ xuống dưới để làm sạch lớp mascara và phấn mắt. Tương tự cho vùng mặt và môi. Sau đó rửa sạch lại với nước sạch.</Text>
                        </View>
                    </View>
                    <View style={styles.textchucnang}>
                        <Text style={styles.title}>SẢN PHẨM CÙNG DANH MỤC</Text>
                    </View>
                    <View style={{ width: '100%', height: 250 }}>
                        <FlatList
                            data={SanPham}
                            keyExtractor={(item) => item.id}
                            renderItem={renderTopItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.textchucnang}>
                        <Text style={styles.title}>BÀI VIẾT MẪU</Text>
                    </View>
                    <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 30, padding: 15 }}>
                        <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                            <Image source={require('../IconUser/avata.png')} />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={styles.muc}>Mỹ phẩm Milky Dress</Text>
                                <Text style={styles.textDetail}>17/06/2022, 17:50</Text>
                            </View>
                        </View>
                        <Text style={styles.muc}>Nước tẩy trang làm sạch, khỏe da - Dearanchy-Purifying Pure - Cleasing Water</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                            <Image source={require('../Icon/hand.png')} style={{ width: 20, height: 20 }} />
                            <Text style={{ fontSize: 15, color: 'black', fontWeight: '400', marginHorizontal: 10 }}>Giá ưu đãi:</Text>
                            <Text style={{ color: 'red', fontSize: 15, fontWeight: '600' }}>412,500đ</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                            <Image source={require('../Icon/traitim.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                            <Text style={styles.muc}>VÌ SAO BẠN SẼ THÍCH?</Text>
                        </View>
                        <Text style={styles.textDetail}>Nước tẩy trang Dearanchy-Purifying Pure có công thức được lựa chọn kĩ càng với các thành phần làm sạch dịu nhẹ phù hợp cho da dầu và da mụn nhạy cảm. Sản phẩm nhẹ nhàng loại bỏ độc tố cho da nhờ vào các hoạt chất làm sạch được chọn lọc cho làn da nhạy cảm, đồng thời loại bỏ bã nhờn dư thừa, mang lại làn da sạch và thoáng mát.</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                            <Image source={require('../Icon/co4la.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                            <Text style={styles.muc}>ƯU ĐIỂM NỔI BẬT</Text>
                        </View>
                        <Text style={styles.textDetail}>👉 Làm sạch đến 99% lớp trang điểm, 70% mascara và các hạt bụi siêu nhỏ có trong khói xe và môi trường ô nhiễm chỉ sau một lượt bông cotton*. 👉 Cung cấp độ ẩm và giảm ma sát tối đa khi làm sạch. 👉 Chống oxy hóa, giúp bảo vệ da trước môi trường ô nhiễm.</Text>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ height: 1, width: '80%', backgroundColor: color.graymedium, marginVertical: 10 }}></View>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../Icon/downImg.png')} style={{ width: 17, height: 17, marginRight: 10, marginVertical: 10 }} />
                                <Text style={styles.textDetail}>Tải ảnh</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../Icon/link.png')} style={{ width: 17, height: 17, marginRight: 10, marginVertical: 10 }} />
                                <Text style={styles.textDetail}>Sao chép</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../Icon/post.png')} style={{ width: 17, height: 17, marginRight: 10, marginVertical: 10 }} />
                                <Text style={styles.textDetail}>Đăng bán</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 120 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ScreenBieumau')}
                                style={styles.ButtonTao}>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
                                    Tạo bài viết mẫu
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
                <Image source={require('../Icon/totop.png')} style={{ width: 20, height: 20, borderRadius: 2 }} />
            </TouchableOpacity> */}
        </View>
    )
}

export default ScreenDetailProduct

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20,
    },
    BoxTitile: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
        height: 70,
        marginBottom: 20,
    },
    title: {
        color: 'black',
        fontSize: 21,
        fontWeight: '500'
    },
    ItemTopSP: {
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
    muc: {
        color: 'black',
        fontSize: 17,
        fontWeight: '700'
    },
    textDetail: {
        color: 'black',
        textAlign: 'justify',
        fontSize: 15,
        paddingTop: 10,
    },
    scrollButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 5,
    },
    Boxtotal: {
        width: 24, height: 24, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 7
    },
    Texttotal: {
        color: 'black', fontSize: 17, fontWeight: '500'
    },
    ButtonThem: {
        backgroundColor: 'black',
        width: 150,
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
    },
    ButtonTao: {
        backgroundColor: 'black',
        width: 200,
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
    },
    textchucnang: {
        justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 20
    },
    loadimage:{
        width: 250, height: 250, 
        position: 'absolute', top: 15, 
        borderRadius: 20 
    }
})