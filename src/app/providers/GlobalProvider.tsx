import { PropsWithChildren } from "react";
import {ReduxProvider} from "./ReduxProvider.tsx";
import AuthProvider from "./AuthProvider.tsx";
import StylesProvider from "./StylesProvider.tsx";
import AlertProvider from "./AlertProvider.tsx";

export const GlobalProvider  = ({children}:PropsWithChildren)=>{
    return <ReduxProvider><StylesProvider><AuthProvider><AlertProvider>{children}</AlertProvider></AuthProvider></StylesProvider></ReduxProvider>;
}