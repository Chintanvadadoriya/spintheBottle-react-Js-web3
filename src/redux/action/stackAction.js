import { getHistoryService } from "@/service/history.Service";
import { getPlayerInfoService, getRoundDetailservice } from "@/service/staking.Service";
import { getUsdPrice, getUserServices, updateUserServices } from "@/service/user.Service";
import { generateRandomColor } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";



export const getRoundDetailsAction = createAsyncThunk(
    "stack/getRoundDetailsAction",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await getRoundDetailservice(payload);

            console.log('data', data)
            return {
                roundInfo: data?.data,
                bonusRound: data?.bonusRoundDetails
            };
        } catch (err) {
            console.log('err', err);
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const getPlayerInfoAction = createAsyncThunk(
    "stack/getPlayerInfoAction",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const { data } = await getPlayerInfoService(payload);

            const { stack } = getState();
            // const { usedColors } = stack;
            console.log('response', data)
            const obj = {
                players: data?.data,
                totalStack: data?.totalStack
            }
            console.log('obj', obj)
            return obj

        } catch (err) {
            console.log('err', err);
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const getHsitoryAction = createAsyncThunk(
    "stack/getHsitoryAction",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const { stack } = getState();
            const { pageNo } = stack;
            const query = {
                limit: payload?.limit || 9,
                page: payload?.reset ? 1 : pageNo,
                sortBy:payload?.sortBy,
                order:payload?.order
            };
            if (payload?.search) {
                query.search = payload?.search;
            }
            if(payload?.address){
                query.address=payload?.address
            }
            const { data } = await getHistoryService(query);

            console.log('data', data)

            return {
                data: data?.data || [],
                count: data?.count || 0,
                totalPages: data?.totalPages || 1,
                pageNo: query?.page + 1,
                reset: payload?.reset,
            };

        } catch (err) {
            console.log('err', err);
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const getUserAction = createAsyncThunk(
    'staking/getUserAction',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await getUserServices(payload);
            return data?.data;
        } catch (err) {
            console.log('err', err)
            return rejectWithValue(err.message);
        }
    }
);

export const updateUserAction = createAsyncThunk(
    'staking/updateUserAction',
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await updateUserServices(payload);
            dispatch(getUserAction({
                address: payload?.get('address'),
            }))
            return data?.data;
        } catch (err) {
            console.log('err', err)
            if(err instanceof AxiosError) {
                toast.error(err.response.data?.message);
            }
            return rejectWithValue(err.message);
        }
    }
);

export const getEthToUsdPrice = createAsyncThunk(
    'staking/getUsdPrice',
    async (payload, { rejectWithValue }) => {
        try {
            const  {data}  = await getUsdPrice(payload);
            return +data?.value;
        } catch (err) {
            console.log('err', err)
            return rejectWithValue(err.message);
        }
    }
);