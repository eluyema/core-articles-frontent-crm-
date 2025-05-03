import { createFileRoute } from '@tanstack/react-router'
import LoginPage from "../../features/Auth/ui/LoginPage";

export const Route = createFileRoute('/login/')({
    component: LoginPage,
})