export default function Hero() {
  return (
    <section className="px-6 py-24 text-center bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-medium text-gray-500 mb-4">
          Sleem for Clinics
        </p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          حول رسائل واتساب
          <br />
          إلى حجوزات حقيقية
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Sleem يساعد العيادات ومراكز التجميل على الرد التلقائي على واتساب،
          تنظيم المحادثات، وتحويل الاستفسارات إلى حجوزات بدون ضغط على الفريق.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            ابدأ الآن
          </a>

          <a
            href="/checkout"
            className="border px-6 py-3 rounded-xl"
          >
            اشترك مباشرة
          </a>
        </div>
      </div>
    </section>
  )
}
