const steps = [
  {
    title: 'أنشئ حسابك',
    desc: 'سجل حسابك وابدأ إعداد العيادة الخاصة بك.',
  },
  {
    title: 'أضف الأسئلة والردود',
    desc: 'حدد الكلمات المفتاحية والردود التي سيرسلها البوت تلقائيًا.',
  },
  {
    title: 'فعّل البوت',
    desc: 'شغّل Sleem وابدأ استقبال الرسائل والرد عليها مباشرة.',
  },
  {
    title: 'راجع المحادثات',
    desc: 'تابع العملاء والحجوزات وحالة كل محادثة من لوحة التحكم.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          كيف يعمل Sleem؟
        </h2>
        <p className="text-center text-gray-600 mb-12">
          خطوات بسيطة للبدء خلال دقائق.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-gray-50 border rounded-2xl p-6">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-4 font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
