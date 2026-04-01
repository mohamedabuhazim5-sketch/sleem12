import { createClient } from '@/lib/supabase-server'
import ClinicSettingsForm from '@/components/ClinicSettingsForm'
import BotToggle from '@/components/BotToggle'
import { requireUser } from '@/lib/require-user'

export default async function SettingsPage() {
  const user = await requireUser()
  const supabase = await createClient()

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!clinic) {
    return <div>لا توجد عيادة حتى الآن</div>
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-gray-500 mt-1">Manage clinic details and bot status.</p>
      </div>

      <BotToggle clinicId={clinic.id} initialValue={clinic.is_bot_enabled} />

      <div className="border bg-white rounded-2xl p-6">
        <ClinicSettingsForm clinic={clinic} />
      </div>
    </div>
  )
}
