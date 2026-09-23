import { createHash } from 'crypto'

const TAG = 'summit2027-subscribe'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Ties this route to the Node runtime, which `crypto` needs. */
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const listId = process.env.MAILCHIMP_LIST_ID
  if (!apiKey || !listId) {
    console.error('summit27-newsletter: MAILCHIMP_API_KEY or MAILCHIMP_LIST_ID is not set')
    return Response.json({ error: 'Newsletter signup is not configured.' }, { status: 500 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const email = (body as { email?: unknown } | null)?.email
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
  if (!EMAIL_RE.test(normalizedEmail)) {
    return Response.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const dc = apiKey.slice(apiKey.lastIndexOf('-') + 1)
  const hash = createHash('md5').update(normalizedEmail).digest('hex')
  const memberUrl = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${hash}`
  const authHeaders = {
    Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const memberRes = await fetch(memberUrl, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({ email_address: normalizedEmail, status: 'subscribed' }),
  })

  if (!memberRes.ok) {
    const detail = await memberRes.text()
    console.error(`summit27-newsletter: Mailchimp member PUT ${memberRes.status}`, detail)
    let title: string | undefined
    try {
      title = (JSON.parse(detail) as { title?: string }).title
    } catch {
      // Non-JSON body from Mailchimp; fall through to the generic message.
    }
    const error =
      title === 'Member Exists'
        ? 'You’re already signed up with that email.'
        : 'Could not complete signup. Please try again later.'
    return Response.json({ error }, { status: 502 })
  }

  const tagRes = await fetch(`${memberUrl}/tags`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ tags: [{ name: TAG, status: 'active' }] }),
  })

  if (!tagRes.ok) {
    const detail = await tagRes.text()
    console.error(`summit27-newsletter: Mailchimp tag POST ${tagRes.status}`, detail)
    // The subscription itself succeeded; the tag is secondary, so still report success.
  }

  return Response.json({ ok: true })
}
