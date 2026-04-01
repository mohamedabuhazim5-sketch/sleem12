import { createClient } from '@/lib/supabase-server'
import { requireUser } from '@/lib/require-user'
import FAQManager from '@/components/FAQManager'

export default async function FAQPage() {
  const user = await requireUser()
  const supabase = await createClient()

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const { data: faqs } = await supabase
    .from('faq')
    .select('*')
    .eq('clinic_id', clinic?.id)
    .order('created_at', { ascending: false })

  if (!clinic) {
    return <div className="p-8">لا توجد عيادة حتى الآن</div>
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold">FAQ</h2>
        <p className="text-gray-500 mt-1">Manage automated replies and keywords.</p>
      </div>

      <div className="border bg-white rounded-2xl p-6">
        <FAQManager clinicId={clinic.id} initialFaqs={faqs || []} />
      </div>
    </div>
  )
}
