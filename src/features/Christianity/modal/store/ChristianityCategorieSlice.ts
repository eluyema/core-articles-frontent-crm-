import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChristianityCategory} from "../entities/ChristianityCategory";
import {LoadingStatus, loadingStatuses} from "../../../../shared/model/LoadingStatus";
import {loadChristianityCategoriesAction} from "../actions/loadChristianityCategories.ts";
import {saveChristianityCategoriesAction} from "../actions/saveChristianityCategoriesAction.ts";

export interface ChristianityCategoriesStore {
    categories: ChristianityCategory[];
    loadLoadingStatus: LoadingStatus;
    saveLoadingStatus: LoadingStatus;
}

const initialState: ChristianityCategoriesStore = {
    categories: [],
    loadLoadingStatus: loadingStatuses.idle,
    saveLoadingStatus: loadingStatuses.idle,
};

export const christianityCategoriesSlice = createSlice({
    name: 'christianityCategories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<ChristianityCategory[]>) {
            state.categories = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadChristianityCategoriesAction.pending, (state) => {
                state.loadLoadingStatus = loadingStatuses.pending;
            })
            .addCase(loadChristianityCategoriesAction.fulfilled, (state, {payload}) => {
                state.loadLoadingStatus = loadingStatuses.success;
                state.categories = payload;
            })
            .addCase(loadChristianityCategoriesAction.rejected, (state) => {
                state.loadLoadingStatus = loadingStatuses.failed;
            })
            .addCase(saveChristianityCategoriesAction.pending, (state) => {
                state.saveLoadingStatus = loadingStatuses.pending;
            })
            .addCase(saveChristianityCategoriesAction.fulfilled, (state, {payload}) => {
                state.saveLoadingStatus = loadingStatuses.success;
                state.categories = payload;
            })
            .addCase(saveChristianityCategoriesAction.rejected, (state) => {
                state.saveLoadingStatus = loadingStatuses.failed;
            });
    }
});

export const { setCategories } = christianityCategoriesSlice.actions;

export default christianityCategoriesSlice.reducer;
