import { createFileRoute } from '@tanstack/react-router'
import CreateChristianityArticleTranslationPage
  from "../../../../../../features/Christianity/ui/CreateChristianityArticleTranslationPage";

export const Route = createFileRoute(
  '/admin/christianity/articles/$slug/new-translation/',
)({
  component: CreateChristianityArticleTranslationPage,
})