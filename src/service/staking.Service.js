import { Axios } from "@/utils"

export const getRoundDetailservice = async (params) => {
    return  Axios.get('stacking/round-info', {
        params
    })
}

export const getPlayerInfoService = async (params) => {
    return Axios.get('stacking', {
        params
    })
}