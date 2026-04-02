import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

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
    const { clinic_id } = body

    const { data: clinic, error } = await supabase
      .from('clinics')
      .select('*')
      .eq('id', clinic_id)
      .eq('user_id', user.id)
      .single()

    if (error || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    if (
      !clinic.whatsapp_phone_number_id ||
      !clinic.whatsapp_access_token ||
      !clinic.whatsapp_test_number
    ) {
      return NextResponse.json(
        { error: 'WhatsApp connection data is incomplete' },
        { status: 400 }
      )
    }

    const data = await sendWhatsAppMessage({
      phoneNumberId: clinic.whatsapp_phone_number_id,
      accessToken: clinic.whatsapp_access_token,
      to: clinic.whatsapp_test_number,
      text: 'تم ربط WhatsApp بنجاح على Sleem',
    })

    await supabase
      .from('clinics')
      .update({ whatsapp_webhook_verified: true })
      .eq('id', clinic.id)

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json(
      { error: 'Failed to send test message' },
      { status: 500 }
    )
  }
}