import { createAsyncThunk } from "@reduxjs/toolkit";
import {loginApi} from "../api/endpoints/login.ts";
import {loadMyInfo} from "../api/endpoints/loadMyInfo.ts";
import {showAlert} from "../../../Alert/model/store/AlertSlice.ts";

export type LoginActionParams = {username: string; password: string};

export const loginAction = createAsyncThunk(
    'auth/login',
    async (params: LoginActionParams, {dispatch}) => {
        try {
            const token = await loginApi(params.username, params.password)

            localStorage.setItem("accessToken", token);

            return await loadMyInfo();
        } catch (e) {
            dispatch(showAlert({message: "Ошибка авторизации! Пользователь не существует или данные не верны"}));
            localStorage.removeItem("accessToken");
            throw e;
        }
    },
)