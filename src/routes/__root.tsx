import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {GlobalProvider} from "../app/providers/GlobalProvider.tsx";

export const Route = createRootRoute({
    component: () => (
        <GlobalProvider>
            <Outlet />
            <TanStackRouterDevtools />
        </GlobalProvider>
    ),
    notFoundComponent: () => {
        return (
            <div>
                <p>Not found!</p>
                <Link to="/">Go home</Link>
            </div>
        )
    },
})