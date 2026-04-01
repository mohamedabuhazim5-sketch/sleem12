import { createAdminClient } from '@/lib/supabase-admin'

export async function getBotReply(message: string, clinicId: string) {
  const text = message.trim().toLowerCase()
  const supabase = createAdminClient()

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('id', clinicId)
    .single()

  if (!clinic || !clinic.is_bot_enabled) {
    return null
  }

  const { data: faqs } = await supabase
    .from('faq')
    .select('*')
    .eq('clinic_id', clinicId)

  if (!faqs || faqs.length === 0) {
    return 'شكرًا لتواصلك. سيتم الرد عليك قريبًا.'
  }

  const matchedFAQ = faqs.find((faq) =>
    text.includes(faq.keyword.trim().toLowerCase())
  )

  if (matchedFAQ) {
    return matchedFAQ.answer
  }

  return 'شكرًا لتواصلك. سيتم تحويل رسالتك إلى موظف.'
}
