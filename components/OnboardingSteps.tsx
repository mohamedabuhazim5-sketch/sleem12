type Step = {
  title: string
  done: boolean
}

export default function OnboardingSteps({ steps }: { steps: Step[] }) {
  const completedCount = steps.filter((step) => step.done).length
  const progress = Math.round((completedCount / steps.length) * 100)

  return (
    <div className="border bg-white rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">التقدم</h3>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className={`border rounded-2xl p-4 ${
              step.done ? 'bg-green-50 border-green-200' : 'bg-gray-50'
            }`}
          >
            <p className="font-semibold">{step.title}</p>
            <p className="text-sm text-gray-500 mt-1">
              {step.done ? 'مكتمل' : 'غير مكتمل'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}