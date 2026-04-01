import CheckoutForm from '@/components/CheckoutForm'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function CheckoutPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <CheckoutForm />
    </div>
  )
}
