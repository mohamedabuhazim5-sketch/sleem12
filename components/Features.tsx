const items = [
  {
    title: 'رد تلقائي على واتساب',
    desc: 'رد على الأسئلة المتكررة مثل السعر والعنوان ومواعيد العمل بشكل فوري.',
  },
  {
    title: 'تنظيم المحادثات',
    desc: 'اعرف مين بعت، ومين محتاج متابعة، ومين تم حجزه.',
  },
  {
    title: 'لوحة تحكم بسيطة',
    desc: 'كل الرسائل، الإعدادات، والأسئلة الشائعة في مكان واحد.',
  },
  {
    title: 'تشغيل وإيقاف بسهولة',
    desc: 'تحكم في حالة البوت من لوحة الإعدادات في لحظات.',
  },
  {
    title: 'إدارة الأسئلة الشائعة',
    desc: 'أضف الكلمات المفتاحية والردود بدون الحاجة لتعديل الكود.',
  },
  {
    title: 'مناسب للعيادات',
    desc: 'مصمم كبداية للعيادات ومراكز التجميل والحجوزات المعتمدة على واتساب.',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-6 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          كل اللي تحتاجه لإدارة واتساب العيادة
        </h2>
        <p className="text-center text-gray-600 mb-12">
          بداية بسيطة وسريعة تساعدك تقلل ضياع العملاء وترد أسرع.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="border bg-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
