import {Alert, closeAlert, showAlert} from "../store/AlertSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/store";

export const useAlert = () => {
    const alerts = useAppSelector(state => state.alert.alerts);
    const dispatch = useAppDispatch();

    const showAlertFn = (alert: Omit<Alert, "id">): void => {
        dispatch(showAlert(alert))
    }

    const closeAlertFn = (alertId: Alert["id"]): void => {
        dispatch(closeAlert(alertId))
    }

    return {alerts, showAlert: showAlertFn, closeAlert: closeAlertFn };
}