import AsyncStorage from "@react-native-async-storage/async-storage"


export const retrieveUserData = async () => {
    try {
        const userDataJSON = await AsyncStorage.getItem('loggedInUser')
        if (userDataJSON) {
            const userData = JSON.parse(userDataJSON)
            return userData
        }
        return null // Return null if no data is found
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu người dùng:', error)
        return null // Return null in case of an error
    }
}

export const saveUserDataToStorage = async (userData: any) => {
    try {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(userData))
        return userData // Return the saved user data
    } catch (error) {
        console.error('Lỗi khi lưu tài khoản người dùng:', error)
        return null // Return null in case of an error
    }
}

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('loggedInUser')
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error)
    }
}