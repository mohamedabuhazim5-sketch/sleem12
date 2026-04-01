import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const authSupabase = await createClient()
    const {
      data: { user },
    } = await authSupabase.auth.getUser()

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const supabase = createAdminClient()

    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'id and status are required' },
        { status: 400 }
      )
    }

    const { data: payment, error: paymentError } = await supabase
      .from('payment_requests')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (paymentError) {
      return NextResponse.json({ error: paymentError.message }, { status: 500 })
    }

    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('payment_request_id', id)
      .maybeSingle()

    if (status === 'approved') {
      if (!existingSubscription) {
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .insert([
            {
              user_id: payment.user_id,
              customer_phone: payment.customer_phone,
              customer_name: payment.customer_name,
              plan_name: payment.plan_name,
              status: 'active',
              payment_request_id: payment.id,
            },
          ])

        if (subscriptionError) {
          return NextResponse.json(
            { error: subscriptionError.message },
            { status: 500 }
          )
        }
      } else {
        const { error: updateSubError } = await supabase
          .from('subscriptions')
          .update({
            user_id: payment.user_id,
            status: 'active',
            plan_name: payment.plan_name,
            customer_name: payment.customer_name,
            customer_phone: payment.customer_phone,
          })
          .eq('payment_request_id', id)

        if (updateSubError) {
          return NextResponse.json(
            { error: updateSubError.message },
            { status: 500 }
          )
        }
      }
    }

    if (status === 'rejected' && existingSubscription) {
      const { error: rejectSubError } = await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('payment_request_id', id)

      if (rejectSubError) {
        return NextResponse.json(
          { error: rejectSubError.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true, payment })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
