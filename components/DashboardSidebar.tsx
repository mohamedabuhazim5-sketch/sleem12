import { createClient } from '@/lib/supabase-server'

export default async function DashboardSidebar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/dashboard/settings' },
    { label: 'FAQ', href: '/dashboard/faq' },
    { label: 'Conversations', href: '/dashboard/conversations' },
    { label: 'Billing', href: '/dashboard/billing' },
    { label: 'Connect WhatsApp', href: '/dashboard/connect-whatsapp' },
  ]

  const adminLinks = [
    { label: 'Payments', href: '/dashboard/payments' },
    { label: 'Subscriptions', href: '/dashboard/subscriptions' },
  ]

  return (
    <aside className="hidden md:flex w-64 border-r bg-white p-6 flex-col">
      <a href="/" className="text-2xl font-bold mb-8">
        Sleem
      </a>

      <nav className="space-y-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            {link.label}
          </a>
        ))}

        {isAdmin && (
          <>
            <div className="pt-4 pb-2 text-xs uppercase text-gray-400">
              Admin
            </div>

            {adminLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                {link.label}
              </a>
            ))}
          </>
        )}
      </nav>

      <div className="mt-auto pt-8">
        <a
          href="/checkout"
          className="block text-center bg-black text-white px-4 py-3 rounded-xl"
        >
          Upgrade Plan
        </a>
      </div>
    </aside>
  )
}
