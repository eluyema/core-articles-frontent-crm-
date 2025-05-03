import {PropsWithChildren, useEffect} from "react";
import {useAuth} from "../../features/Auth/model/hooks/useAuth.ts";
import {loadingStatuses} from "../../shared/model/LoadingStatus.ts";

const AuthProvider = ({children}: PropsWithChildren) => {
    const { loadingStatus, userDetails, loadMyInfo } = useAuth();

    useEffect(() => {
        if(userDetails === null && loadingStatus === loadingStatuses.idle) {
            loadMyInfo();
        }
    }, [userDetails,loadingStatus])

    return <>{children}</>
};

export default AuthProvider;