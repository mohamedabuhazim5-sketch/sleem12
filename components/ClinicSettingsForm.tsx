'use client'

import { useState } from 'react'

type Clinic = {
  id: string
  name: string
  address: string
  consultation_price: number
  working_hours: string
}

export default function ClinicSettingsForm({ clinic }: { clinic: Clinic }) {
  const [form, setForm] = useState({
    id: clinic.id,
    name: clinic.name || '',
    address: clinic.address || '',
    consultation_price: clinic.consultation_price || 0,
    working_hours: clinic.working_hours || '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/clinic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (data.success) {
      setMessage('تم حفظ البيانات بنجاح')
    } else {
      setMessage(data.error || 'حصل خطأ')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border rounded-xl px-4 py-3"
        placeholder="اسم العيادة"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full border rounded-xl px-4 py-3"
        placeholder="العنوان"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <input
        className="w-full border rounded-xl px-4 py-3"
        placeholder="سعر الكشف"
        type="number"
        value={form.consultation_price}
        onChange={(e) =>
          setForm({ ...form, consultation_price: Number(e.target.value) })
        }
      />

      <input
        className="w-full border rounded-xl px-4 py-3"
        placeholder="مواعيد العمل"
        value={form.working_hours}
        onChange={(e) => setForm({ ...form, working_hours: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        {loading ? 'جاري الحفظ...' : 'حفظ'}
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  )
}
