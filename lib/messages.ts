import { createAdminClient } from '@/lib/supabase-admin'

export async function saveIncomingLead({
  clinicId,
  customerPhone,
  message,
}: {
  clinicId: string
  customerPhone: string
  message: string
}) {
  const supabase = createAdminClient()

  const { error } = await supabase.from('leads').insert([
    {
      clinic_id: clinicId,
      customer_phone: customerPhone,
      message,
      status: 'new',
    },
  ])

  if (error) {
    console.error('Failed to save lead:', error.message)
  }
}
