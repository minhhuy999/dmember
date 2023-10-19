import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const apiUrl = 'https://init.sees.vn/appconfig_v2/api/init?apikey=l0913lkjlkLKDKSAPPlCONFIGS'
const formData = new FormData()
formData.append('app_name', 'khttest')

export const getAPIandDOMAIN = async ({ setAPIkey, setDomain }: any) => {
    AsyncStorage.multiGet(['APIkey', 'MainDomain'])
        .then((storedData) => {
            const storedAPIkey = storedData[0][1]
            const storedMainDomain = storedData[1][1]

            if (storedAPIkey && storedMainDomain) {
                setAPIkey(storedAPIkey)
                setDomain(storedMainDomain)
            } else {
                // Nếu chưa có trong AsyncStorage, thì gọi API và lưu vào AsyncStorage
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/x-www-form-urlencoded',
                    },
                    body: formData,
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok')
                        }
                        return response.json()
                    })
                    .then((data) => {
                        console.log('API Key:', data.data.apikey)
                        console.log('Main Domain:', data.data.main_domain)
                        setAPIkey(data.data.apikey)
                        setDomain(data.data.main_domain)
                        // Lưu API key và Main Domain vào AsyncStorage
                        AsyncStorage.multiSet([['APIkey', data.data.apikey], ['MainDomain', data.data.main_domain]])
                    })
                    .catch((error) => {
                        console.error('There was a problem with the fetch operation:', error)
                    })
            }
        })
        .catch((error) => {
            console.error('AsyncStorage error:', error)
        })
}

export const getAPIKeyAndDomainFromStorage = async ({ setAPIkey, setDomain }: any) => {
    try {
        const [apiKey, mainDomain] = await AsyncStorage.multiGet(['APIkey', 'MainDomain']);
        const storedAPIKey = apiKey[1];
        const storedMainDomain = mainDomain[1];

        if (storedAPIKey && storedMainDomain) {
            setAPIkey(storedAPIKey)
            setDomain(storedMainDomain)
        } else {
            console.log('Không có dữ liệu trong AsyncStorage.');
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
    }
}

// export const getAPIandDOMAIN = async ({ setAPIkey, setDomain }: any) => {
//     // Thực hiện yêu cầu lấy dữ liệu từ API
//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/x-www-form-urlencoded',
//             },
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log('API Key:', data.data.apikey);
//         console.log('Main Domain:', data.data.main_domain);
//         setAPIkey(data.data.apikey);
//         setDomain(data.data.main_domain);
//     } catch (error) {
//         console.error('There was a problem with the operation:', error);
//     }
// };
