import { createFileRoute } from '@tanstack/react-router'
import AdminPage from "../../features/Admin/ui/AdminPage";

export const Route = createFileRoute('/admin/')({
    component: AdminPage,
})
