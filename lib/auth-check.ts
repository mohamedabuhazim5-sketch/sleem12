import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export async function requireActiveSubscription() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .maybeSingle()

  if (!subscription) {
    redirect('/checkout')
  }

  return { user, subscription }
}
