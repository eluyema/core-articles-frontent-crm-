import { createAsyncThunk } from "@reduxjs/toolkit";
import {loadMyInfo} from "../../api/endpoints/loadMyInfo.ts";

export const loadMyInfoAction = createAsyncThunk(
    'auth/loadMyInfoAction',
    async () => {
            return await loadMyInfo();
    },
)