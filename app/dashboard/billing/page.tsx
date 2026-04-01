import { requireUser } from '@/lib/require-user'
import { createClient } from '@/lib/supabase-server'

export default async function BillingPage() {
  const user = await requireUser()
  const supabase = await createClient()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Billing</h2>
        <p className="text-gray-500 mt-1">Manage your subscription and payments.</p>
      </div>

      {!subscription ? (
        <div className="border bg-white rounded-2xl p-6 space-y-4">
          <p>لا يوجد اشتراك مفعل حاليًا.</p>
          <a href="/checkout" className="inline-block bg-black text-white px-5 py-3 rounded-xl">
            اشترك الآن
          </a>
        </div>
      ) : (
        <div className="border bg-white rounded-2xl p-6 space-y-3">
          <p><span className="font-bold">الباقة:</span> {subscription.plan_name}</p>
          <p><span className="font-bold">الحالة:</span> {subscription.status}</p>
          <p><span className="font-bold">الاسم:</span> {subscription.customer_name}</p>
          <p><span className="font-bold">رقم الموبايل:</span> {subscription.customer_phone}</p>
        </div>
      )}
    </div>
  )
}
