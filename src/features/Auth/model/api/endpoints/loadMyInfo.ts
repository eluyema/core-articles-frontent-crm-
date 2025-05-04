import {api} from "../../../../../app/api";
import {UserDetails} from "../../entities/UserDetails.ts";
import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";

export const loadMyInfo = async (): Promise<UserDetails> => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + "/api/user/me";

    return await api.get<UserDetails>(url).json();
}