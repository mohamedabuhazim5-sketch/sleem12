'use client'

import { useState } from 'react'

const statuses = ['pending', 'approved', 'rejected']

const labels: Record<string, string> = {
  pending: 'قيد المراجعة',
  approved: 'تمت الموافقة',
  rejected: 'مرفوض',
}

export default function PaymentStatusUpdater({
  paymentId,
  currentStatus,
}: {
  paymentId: string
  currentStatus: string
}) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  async function handleChange(newStatus: string) {
    const oldStatus = status
    setStatus(newStatus)
    setLoading(true)

    const res = await fetch('/api/payment/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: paymentId,
        status: newStatus,
      }),
    })

    const data = await res.json()

    if (!data.success) {
      alert(data.error || 'فشل تحديث حالة الدفع')
      setStatus(oldStatus)
    }

    setLoading(false)
  }

  return (
    <div className="min-w-[200px]">
      <label className="block text-sm font-medium mb-2">الحالة</label>
      <select
        className="w-full border rounded-xl px-3 py-2"
        value={status}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value)}
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {labels[item]}
          </option>
        ))}
      </select>
    </div>
  )
}
