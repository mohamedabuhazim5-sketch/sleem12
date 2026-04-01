export default function CTA() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto border rounded-3xl p-10 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          جاهز تبدأ Sleem؟
        </h2>

        <p className="text-gray-600 mb-8">
          أنشئ حسابك الآن وابدأ في تحويل رسائل واتساب إلى حجوزات فعلية.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            إنشاء حساب
          </a>

          <a
            href="/checkout"
            className="border px-6 py-3 rounded-xl"
          >
            اشترك الآن
          </a>
        </div>
      </div>
    </section>
  )
}
