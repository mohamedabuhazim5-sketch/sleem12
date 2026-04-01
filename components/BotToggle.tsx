'use client'

import { useState } from 'react'

export default function BotToggle({
  clinicId,
  initialValue,
}: {
  clinicId: string
  initialValue: boolean
}) {
  const [enabled, setEnabled] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleToggle() {
    setLoading(true)
    setMessage('')

    const nextValue = !enabled

    const res = await fetch('/api/clinic/toggle-bot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: clinicId,
        is_bot_enabled: nextValue,
      }),
    })

    const data = await res.json()

    if (data.success) {
      setEnabled(nextValue)
      setMessage(nextValue ? 'تم تشغيل البوت' : 'تم إيقاف البوت')
    } else {
      setMessage(data.error || 'حصل خطأ')
    }

    setLoading(false)
  }

  return (
    <div className="border bg-white rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">حالة البوت</h3>
          <p className="text-sm text-gray-500">
            {enabled ? 'البوت مفعل الآن' : 'البوت متوقف الآن'}
          </p>
        </div>

        <button
          onClick={handleToggle}
          disabled={loading}
          className={`px-5 py-3 rounded-xl text-white ${
            enabled ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {loading ? 'جاري التحديث...' : enabled ? 'إيقاف البوت' : 'تشغيل البوت'}
        </button>
      </div>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  )
}
