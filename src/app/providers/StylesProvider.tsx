import {MantineProvider} from "@mantine/core";
import {PropsWithChildren} from "react";
import '@mantine/core/styles.css';
import "../styles/global.scss";

const StylesProvider = ({children}: PropsWithChildren) => {
    return <MantineProvider>
        {children}
    </MantineProvider >
};

export default StylesProvider;