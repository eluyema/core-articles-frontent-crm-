import { store } from '../store/store.ts'
import { Provider } from 'react-redux'
import {PropsWithChildren} from "react";

export const ReduxProvider = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>
}