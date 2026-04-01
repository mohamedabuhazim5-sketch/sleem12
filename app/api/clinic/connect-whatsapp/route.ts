import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      clinic_id,
      whatsapp_phone_number_id,
      whatsapp_business_account_id,
      whatsapp_access_token,
      whatsapp_test_number,
    } = body

    const { data, error } = await supabase
      .from('clinics')
      .update({
        whatsapp_phone_number_id,
        whatsapp_business_account_id,
        whatsapp_access_token,
        whatsapp_test_number,
      })
      .eq('id', clinic_id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, clinic: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}