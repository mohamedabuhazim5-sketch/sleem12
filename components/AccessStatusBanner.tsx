type Props = {
  state: 'active' | 'pending' | 'approved' | 'rejected' | 'none'
  planName?: string | null
}

export default function AccessStatusBanner({ state, planName }: Props) {
  if (state === 'active') {
    return (
      <div className="border border-green-200 bg-green-50 rounded-2xl p-4">
        <p className="font-semibold text-green-800">
          اشتراكك مفعل{planName ? ` على باقة ${planName}` : ''}.
        </p>
      </div>
    )
  }

  if (state === 'pending') {
    return (
      <div className="border border-yellow-200 bg-yellow-50 rounded-2xl p-4 space-y-2">
        <p className="font-semibold text-yellow-800">طلب الدفع قيد المراجعة.</p>
        <p className="text-sm text-yellow-700">
          سيتم تفعيل حسابك بعد مراجعة التحويل.
        </p>
      </div>
    )
  }

  if (state === 'rejected') {
    return (
      <div className="border border-red-200 bg-red-50 rounded-2xl p-4 space-y-3">
        <p className="font-semibold text-red-800">تم رفض طلب الدفع الأخير.</p>
        <p className="text-sm text-red-700">
          راجع رقم العملية أو أرسل طلب دفع جديد.
        </p>
        <a
          href="/checkout/rejected"
          className="inline-block bg-black text-white px-4 py-2 rounded-xl"
        >
          إعادة المحاولة
        </a>
      </div>
    )
  }

  if (state === 'approved') {
    return (
      <div className="border border-blue-200 bg-blue-50 rounded-2xl p-4">
        <p className="font-semibold text-blue-800">
          تمت الموافقة على الدفع، وجارٍ تفعيل الوصول.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 bg-gray-50 rounded-2xl p-4 space-y-3">
      <p className="font-semibold text-gray-800">لا يوجد اشتراك مفعل حاليًا.</p>
      <a
        href="/checkout"
        className="inline-block bg-black text-white px-4 py-2 rounded-xl"
      >
        اشترك الآن
      </a>
    </div>
  )
}