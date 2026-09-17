// LiveChat Integration (License: 19942685)
export const LIVECHAT_LICENSE = 19942685

export function initLiveChat() {
  if (typeof window === 'undefined') return

  if (window.__lc_initialized) return
  window.__lc_initialized = true

  window.__lc = window.__lc || {}
  window.__lc.license = LIVECHAT_LICENSE
  window.__lc.integration_name = "manual_channels"
  window.__lc.product_name = "livechat"

  if (!window.LiveChatWidget) {
    const queue = []
    const _h = null
    const widget = {
      _q: queue,
      _h: _h,
      _v: '2.0',
      on: function() { queue.push(['on', [].slice.call(arguments)]) },
      once: function() { queue.push(['once', [].slice.call(arguments)]) },
      off: function() { queue.push(['off', [].slice.call(arguments)]) },
      get: function() {
        if (!_h) throw new Error("[LiveChatWidget] You can't use getters before load.")
        return queue.push(['get', [].slice.call(arguments)])
      },
      call: function() { queue.push(['call', [].slice.call(arguments)]) },
      init: function() {
        const script = document.createElement('script')
        script.async = true
        script.type = 'text/javascript'
        script.src = 'https://cdn.livechatinc.com/tracking.js'
        document.head.appendChild(script)
      }
    }
    window.LiveChatWidget = widget
  }

  if (typeof window.LiveChatWidget.init === 'function') {
    window.LiveChatWidget.init()
  }
}

/**
 * In-page smooth live chat opener:
 * Opens the LiveChat widget right inside the website (in-page window/popup)
 */
export function openLiveChat(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault()
  }

  // Ensure init has run
  initLiveChat()

  const triggerOpen = () => {
    let triggered = false

    // 1. LiveChat official Widget API
    if (typeof window !== 'undefined' && window.LiveChatWidget) {
      if (typeof window.LiveChatWidget.call === 'function') {
        try {
          window.LiveChatWidget.call('maximize')
          triggered = true
        } catch (err) {
          console.warn('LiveChat maximize call error:', err)
        }
      }
    }

    // 2. Click minimized DOM elements or iframes
    const candidates = [
      document.querySelector('#chat-widget-minimized'),
      document.querySelector('[data-testid="chat-widget-minimized"]'),
      document.querySelector('iframe#chat-widget-minimized'),
      document.querySelector('#chat-widget-container button'),
      document.querySelector('#chat-widget-container div[role="button"]'),
      document.querySelector('#chat-widget-container iframe')
    ]

    for (const el of candidates) {
      if (el) {
        try {
          el.click()
          triggered = true
          break
        } catch {}
      }
    }

    // 3. PostMessage to LiveChat iframes
    const iframes = document.querySelectorAll('#chat-widget-container iframe, iframe[id*="chat-widget"]')
    iframes.forEach((ifr) => {
      try {
        ifr.contentWindow?.postMessage({ action: 'maximize' }, '*')
        ifr.contentWindow?.postMessage({ name: 'maximize' }, '*')
      } catch {}
    })

    return triggered
  }

  // Immediate attempt
  if (!triggerOpen()) {
    let attempts = 0
    const timer = setInterval(() => {
      attempts++
      if (triggerOpen() || attempts >= 25) {
        clearInterval(timer)
      }
    }, 120)
  }
}



