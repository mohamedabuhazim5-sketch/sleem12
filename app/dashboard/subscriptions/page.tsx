import { requireAdmin } from '@/lib/require-admin'
import { createAdminClient } from '@/lib/supabase-admin'

export default async function SubscriptionsPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Subscriptions</h2>
        <p className="text-gray-500 mt-1">Manage all customer subscriptions.</p>
      </div>

      <div className="space-y-4">
        {!subscriptions?.length && (
          <p className="text-gray-500">لا توجد اشتراكات حتى الآن</p>
        )}

        {subscriptions?.map((subscription) => (
          <div
            key={subscription.id}
            className="border bg-white rounded-2xl p-5 space-y-2"
          >
            <p className="font-bold text-lg">
              {subscription.customer_name || 'بدون اسم'}
            </p>
            <p className="text-sm text-gray-500">
              {subscription.customer_phone}
            </p>
            <p>الباقة: {subscription.plan_name}</p>
            <p>الحالة: {subscription.status}</p>
            <p>user_id: {subscription.user_id}</p>
            <p className="text-xs text-gray-400">
              {new Date(subscription.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
