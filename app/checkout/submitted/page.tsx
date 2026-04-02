export default function CheckoutSubmittedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-xl border bg-white rounded-2xl p-8 space-y-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
          ⏳
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">تم إرسال طلب الدفع</h1>
          <p className="text-gray-600">
            طلبك الآن قيد المراجعة. بعد التأكد من التحويل سيتم تفعيل اشتراكك.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/dashboard/billing"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            متابعة حالة الاشتراك
          </a>

          <a
            href="/dashboard"
            className="border px-6 py-3 rounded-xl"
          >
            العودة للوحة التحكم
          </a>
        </div>
      </div>
    </div>
  )
}