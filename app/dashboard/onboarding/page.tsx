import { requireUser } from '@/lib/require-user'
import { createClient } from '@/lib/supabase-server'
import { getAccessState } from '@/lib/get-access-state'
import AccessStatusBanner from '@/components/AccessStatusBanner'
import ClinicSettingsForm from '@/components/ClinicSettingsForm'
import ConnectWhatsAppForm from '@/components/ConnectWhatsAppForm'
import FAQManager from '@/components/FAQManager'
import BotToggle from '@/components/BotToggle'
import OnboardingSteps from '@/components/OnboardingSteps'

export default async function OnboardingPage() {
  const user = await requireUser()
  const supabase = await createClient()
  const access = await getAccessState(user.id)

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!clinic) {
    return <div className="p-8">لا توجد عيادة حتى الآن</div>
  }

  const { data: faqs } = await supabase
    .from('faq')
    .select('*')
    .eq('clinic_id', clinic.id)
    .order('created_at', { ascending: false })

  const steps = [
    {
      title: 'بيانات العيادة',
      done: !!clinic.name && clinic.name !== 'My Clinic',
    },
    {
      title: 'ربط واتساب',
      done:
        !!clinic.whatsapp_phone_number_id &&
        !!clinic.whatsapp_access_token,
    },
    {
      title: 'الأسئلة الشائعة',
      done: !!faqs?.length,
    },
    {
      title: 'تشغيل البوت',
      done: !!clinic.is_bot_enabled,
    },
  ]

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Onboarding</h2>
        <p className="text-gray-500 mt-1">
          كمّل الإعدادات الأساسية لتشغيل Sleem على عيادتك.
        </p>
      </div>

      <AccessStatusBanner
        state={access.state}
        planName={access.subscription?.plan_name || access.paymentRequest?.plan_name}
      />

      <OnboardingSteps steps={steps} />

      <section className="space-y-6">
        <div className="border bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-4">1) بيانات العيادة</h3>
          <ClinicSettingsForm clinic={clinic} />
        </div>

        <div className="border bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-4">2) ربط واتساب</h3>
          <ConnectWhatsAppForm clinic={clinic} />
        </div>

        <div className="border bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-4">3) إضافة FAQ</h3>
          <FAQManager clinicId={clinic.id} initialFaqs={faqs || []} />
        </div>

        <div className="border bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-4">4) تشغيل البوت</h3>
          <BotToggle
            clinicId={clinic.id}
            initialValue={clinic.is_bot_enabled}
          />
        </div>
      </section>
    </div>
  )
}