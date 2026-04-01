import { requireAdmin } from '@/lib/require-admin'
import { createAdminClient } from '@/lib/supabase-admin'
import PaymentStatusUpdater from '@/components/PaymentStatusUpdater'

export default async function PaymentsPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const { data: payments } = await supabase
    .from('payment_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Payments</h2>
        <p className="text-gray-500 mt-1">Review and approve manual payments.</p>
      </div>

      <div className="space-y-4">
        {!payments?.length && (
          <p className="text-gray-500">لا توجد طلبات دفع حتى الآن</p>
        )}

        {payments?.map((payment) => (
          <div
            key={payment.id}
            className="border bg-white rounded-2xl p-5 flex flex-col gap-4 md:flex-row md:justify-between"
          >
            <div className="space-y-2">
              <p className="font-bold text-lg">{payment.customer_name}</p>
              <p className="text-sm text-gray-500">{payment.customer_phone}</p>
              <p>الباقة: {payment.plan_name}</p>
              <p>المبلغ: {payment.amount} EGP</p>
              <p>رقم العملية: {payment.transaction_reference}</p>
              <p>وسيلة الدفع: {payment.payment_method}</p>
              <p>رقم الدفع: {payment.payment_phone}</p>
              <p>الحالة الحالية: {payment.status}</p>
              <p className="text-xs text-gray-400">
                {new Date(payment.created_at).toLocaleString()}
              </p>
            </div>

            <PaymentStatusUpdater
              paymentId={payment.id}
              currentStatus={payment.status}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
