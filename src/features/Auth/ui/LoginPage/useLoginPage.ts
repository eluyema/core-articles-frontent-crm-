import {useEffect, useState} from "react";
import {useAuth} from "../../model/hooks/useAuth.ts";
import {loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";
import {useNavigate} from "@tanstack/react-router";

export const useLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate({ from: '/login' })

    const { loadingStatus, userDetails, login } = useAuth();

    useEffect(() => {
        if(userDetails){
            navigate({to: "/admin"});
        }
    }, [userDetails]);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(username, password);
    }

    const loading = loadingStatus === loadingStatuses.pending;

    return {username, password, loading, onChangeUsername, onChangePassword, onSubmit};
};