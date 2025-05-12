import { createFileRoute } from '@tanstack/react-router'
import EditChristianityArticleTranslationPage
  from "../../../../../../features/Christianity/ui/EditChristianityArticleTranslationPage";

export const Route = createFileRoute(
  '/admin/christianity/articles/$slug/$lang/',
)({
  component: EditChristianityArticleTranslationPage,
})
