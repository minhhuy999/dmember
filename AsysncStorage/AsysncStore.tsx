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