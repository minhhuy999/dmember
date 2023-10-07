import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Color/color'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import CheckBox from '@react-native-community/checkbox'
import realmHS from '../../Realm/realmHistoryS'
import { addMember, loadAddMember, removeMB } from '../../Realm/StorageServices'


const ScreenChuyenTien = ({ navigation }: any) => {

    const [memberCount, setMemberCount] = useState(0)
    const [DataMemBer, setDataMemBer] = useState([])
    const navigationGoback = useNavigation()
    const AddMB = realmHS.objects('AddMember')

    const datamember = [
        {
            id: '1',
            avata: require('../../Image/LKN.png'),
            name: 'Lê Kim Ngân',
            phone: '0839020007',
        },
        {
            id: '2',
            avata: require('../../Image/Dstore.png'),
            name: 'Thanh toán Dstore Hồ Chí Minh',
            phone: '1500015000',
        },
        {
            id: '3',
            avata: require('../../Image/Global.png'),
            name: 'Dstore Global',
            phone: '190070030',
        },
        {
            id: '4',
            avata: require('../../Image/LAU.png'),
            name: 'Lê Ánh Uyên',
            phone: '0839020007',
        },
    ]

    useEffect(() => {
        AddMB.addListener(listener)
        updateCheckboxState()
        return () => {
            AddMB.removeListener(listener)
        }
    }, [])

    const listener = (newTasks: any) => {
        loadAddMember()
            .then((tasks: any) => {
                setSelectedMembers(tasks.map((member: any) => member.id))
                setDataMemBer(tasks)
                setMemberCount(tasks.length - 2)
                console.log(AddMB)
            })
    }

    const updateCheckboxState = () => {
        const updatedDataMemBer:any = [...datamember] // Tạo một bản sao của danh sách thành viên
        updatedDataMemBer.forEach((item:any) => {
            item.isSelected = selectedMembers.includes(item.id)
        })
    }


    const [selectedMembers, setSelectedMembers] = useState<string[]>([])

    const toggleMemberSelection = (id: string) => {
        if (selectedMembers.includes(id)) {
            // Xóa thành viên khỏi Realm khi checkbox bị tắt
            removeMB(id).then(() => {
                console.log('Member đã được xóa khỏi cơ sở dữ liệu Realm.')
                setSelectedMembers((prevSelected) =>
                    prevSelected.filter((memberId) => memberId !== id)
                )
            })
        } else {
            // Thêm thành viên vào Realm khi checkbox được bật
            addMember(id).then(() => {
                console.log('Member đã được thêm vào cơ sở dữ liệu Realm.')
                setSelectedMembers((prevSelected) => [...prevSelected, id])
            })
        }
    }


    const rendermember = ({ item, index }: any) => {

        const isSelected = selectedMembers.includes(item.id)

        return (
            <View style={styles.rendermember}>
                <Image source={item.avata} style={{ marginLeft: 10, borderRadius: 41, height: 42, width: 42 }} />
                <View style={{ marginLeft: 15, flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>{item.name}</Text>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.50)', fontSize: 12, fontWeight: '400' }}>{item.phone}</Text>
                </View>
                <CheckBox
                    disabled={false}
                    value={isSelected}
                    onValueChange={() => toggleMemberSelection(item.id)}
                    tintColors={{ true: 'black', false: 'black' }}
                />
            </View>
        )
    }

    const renderAddmember = ({ item, index }: any) => {
        const member: any = datamember.find((mb) => mb.id === item.id)
        if (index < 2) {
            const truncatedName = member.name.length > 12 ? member.name.slice(0, 12) + '...' : member.name
            return (
                <View style={styles.renderadd}>
                    <Image source={member.avata} style={{ width: 38, height: 38, borderRadius: 38 }} />
                    <Text style={{ color: 'black', fontSize: 10, fontWeight: '500' }}>{truncatedName}</Text>
                </View>
            )
        } else if (index == 2) {
            return (
                <View style={styles.renderadd}>
                    <View style={styles.rendertotal}>
                        <Text>+{memberCount}</Text>
                    </View>
                    <Text style={{ color: 'black', fontSize: 10, fontWeight: '500' }}></Text>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }



    return (
        <View style={styles.backgr}>
            <View style={styles.BoxTitile}>
                <TouchableOpacity onPress={() => navigationGoback.goBack()} style={{ position: 'absolute', left: 0, top: 10, paddingHorizontal: 20, }}>
                    <Image source={require('../../Icon/arrowback.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Chuyển Dcash</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingHorizontal: 20, }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', width: '90%', paddingLeft: 20, borderRadius: 5, alignItems: 'center' }}>
                    <Image source={require('../../Icon/search.png')} />
                    <TextInput placeholder='Nhập tên, sđt, email người nhận' style={{ paddingLeft: 10 }}></TextInput>
                </View>
                <TouchableOpacity>
                    <Image source={require('../../Icon/Plus.png')} style={{ height: 31, width: 31, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            <Text style={{ marginVertical: 20, color: 'black', fontSize: 17, fontWeight: '400', paddingHorizontal: 20, }}>Danh sách thành viên</Text>
            <View style={{ flex: 1, paddingHorizontal: 20, }}>
                <FlatList
                    data={datamember}
                    keyExtractor={(item) => item.id}
                    renderItem={rendermember}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={{ backgroundColor: 'white', padding: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={AddMB}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={renderAddmember}
                        horizontal={true}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenChTienB2')} style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, width: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScreenChuyenTien

const styles = StyleSheet.create({
    backgr: {
        flex: 1,
        backgroundColor: color.background,

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
    renderadd: {
        alignItems: 'center', justifyContent: 'center',
        width: 70,
        marginRight: 2
    },
    rendertotal: {
        width: 38, height: 38,
        borderRadius: 38,
        backgroundColor: color.bluemedium,
        justifyContent: 'center', alignItems: 'center'
    },
    rendermember: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 8
    }
})