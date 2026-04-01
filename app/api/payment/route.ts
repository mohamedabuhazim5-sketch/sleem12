import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

const PLAN_PRICES: Record<string, number> = {
  Starter: 999,
  Pro: 2499,
  Premium: 4999,
}

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
    const { customer_name, customer_phone, plan_name, transaction_reference } = body

    if (!customer_name || !customer_phone || !plan_name || !transaction_reference) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const amount = PLAN_PRICES[plan_name]

    if (!amount) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('payment_requests')
      .insert([
        {
          user_id: user.id,
          customer_name,
          customer_phone,
          plan_name,
          amount,
          transaction_reference,
          payment_method: process.env.NEXT_PUBLIC_PAYMENT_METHOD || 'WE Cash',
          payment_phone: process.env.NEXT_PUBLIC_PAYMENT_PHONE || '01515351143',
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, payment: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
