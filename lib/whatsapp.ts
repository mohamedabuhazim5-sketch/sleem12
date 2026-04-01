export async function sendWhatsAppMessage({
  phoneNumberId,
  accessToken,
  to,
  text,
}: {
  phoneNumberId: string
  accessToken: string
  to: string
  text: string
}) {
  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body: text },
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.error?.message || 'Failed to send WhatsApp message')
  }

  return data
}