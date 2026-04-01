'use client'

import { useState } from 'react'

const statuses = ['new', 'pending', 'booked', 'closed']

const statusLabels: Record<string, string> = {
  new: 'جديد',
  pending: 'متابعة',
  booked: 'تم الحجز',
  closed: 'مغلق',
}

export default function LeadStatusUpdater({
  leadId,
  currentStatus,
}: {
  leadId: string
  currentStatus: string
}) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  async function handleChange(newStatus: string) {
    const previousStatus = status
    setStatus(newStatus)
    setLoading(true)

    const res = await fetch('/api/leads/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: leadId,
        status: newStatus,
      }),
    })

    const data = await res.json()

    if (!data.success) {
      alert(data.error || 'فشل تحديث الحالة')
      setStatus(previousStatus)
    }

    setLoading(false)
  }

  return (
    <div className="min-w-[180px]">
      <label className="block text-sm font-medium mb-2">الحالة</label>

      <select
        className="w-full border rounded-xl px-3 py-2"
        value={status}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value)}
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {statusLabels[item]}
          </option>
        ))}
      </select>
    </div>
  )
}
