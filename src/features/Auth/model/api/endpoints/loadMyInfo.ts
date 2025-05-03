import {api} from "../../../../../app/api";
import {UserDetails} from "../../entities/UserDetails.ts";

export const loadMyInfo = async (): Promise<UserDetails> => {
    const backendUrl = "http://localhost:8080";

    const url = backendUrl + "/api/user/me";

    return await api.get<UserDetails>(url).json();
}