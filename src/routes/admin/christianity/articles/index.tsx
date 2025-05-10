import { createFileRoute } from '@tanstack/react-router'
import ChristianityArticlesListPage
  from "../../../../features/Christianity/ui/ChristianityArticlesListPage/ChristianityArticlesListPage.tsx";

export const Route = createFileRoute('/admin/christianity/articles/')({
  component: ChristianityArticlesListPage,
})
