import emailjs from '@emailjs/browser'

export type ContactPayload = {
  name: string
  email: string
  message: string
}

function getEnv() {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  return { serviceId, templateId, publicKey }
}

export function isEmailJsConfigured(): boolean {
  const { serviceId, templateId, publicKey } = getEnv()
  return Boolean(serviceId && templateId && publicKey)
}

export async function sendContactEmail(data: ContactPayload): Promise<void> {
  const { serviceId, templateId, publicKey } = getEnv()
  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local'
    )
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    },
    { publicKey }
  )
}
