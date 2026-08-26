// LiveChat Integration (License: 19915466)
export const LIVECHAT_LICENSE = 19915466

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

  window.LiveChatWidget.init()

  // Always hide the default blue bubble launcher to keep only the custom QXT UI widget
  window.LiveChatWidget.on('ready', () => {
    try {
      window.LiveChatWidget.call('hide')
    } catch (e) {
      console.error(e)
    }
  })

  window.LiveChatWidget.on('visibility_changed', (data) => {
    if (data && (data.visibility === 'minimized' || data.visibility === 'hidden')) {
      try {
        window.LiveChatWidget.call('hide')
      } catch (e) {
        console.error(e)
      }
    }
  })
}

export function openLiveChat() {
  initLiveChat()

  if (window.LiveChatWidget && typeof window.LiveChatWidget.call === 'function') {
    try {
      window.LiveChatWidget.call('maximize')
      return
    } catch (err) {
      console.warn('LiveChat maximize call failed, falling back to direct URL:', err)
    }
  }

  // Fallback to official LiveChat web window
  window.open(`https://www.livechat.com/chat-with/${LIVECHAT_LICENSE}/`, '_blank', 'noopener,noreferrer')
}

