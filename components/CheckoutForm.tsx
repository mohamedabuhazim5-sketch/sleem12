'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

const plans = [
  { name: 'Starter', price: 999 },
  { name: 'Pro', price: 2499 },
  { name: 'Premium', price: 4999 },
]

export default function CheckoutForm() {
  const supabase = createClient()

  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    plan_name: 'Starter',
    transaction_reference: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const selectedPlan = plans.find((p) => p.name === form.plan_name)

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setForm((prev) => ({
          ...prev,
          customer_name: profile.full_name || '',
          customer_phone: profile.phone || '',
        }))
      }
    }

    loadProfile()
  }, [supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (data.success) {
      setMessage('تم إرسال طلب الدفع بنجاح. سيتم مراجعة التحويل وتفعيل الحساب.')
      setForm((prev) => ({
        ...prev,
        plan_name: 'Starter',
        transaction_reference: '',
      }))
    } else {
      setMessage(data.error || 'حصل خطأ أثناء إرسال الطلب')
    }

    setLoading(false)
  }

  return (
    <div className="w-full max-w-xl border rounded-2xl p-8 space-y-6 bg-white">
      <h1 className="text-3xl font-bold">الدفع والاشتراك</h1>

      <div className="border rounded-xl p-4 bg-gray-50 space-y-2">
        <p className="font-semibold">وسيلة الدفع</p>
        <p>{process.env.NEXT_PUBLIC_PAYMENT_METHOD || 'WE Cash'}</p>
        <p className="text-xl font-bold">
          {process.env.NEXT_PUBLIC_PAYMENT_PHONE || '01515351143'}
        </p>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>1. حوّل قيمة الباقة على الرقم الموجود فوق.</p>
        <p>2. اكتب رقم العملية.</p>
        <p>3. بعد مراجعة التحويل سيتم تفعيل حسابك.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="اسمك"
          value={form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
        />

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="رقم موبايلك"
          value={form.customer_phone}
          onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
        />

        <select
          className="w-full border rounded-xl px-4 py-3"
          value={form.plan_name}
          onChange={(e) => setForm({ ...form, plan_name: e.target.value })}
        >
          {plans.map((plan) => (
            <option key={plan.name} value={plan.name}>
              {plan.name} - {plan.price} EGP
            </option>
          ))}
        </select>

        <div className="border rounded-xl p-4 bg-gray-50">
          <p className="text-sm text-gray-500">المبلغ المطلوب</p>
          <p className="text-2xl font-bold">{selectedPlan?.price} EGP</p>
        </div>

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="رقم العملية"
          value={form.transaction_reference}
          onChange={(e) =>
            setForm({ ...form, transaction_reference: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded-xl py-3"
        >
          {loading ? 'جاري الإرسال...' : 'تم الدفع'}
        </button>
      </form>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  )
}
