import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+\-\s()]{7,}$/

const INITIAL_VALUES = { name: '', email: '', phone: '', message: '', company: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email address.'
  if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = 'Enter a valid phone number.'
  if (!values.message.trim()) errors.message = 'Please add a short message.'
  else if (values.message.trim().length < 10) errors.message = 'Message is a little short — a few more details help.'
  return errors
}

/**
 * Encapsulates the contact form's client-side validation and submit
 * lifecycle (idle -> submitting -> success | error) so `Contact.jsx` stays
 * presentational. `company` is a honeypot field — real visitors never see
 * or fill it (visually hidden + tabIndex -1), so anything landing there is
 * treated as spam and silently dropped before a network call is made.
 *
 * To wire up a real backend: replace the body of `submitToBackend` with a
 * `fetch()` call to your endpoint (Formspree, a serverless function, your
 * own API, etc). Everything else — validation, UI states — stays the same.
 */
export function useContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function submitToBackend(payload) {
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

    // No endpoint configured yet — resolve as a mock success so the full
    // UI flow (loading -> success) can be reviewed/demoed before a real
    // backend exists. Set VITE_CONTACT_FORM_ENDPOINT (see .env.example) to
    // switch this over to a real network call with zero other changes.
    if (!endpoint) {
      await new Promise((resolve) => setTimeout(resolve, 900))
      return { ok: true, payload }
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return { ok: response.ok, payload }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // Honeypot triggered — quietly pretend to succeed, do nothing further.
    if (values.company) {
      setStatus('success')
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    try {
      const result = await submitToBackend(values)
      if (!result.ok) throw new Error('Submission failed')
      setStatus('success')
      setValues(INITIAL_VALUES)
    } catch {
      setStatus('error')
    }
  }

  function reset() {
    setStatus('idle')
    setValues(INITIAL_VALUES)
    setErrors({})
  }

  return { values, errors, status, handleChange, handleSubmit, reset }
}
