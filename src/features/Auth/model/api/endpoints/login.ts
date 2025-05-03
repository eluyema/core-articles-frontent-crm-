import {api} from "../../../../../app/api";

export const loginApi = async (username: string, password: string)=> {
    const backendUrl = "http://localhost:8080";

    const url = backendUrl + "/api/auth/sign-in";

    const { token } = await api.post<{token: string}>(url, {json: { username, password }}).json();

    return token;
};