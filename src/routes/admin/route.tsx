import {createFileRoute, Outlet} from '@tanstack/react-router'
import AdminPageSidebar from "../../features/Admin/ui/AdminPageSidebar";
import stles from './route.module.scss';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
    return <div className={stles.container}>
        <AdminPageSidebar/>
        <Outlet/>
    </div>
}
