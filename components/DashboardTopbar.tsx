import { createClient } from '@/lib/supabase-server'
import LogoutButton from './LogoutButton'

export default async function DashboardTopbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="h-20 border-b bg-white px-6 md:px-8 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">Sleem Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your clinic and WhatsApp bot</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email || 'User'}</span>
        <LogoutButton />
      </div>
    </header>
  )
}
