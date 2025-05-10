import { createFileRoute } from '@tanstack/react-router'
import CreateChristianityArticlePage from "../../../../features/Christianity/ui/CreateChristianityArticlePage";

export const Route = createFileRoute(
  '/admin/christianity/articles/new-article',
)({
  component: CreateChristianityArticlePage,
})
