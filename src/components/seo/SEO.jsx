import { useEffect } from 'react'

const SITE_NAME = 'Atul Kudtarkar & Associates'
const SITE_URL = 'https://www.atulkudtarkarassociates.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

function setMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Lightweight per-page SEO manager (no react-helmet dependency): sets
 * title/description/canonical/Open Graph/Twitter tags and an optional
 * JSON-LD structured data block, and restores the previous title on
 * unmount so route transitions never leak stale metadata.
 */
export function SEO({ title, description, path = '/', image = DEFAULT_IMAGE, structuredData, type = 'website' }) {
  useEffect(() => {
    const previousTitle = document.title
    const fullTitle = `${title} | ${SITE_NAME}`
    document.title = fullTitle
    const url = `${SITE_URL}${path}`

    setMeta('name', 'description', description)
    setLink('canonical', url)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:site_name', SITE_NAME)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    setJsonLd('seo-structured-data', structuredData)

    return () => {
      document.title = previousTitle
    }
  }, [title, description, path, image, structuredData, type])

  return null
}
