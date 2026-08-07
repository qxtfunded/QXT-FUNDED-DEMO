// LiveChat Integration (License: 19886614)

export function initLiveChat() {
  if (typeof window === 'undefined') return

  if (window.__lc_initialized) return
  window.__lc_initialized = true

  window.__lc = window.__lc || {}
  window.__lc.license = 19886614
  window.__lc.integration_name = "manual_channels"
  window.__lc.product_name = "livechat"

  const script = document.createElement('script')
  script.async = true
  script.type = 'text/javascript'
  script.src = 'https://cdn.livechatinc.com/tracking.js'

  // Initialize LiveChatWidget queue if not present
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
        document.head.appendChild(script)
      }
    }
    window.LiveChatWidget = widget
  }

  window.LiveChatWidget.init()

  // Hide default floating widget by default so it only opens when clicking "Live Chat" in Support Center
  window.LiveChatWidget.on('ready', () => {
    try {
      window.LiveChatWidget.call('hide')
    } catch (e) {
      console.error(e)
    }
  })
}

export function openLiveChat() {
  initLiveChat()

  if (window.LiveChatWidget && typeof window.LiveChatWidget.call === 'function') {
    try {
      window.LiveChatWidget.call('show')
      window.LiveChatWidget.call('maximize')
      return
    } catch (err) {
      console.warn('LiveChat maximize call failed, falling back to direct URL:', err)
    }
  }

  // Fallback to official LiveChat web window
  window.open('https://www.livechat.com/chat-with/19886614/', '_blank', 'noopener,noreferrer')
}
