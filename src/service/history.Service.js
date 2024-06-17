import { Axios } from "@/utils"


export const getHistoryService = async (payload) => {
    return Axios.get('history', {
        params: payload
    })
}