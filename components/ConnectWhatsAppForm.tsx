'use client'

import { useState } from 'react'

type Clinic = {
  id: string
  whatsapp_phone_number_id?: string | null
  whatsapp_business_account_id?: string | null
  whatsapp_access_token?: string | null
  whatsapp_test_number?: string | null
  whatsapp_webhook_verified?: boolean | null
}

export default function ConnectWhatsAppForm({ clinic }: { clinic: Clinic }) {
  const [form, setForm] = useState({
    clinic_id: clinic.id,
    whatsapp_phone_number_id: clinic.whatsapp_phone_number_id || '',
    whatsapp_business_account_id: clinic.whatsapp_business_account_id || '',
    whatsapp_access_token: clinic.whatsapp_access_token || '',
    whatsapp_test_number: clinic.whatsapp_test_number || '',
  })

  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/clinic/connect-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (data.success) {
      setMessage('تم حفظ بيانات واتساب بنجاح')
    } else {
      setMessage(data.error || 'حصل خطأ')
    }

    setLoading(false)
  }

  async function handleTest() {
    setTesting(true)
    setMessage('')

    const res = await fetch('/api/clinic/test-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clinic_id: clinic.id }),
    })

    const data = await res.json()

    if (data.success) {
      setMessage('تم إرسال رسالة الاختبار بنجاح')
    } else {
      setMessage(data.error || 'فشل إرسال رسالة الاختبار')
    }

    setTesting(false)
  }

  return (
    <div className="space-y-6">
      <div className="border bg-white rounded-2xl p-6 space-y-2">
        <h3 className="text-xl font-bold">حالة الربط</h3>
        <p className="text-sm text-gray-600">
          {clinic.whatsapp_webhook_verified ? 'تم الربط بنجاح' : 'لم يتم التأكيد بعد'}
        </p>
      </div>

      <form onSubmit={handleSave} className="border bg-white rounded-2xl p-6 space-y-4">
        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Phone Number ID"
          value={form.whatsapp_phone_number_id}
          onChange={(e) =>
            setForm({ ...form, whatsapp_phone_number_id: e.target.value })
          }
        />

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Business Account ID"
          value={form.whatsapp_business_account_id}
          onChange={(e) =>
            setForm({ ...form, whatsapp_business_account_id: e.target.value })
          }
        />

        <textarea
          className="w-full border rounded-xl px-4 py-3 min-h-[120px]"
          placeholder="Access Token"
          value={form.whatsapp_access_token}
          onChange={(e) =>
            setForm({ ...form, whatsapp_access_token: e.target.value })
          }
        />

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="رقم واتساب للاختبار مثال: 2010xxxxxxx"
          value={form.whatsapp_test_number}
          onChange={(e) =>
            setForm({ ...form, whatsapp_test_number: e.target.value })
          }
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ البيانات'}
          </button>

          <button
            type="button"
            disabled={testing}
            onClick={handleTest}
            className="border px-6 py-3 rounded-xl"
          >
            {testing ? 'جاري الاختبار...' : 'إرسال رسالة اختبار'}
          </button>
        </div>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  )
}