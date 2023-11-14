import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getAPIKeyAndDomainFromStorage } from '../../AsysncStorage/AsysncAPI';
import axios from 'axios';
import moment from 'moment';

const ScreenTintuc = () => {

    const navigation: any = useNavigation();
    const [APIkey, setAPIkey] = useState<any>(null)
    const [Domain, setDomain] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataNew, setdataNew] = useState<any>([])
    const [firtname, setfirtname] = useState('')
    const [firstimg, setfirstimg] = useState('')
    const [firstday, setfirstday] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const formData = new FormData()
    formData.append('app_name', 'khttest')
    formData.append('page', currentPage)
    const apiNewlist = `${Domain}/client_news/list_all?apikey=${APIkey}`

    const dataNews = [
        {
            id: '1',
            name: 'DSTORE Hồ Chí Minh tổng kết và vinh danh tháng 2/2022',
            img: require('../../Image/News2.png'),
            time: '22:46 12/03/2022',
        },
        {
            id: '2',
            name: 'Nâng cấp chất lượng nhân sự phục vụ vận hành “bộ máy” kinh doanh của doanh nghiệp',
            img: require('../../Image/News3.png'),
            time: '22:46 12/03/2022',
        },
        {
            id: '3',
            name: 'Hồ Huỳnh Duy - Chủ tịch HĐQT Công ty Dstore - Đột phá kinh doanh trực tuyến',
            img: require('../../Image/News4.png'),
            time: '22:46 12/03/2022',
        }
    ]

    const renderNews = ({ item, index }: any) => {
        const formattedDate = moment.unix(item.created_at).format('d DD/MM/YYYY HH:mm');
        return (
            <TouchableOpacity
                onPress={()=>navigation.navigate('ScreenDtNews',{item})}
                style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', borderRadius: 10, marginBottom: 8, elevation: 3 }}>
                <View style={{ width: '71%', paddingHorizontal: 22, paddingVertical: 8, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: 'black' }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Thu {formattedDate}</Text>
                        <Image source={require('../../IconUser/user.png')} style={{ height: 16, width: 16, marginLeft: 20 }} />
                        <Text style={{ marginLeft: 10, color: color.organrelow }}>{item.views}</Text>
                    </View>
                </View>
                {item.avatar == "" ? <View style={{ borderRadius: 10, height: 94, width: 103, backgroundColor: 'gray' }} /> :
                    <Image source={{ uri: item.avatar }} style={{ borderRadius: 10, height: 94, width: 103 }} />}
            </TouchableOpacity>
        )
    }


    useEffect(() => {
        getAPIKeyAndDomainFromStorage({ setAPIkey, setDomain })
        getAPINew()
    }, [APIkey, Domain])

    const getAPINew = async () => {
        if (APIkey && Domain) {
            try {
                const response = await axios.post(apiNewlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                })
                if (response.status === 200) {
                    const Newlist = response.data.data.l
                    setdataNew(Newlist.reverse())
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
            setIsLoading(true); // Set loading state to prevent multiple requests
            try {
                const nextPage = currentPage + 1;
                const formData = new FormData();
                formData.append('app_name', 'khttest');
                formData.append('page', nextPage);
                const response = await axios.post(apiNewlist, formData, {
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                });
                if (response.status === 200) {
                    const newData = response.data.data.l;
                    // setdataNew((prevData: any) => [...prevData, ...newData]);
                    setdataNew((prevData: any) => {
                        // Kết hợp dữ liệu mới và dữ liệu cũ
                        const combinedData = [...prevData, ...newData];
                        // Sắp xếp danh sách theo trường 'views' từ lớn đến nhỏ
                        combinedData.sort((a, b) => b.created_at - a.created_at);
                        return combinedData;
                    });
                    setCurrentPage(nextPage);
                    if (dataNew.length > 0) {
                        const firstName = dataNew[0].name
                        const firstImg = dataNew[0].avatar
                        const firstday =dataNew[0].created_at
                        setfirtname(firstName)
                        setfirstimg(firstImg)
                        setfirstday(moment.unix(firstday).format('d DD/MM/YYYY HH:mm'))
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('There was a problem with the operation:', error);
            } finally {
                setIsLoading(false); // Reset loading state
            }
        }
    };

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

    return (
        <ScrollView style={styles.backgr} showsVerticalScrollIndicator={false}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 10 }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Tin tức</Text>
            </View>
            <Text style={{ marginVertical: 10, color: 'black', fontSize: 24, fontWeight: '400' }}>Tin mới nhất</Text>
            <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 15, alignItems: 'center', elevation: 3 }}>
                {firstimg == "" ? <View style={{ width: 353, height: 166, borderRadius: 15, backgroundColor: 'gray' }} /> :
                    <Image source={{ uri: firstimg }} style={{ width: 353, height: 166, borderRadius: 15 }} />}
                <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', color: 'black' }}>{firtname}</Text>
                    <Text>Thu {firstday}</Text>
                </View>
            </View>
            <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '400' }}>Tin khác</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={dataNew.slice(1)}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderNews}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            </View>
        </ScrollView>
    )
}

export default ScreenTintuc

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
        paddingTop: 10,
        paddingBottom: 20
    },
    title: {
        color: 'black',
        fontSize: 21,
        fontWeight: '500'
    },
    loadingContainer: {
        padding: 16,
        alignItems: 'center',
    },
})