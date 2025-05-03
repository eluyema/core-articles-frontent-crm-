import { createFileRoute } from '@tanstack/react-router'
import ChristianityCategoriesPage from "../../../../features/Christianity/ui/ChristianityCategoriesPage";

export const Route = createFileRoute('/admin/christianity/categories/')({
  component: ChristianityCategoriesPage,
})

