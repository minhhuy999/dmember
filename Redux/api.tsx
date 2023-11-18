import axios from "axios";

const apikeyDoimain = 'https://init.sees.vn/appconfig_v2/api/init?apikey=l0913lkjlkLKDKSAPPlCONFIGS'
const formData = new FormData()
formData.append('app_name', 'khttest')

export const APIkeyDomain = async () =>{
    const response = await axios.post(
        apikeyDoimain, formData,{
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
            },
        }
    )
    return response.data.data
}

export const getPosts = async () =>{
    const apiKeyData = await APIkeyDomain()
    const apiProductlist = `${apiKeyData.main_domain}client_product/list_all?apikey=${apiKeyData.apikey}`
    const response = await axios.post(
        apiProductlist, formData ,
        {
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data.data.l;
}

export const getApiPonit = async () =>{
    const apiKeyData = await APIkeyDomain()
    const apiNew = `${apiKeyData.main_domain}/client_news/list_all?apikey=${apiKeyData.apikey}`
    const response = await axios.post(
        apiNew, formData ,
        {
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data.data.l;
}


