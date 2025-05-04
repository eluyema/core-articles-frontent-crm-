import {api} from "../../../../app/api";
import {getAppConfig} from "../../../../shared/config/getAppConfig.ts";

export const loginApi = async (username: string, password: string)=> {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + "/api/auth/sign-in";

    const { token } = await api.post<{token: string}>(url, {json: { username, password }}).json();

    return token;
};