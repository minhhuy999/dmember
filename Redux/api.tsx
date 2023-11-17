import axios from "axios";

export const getPosts = async () =>{
    const response = await axios.post(
        'https://khohangtongtest.sees.vn/erp_khttest/api/client_product/list_all?apikey=KHT-9xxkds-123s-v001', // Since it's a POST request without any data payload
        {
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data.data.l;
}