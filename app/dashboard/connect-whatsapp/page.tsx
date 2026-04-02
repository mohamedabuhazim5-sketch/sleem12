import { requireUser } from '@/lib/require-user'
import { createClient } from '@/lib/supabase-server'
import ConnectWhatsAppForm from '@/components/ConnectWhatsAppForm'

export default async function ConnectWhatsAppPage() {
  const user = await requireUser()
  const supabase = await createClient()

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!clinic) {
    return <div className="p-8">لا توجد عيادة حتى الآن</div>
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Connect WhatsApp</h2>
        <p className="text-gray-500 mt-1">
          اربط حساب واتساب الخاص بك لتشغيل البوت.
        </p>
      </div>

      <ConnectWhatsAppForm clinic={clinic} />
    </div>
  )
}