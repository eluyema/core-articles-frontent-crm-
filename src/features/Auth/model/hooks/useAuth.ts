import {loginAction} from "../actions/login.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {loadMyInfoAction} from "../actions/loadMyInfo.ts";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const {loadingStatus, userDetails} = useAppSelector((state)=>state.auth)

    const login = (username: string, password: string) => {
        dispatch(loginAction({username, password}));
    }

    const loadMyInfo = () => {
        dispatch(loadMyInfoAction());
    }

    return { loadingStatus, userDetails, login, loadMyInfo }
}