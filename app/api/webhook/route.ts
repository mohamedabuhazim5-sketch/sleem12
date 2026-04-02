import { NextRequest, NextResponse } from 'next/server'
import { getBotReply } from '@/lib/bot'
import { sendWhatsAppMessage } from '@/lib/whatsapp'
import { saveIncomingLead } from '@/lib/messages'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const change = body?.entry?.[0]?.changes?.[0]?.value
    const message = change?.messages?.[0]

    if (!message) {
      return NextResponse.json({ received: true })
    }

    const from = message.from
    const text = message?.text?.body || ''

    if (!from || !text) {
      return NextResponse.json({ received: true })
    }

    const incomingPhoneNumberId = change?.metadata?.phone_number_id

    if (!incomingPhoneNumberId) {
      return NextResponse.json(
        { error: 'Missing phone_number_id' },
        { status: 400 }
      )
    }

    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('*')
      .eq('whatsapp_phone_number_id', incomingPhoneNumberId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json(
        { error: 'Clinic not found for this WhatsApp number' },
        { status: 404 }
      )
    }

    await saveIncomingLead({
      clinicId: clinic.id,
      customerPhone: from,
      message: text,
    })

    const reply = await getBotReply(text, clinic.id)

    if (reply && clinic.whatsapp_access_token && clinic.whatsapp_phone_number_id) {
      await sendWhatsAppMessage({
        phoneNumberId: clinic.whatsapp_phone_number_id,
        accessToken: clinic.whatsapp_access_token,
        to: from,
        text: reply,
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}