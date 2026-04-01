const plans = [
  {
    name: 'Starter',
    price: '999',
    desc: 'مناسبة للبداية',
    features: ['رد تلقائي', 'بيانات العيادة', 'دعم أساسي'],
  },
  {
    name: 'Pro',
    price: '2499',
    desc: 'الأفضل للعيادات النشطة',
    features: ['كل اللي في Starter', 'تحويل لموظف', 'تقارير بسيطة', 'إدارة محادثات'],
  },
  {
    name: 'Premium',
    price: '4999',
    desc: 'للإعدادات المخصصة',
    features: ['كل اللي في Pro', 'تخصيص كامل', 'أولوية في الدعم'],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          أسعار واضحة وبسيطة
        </h2>
        <p className="text-center text-gray-600 mb-12">
          اختر الباقة المناسبة وابدأ تشغيل واتساب بشكل أذكى.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="border bg-white rounded-2xl p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-500 mb-4">{plan.desc}</p>
              <p className="text-4xl font-bold mb-6">
                {plan.price} <span className="text-lg">EGP</span>
              </p>

              <ul className="space-y-3 mb-8 text-gray-700">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <a
                href="/checkout"
                className="mt-auto text-center bg-black text-white px-6 py-3 rounded-xl"
              >
                اشترك الآن
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
