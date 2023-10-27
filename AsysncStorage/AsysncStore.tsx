import axios from "axios"

export const getAPIDetail = async ({ item, Domain, APIkey, setdata, setimage }: any) => {
    const formData = new FormData()
    formData.append('app_name', 'khttest')
    formData.append('id', item.id)
    const apiProductlist = `${Domain}/client_product/detail?apikey=${APIkey}`
    if (APIkey && Domain) {
        try {
            const response = await axios.post(apiProductlist, formData, {
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                },
            })
            if (response.status === 200) {
                const dataProduct = response.data.data
                setdata(dataProduct)
                setimage(dataProduct.img_1)
            } else {
                throw new Error('Network response was not ok')
            }
        } catch (error) {
            console.error('There was a problem with the operation:', error)
        }
    }
}

// export const handleCart = async ({ Domain, APIkey, token }: any) => {
//     const CartUrl = `${Domain}/client_order/checkout?apikey=${APIkey}`
//     const formData = new FormData()
//     formData.append('token', token)
//     formData.append('ship_name', 'Minhhuy')
//     formData.append('ship_mobile', '0792575738')
//     formData.append('ship_address', 'TP Ho Chi Minh')
//     formData.append('ship_note', '')
//     formData.append('lItems', 
        // [
            // { amount: 1, decrement: "10", price: "495000.0000", product_id: "16106", unique_id: "16235" },
            // { "amount": 1, "decrement": "10", "price": "295000.0000", "product_id": "16122", "unique_id": "16251" }
        // ])
    // console.log(JSON.stringify(AllItemCart));

    // console.log(CartUrl)
    // console.log(token);
    // console.log(formData);

//     try {
//         const response = axios.post(CartUrl, formData)
//         console.log('dung', response);
//     } catch (error) {
//         console.error('Lỗi kết nối đến máy chủ:', error)
//     }
// }