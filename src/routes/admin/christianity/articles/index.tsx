import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/christianity/articles/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/christianity/articles/"!</div>
}
