import axios from "axios";

const apiUrl = 'https://init.sees.vn/appconfig_v2/api/init?apikey=l0913lkjlkLKDKSAPPlCONFIGS';

const formData = new FormData();
formData.append('app_name', 'khttest');

export const getPosts = () => {
    return axios.post(apiUrl , {
        headers: {
            Accept: 'application/x-www-form-urlencoded',
        },
        body: formData,
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Lỗi trong quá trình gửi FormData:", error);
            throw error;
        });
};