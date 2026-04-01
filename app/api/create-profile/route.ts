import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await req.json()
    const { id, full_name, phone } = body

    if (!id) {
      return NextResponse.json({ error: 'User id is required' }, { status: 400 })
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([
        {
          id,
          full_name,
          phone,
        },
      ])

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 })
    }

    const { data: existingClinic } = await supabase
      .from('clinics')
      .select('id')
      .eq('user_id', id)
      .maybeSingle()

    if (!existingClinic) {
      const { error: clinicError } = await supabase
        .from('clinics')
        .insert([
          {
            user_id: id,
            name: 'My Clinic',
            is_bot_enabled: false,
            consultation_price: 0,
          },
        ])

      if (clinicError) {
        return NextResponse.json({ error: clinicError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
