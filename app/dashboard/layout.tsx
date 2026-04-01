import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardTopbar from '@/components/DashboardTopbar'
import { requireUser } from '@/lib/require-user'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <div className="flex-1">
          <DashboardTopbar />
          <main className="p-6 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
