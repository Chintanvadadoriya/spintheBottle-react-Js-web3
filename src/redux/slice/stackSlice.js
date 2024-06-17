import { createSlice } from "@reduxjs/toolkit";
import { getEthToUsdPrice, getHsitoryAction, getPlayerInfoAction, getRoundDetailsAction, getUserAction, updateUserAction } from "../action/stackAction";
import { calculatePlayerAngles } from "@/utils";

const initialState = {
    players: [],
    loading: false,
    roundData: null,
    bonusRounds: null,
    usedColors: [],
    history: [],
    totalPages: 1,
    count: 0,
    pageNo: 1,
    reset: true,
    hasMore: true,
    user: null,
    allowance:0,
    usdVlaue:0

}

const stackSlice = createSlice({
    name: "stack",
    initialState,
    reducers:{
        setAllowanceValue: (state, { payload }) => {
            console.log('payload setAllowanceValue', payload)
            state.allowance = payload?.allowance;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoundDetailsAction.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getRoundDetailsAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.roundData = payload?.roundInfo;
                state.bonusRounds = payload?.bonusRound;
            })
            .addCase(getRoundDetailsAction.rejected, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(getPlayerInfoAction.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getPlayerInfoAction.fulfilled, (state, { payload }) => {
                console.log('payload', payload)
                state.loading = false;
                // state.players = payload?.players;
                state.players = calculatePlayerAngles(payload.players, payload?.totalStack)
            })
            .addCase(getPlayerInfoAction.rejected, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(getHsitoryAction.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getHsitoryAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.history = state.history;

                state.history = payload?.reset
                    ? payload?.data
                    : [...state.history, ...payload?.data];
                state.reset = payload?.reset;
                state.count = payload?.count;
                state.pageNo = payload?.pageNo;
                state.totalPages = payload?.totalPages;
                state.hasMore =
                    payload?.totalPages >= payload?.pageNo;
            })
            .addCase(getHsitoryAction.rejected, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(getUserAction.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getUserAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
            })
            .addCase(getUserAction.rejected, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(updateUserAction.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(updateUserAction.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(updateUserAction.rejected, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(getEthToUsdPrice.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getEthToUsdPrice.fulfilled, (state, { payload }) => {
                console.log('payload getEthToUsdPrice', payload)
                state.loading = false;
                state.usdVlaue = payload;
            })
            .addCase(getEthToUsdPrice.rejected, (state, { payload }) => {
                state.loading = false;
            })
            

    }
})


export const stakingState = state => state.stack;

export const {
    setAllowanceValue
} = stackSlice.actions;

export const stakingReducer = stackSlice.reducer;