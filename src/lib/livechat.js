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

  const tryOpenWidget = () => {
    // 1. Try LiveChat official maximize API
    if (window.LiveChatWidget && typeof window.LiveChatWidget.call === 'function') {
      try {
        window.LiveChatWidget.call('maximize')
        return true
      } catch (err) {
        console.warn('LiveChat maximize error:', err)
      }
    }

    // 2. Fallback: Directly click any rendered LiveChat launcher button in DOM if present
    const domLauncher =
      document.querySelector('#chat-widget-minimized') ||
      document.querySelector('[data-testid="chat-widget-minimized"]') ||
      document.querySelector('#chat-widget-container iframe')
    if (domLauncher && typeof domLauncher.click === 'function') {
      try {
        domLauncher.click()
        return true
      } catch {}
    }

    return false
  }

  // Immediate attempt
  if (!tryOpenWidget()) {
    // Polling attempts while script loads
    let count = 0
    const interval = setInterval(() => {
      count++
      if (tryOpenWidget() || count >= 20) {
        clearInterval(interval)
      }
    }, 150)
  }
}



