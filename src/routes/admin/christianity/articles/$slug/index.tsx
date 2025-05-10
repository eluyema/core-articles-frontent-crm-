import { createFileRoute } from '@tanstack/react-router'
import EditChristianityArticlePage
  from "../../../../../features/Christianity/ui/EditChristianityArticlePage/EditChristianityArticlePage.tsx";

export const Route = createFileRoute('/admin/christianity/articles/$slug/')({
  component: EditChristianityArticlePage,
})

