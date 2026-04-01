import { createClient } from '@/lib/supabase-server'
import { requireActiveSubscription } from '@/lib/auth-check'

export default async function DashboardPage() {
  const { user } = await requireActiveSubscription()
  const supabase = await createClient()

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('clinic_id', clinic?.id)

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .eq('clinic_id', clinic?.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500 mt-1">Welcome back to Sleem.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border bg-white rounded-2xl p-6">
          <p className="text-gray-500">Clinic Name</p>
          <h3 className="text-2xl font-bold">{clinic?.name ?? 'No clinic yet'}</h3>
        </div>

        <div className="border bg-white rounded-2xl p-6">
          <p className="text-gray-500">Leads</p>
          <h3 className="text-3xl font-bold">{leadsCount ?? 0}</h3>
        </div>

        <div className="border bg-white rounded-2xl p-6">
          <p className="text-gray-500">Bot Status</p>
          <h3
            className={`text-2xl font-bold ${
              clinic?.is_bot_enabled ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {clinic?.is_bot_enabled ? 'Active' : 'Stopped'}
          </h3>
        </div>
      </div>

      <div className="border bg-white rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Latest Conversations</h3>

        <div className="space-y-4">
          {leads?.map((lead) => (
            <div key={lead.id} className="border rounded-xl p-4">
              <p className="font-semibold">{lead.customer_name || 'Unknown'}</p>
              <p className="text-sm text-gray-500">{lead.customer_phone}</p>
              <p className="mt-2">{lead.message}</p>
              <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full border">
                {lead.status}
              </span>
            </div>
          ))}

          {!leads?.length && (
            <p className="text-gray-500">No conversations yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
