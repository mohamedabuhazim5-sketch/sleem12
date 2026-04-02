import { createClient } from '@/lib/supabase-server'

export async function getAccessState(userId: string) {
  const supabase = await createClient()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle()

  if (subscription) {
    return {
      state: 'active' as const,
      subscription,
      paymentRequest: null,
    }
  }

  const { data: paymentRequest } = await supabase
    .from('payment_requests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (paymentRequest) {
    return {
      state: paymentRequest.status as 'pending' | 'approved' | 'rejected',
      subscription: null,
      paymentRequest,
    }
  }

  return {
    state: 'none' as const,
    subscription: null,
    paymentRequest: null,
  }
}