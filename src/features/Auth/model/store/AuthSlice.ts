import { createSlice } from '@reduxjs/toolkit'
import {loginAction} from "../actions/login.ts";
import {LoadingStatus, loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";
import {UserDetails} from "../entities/UserDetails.ts";
import {loadMyInfoAction} from "../actions/loadMyInfo.ts";

interface AuthStore {
    userDetails: UserDetails | null;
    loadingStatus: LoadingStatus;
}

const initialState: AuthStore = {
    userDetails: null,
    loadingStatus: loadingStatuses.idle
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(loginAction.pending, (state) => {
            return { ...state, loadingStatus: loadingStatuses.pending };
        }).addCase(loginAction.fulfilled, (state, { payload }) => {
            return { ...state, loadingStatus: loadingStatuses.success, userDetails: payload};
        }).addCase(loginAction.rejected, (state) => {
            return { ...state, loadingStatus: loadingStatuses.failed };
        }).addCase(loadMyInfoAction.fulfilled, (state, { payload }) => {
                return { ...state, loadingStatus: loadingStatuses.success, userDetails: payload};
            })
    }
})


export default authSlice.reducer