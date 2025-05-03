import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Alert = {
    id: string;
    title?: string;
    message: string;
    color?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'teal' | 'cyan' | 'pink' | 'grape' | 'violet' | 'indigo' | 'lime';
};

interface AlertState {
    alerts: Alert[];
}

const initialState: AlertState = {
    alerts: [],
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: {
            reducer: (state, action: PayloadAction<Alert>) => {
                state.alerts.push(action.payload);
            },
            prepare: (alert: Omit<Alert, 'id'>) => ({
                payload: { ...alert, id: crypto.randomUUID() },
            }),
        },
        closeAlert: (state, action: PayloadAction<string>) => {
            state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
        },
        clearAlerts: (state) => {
            state.alerts = [];
        },
    },
});

export const { showAlert, closeAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;
