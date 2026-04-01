'use client'

import { useState } from 'react'

type FAQ = {
  id: string
  clinic_id: string
  keyword: string
  answer: string
}

export default function FAQManager({
  clinicId,
  initialFaqs,
}: {
  clinicId: string
  initialFaqs: FAQ[]
}) {
  const [faqs, setFaqs] = useState(initialFaqs)
  const [keyword, setKeyword] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleAddFAQ(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clinic_id: clinicId,
        keyword,
        answer,
      }),
    })

    const data = await res.json()

    if (data.success) {
      setFaqs([data.faq, ...faqs])
      setKeyword('')
      setAnswer('')
      setMessage('تمت إضافة السؤال بنجاح')
    } else {
      setMessage(data.error || 'حصل خطأ')
    }

    setLoading(false)
  }

  async function handleDeleteFAQ(id: string) {
    const res = await fetch(`/api/faq/${id}`, {
      method: 'DELETE',
    })

    const data = await res.json()

    if (data.success) {
      setFaqs(faqs.filter((faq) => faq.id !== id))
    } else {
      alert(data.error || 'فشل الحذف')
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleAddFAQ} className="border rounded-2xl p-6 space-y-4 bg-gray-50">
        <h2 className="text-xl font-bold">إضافة سؤال جديد</h2>

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="الكلمة المفتاحية مثل: سعر"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <textarea
          className="w-full border rounded-xl px-4 py-3 min-h-[120px]"
          placeholder="الرد الذي سيرسله البوت"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? 'جاري الإضافة...' : 'إضافة'}
        </button>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">الأسئلة الحالية</h2>

        {faqs.length === 0 && (
          <p className="text-gray-500">لا توجد أسئلة مضافة حتى الآن</p>
        )}

        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border rounded-2xl p-5 flex items-start justify-between gap-4 bg-white"
          >
            <div>
              <p className="font-bold mb-2">الكلمة: {faq.keyword}</p>
              <p className="text-gray-700">{faq.answer}</p>
            </div>

            <button
              onClick={() => handleDeleteFAQ(faq.id)}
              className="border px-4 py-2 rounded-xl"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
