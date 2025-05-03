import { createAsyncThunk } from "@reduxjs/toolkit";
import {loadMyInfo} from "../api/endpoints/loadMyInfo.ts";
import {showAlert} from "../../../Alert/model/store/AlertSlice.ts";

export const loadMyInfoAction = createAsyncThunk(
    'auth/loadMyInfoAction',
    async (_, {dispatch}) => {
        try{
            return await loadMyInfo();
        } catch (e) {
            if( e instanceof Error) {
                dispatch(showAlert({ message: e.message || "Помилка збереження категорій" , color: "red"}))
            }
            throw e;
        }
    },
)