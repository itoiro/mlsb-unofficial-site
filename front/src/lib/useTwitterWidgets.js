let loadPromise

export const ensureTwitterWidgets = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  if (window.twttr && window.twttr.widgets) {
    return Promise.resolve()
  }

  if (loadPromise) {
    return loadPromise
  }

  loadPromise = new Promise((resolve) => {
    const existingScript = document.querySelector('script[data-twitter-widgets]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    script.setAttribute('data-twitter-widgets', 'true')
    script.onload = () => resolve()
    document.body.appendChild(script)
  })

  return loadPromise
}
