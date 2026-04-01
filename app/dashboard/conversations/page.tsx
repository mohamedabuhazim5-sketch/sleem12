import { createClient } from '@/lib/supabase-server'
import { requireUser } from '@/lib/require-user'
import LeadStatusUpdater from '@/components/LeadStatusUpdater'

export default async function ConversationsPage() {
  const user = await requireUser()
  const supabase = await createClient()

  const { data: clinic } = await supabase
    .from('clinics')
    .select('id')
    .eq('user_id', user.id)
    .single()

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .eq('clinic_id', clinic?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Conversations</h2>
        <p className="text-gray-500 mt-1">Track incoming WhatsApp conversations.</p>
      </div>

      <div className="space-y-4">
        {!leads?.length && (
          <p className="text-gray-500">لا توجد محادثات حتى الآن</p>
        )}

        {leads?.map((lead) => (
          <div
            key={lead.id}
            className="border bg-white rounded-2xl p-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
          >
            <div className="space-y-2">
              <p className="font-bold text-lg">{lead.customer_name || 'عميل جديد'}</p>
              <p className="text-sm text-gray-500">{lead.customer_phone || 'بدون رقم'}</p>
              <p className="text-gray-800">{lead.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(lead.created_at).toLocaleString()}
              </p>
            </div>

            <LeadStatusUpdater
              leadId={lead.id}
              currentStatus={lead.status || 'new'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
