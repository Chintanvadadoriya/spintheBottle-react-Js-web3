import { Axios } from "@/utils"



export const getUserServices = async (payload) => {
    return Axios.get('user', {
        params: payload
    })
}

export const updateUserServices = async (payload) => {
    return Axios.patch('user', payload, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export const getUsdPrice = async () => {
    return Axios.get('user/get_usd_price')
}

export const sendMail = async (email) => {
    return Axios.post('mailsend/send',{},{
        params:{
            email:email
        }
    })
}