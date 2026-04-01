import { NextRequest, NextResponse } from 'next/server'
import { getBotReply } from '@/lib/bot'
import { sendWhatsAppMessage } from '@/lib/whatsapp'
import { saveIncomingLead } from '@/lib/messages'
import { createAdminClient } from '@/lib/supabase-admin'

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
    const supabase = createAdminClient()
    const body = await req.json()

    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

    if (!message) {
      return NextResponse.json({ received: true })
    }

    const from = message.from
    const text = message?.text?.body || ''

    if (!from || !text) {
      return NextResponse.json({ received: true })
    }

    const { data: clinic } = await supabase
      .from('clinics')
      .select('*')
      .limit(1)
      .single()

    if (!clinic) {
      return NextResponse.json({ received: true })
    }

    await saveIncomingLead({
      clinicId: clinic.id,
      customerPhone: from,
      message: text,
    })

    const reply = await getBotReply(text, clinic.id)

    if (reply) {
      await sendWhatsAppMessage(from, reply)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
