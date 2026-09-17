// LiveChat Integration (License: 19942685)
export const LIVECHAT_LICENSE = 19942685
export const LIVECHAT_DIRECT_URL = `https://www.livechat.com/chat-with/${LIVECHAT_LICENSE}/`

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

  // Keep widget ready
  window.LiveChatWidget.on('ready', () => {
    try {
      // Keep widget ready for instant invocation
    } catch (e) {
      console.error(e)
    }
  })
}

/**
 * 1-click instant live chat opener:
 * Opens official LiveChat chat portal directly in a clean dedicated tab
 * so user never experiences lag, stuck scripts, or iframe restrictions,
 * while also triggering the in-page widget if supported.
 */
export function openLiveChat(e) {
  if (e && typeof e.preventDefault === 'function') {
    // allow clean execution without event collision
  }

  // 1. Instantly open dedicated live chat page in new tab/window without popup blocking
  try {
    const chatWindow = window.open(
      LIVECHAT_DIRECT_URL,
      '_blank',
      'noopener,noreferrer'
    )
    if (chatWindow) {
      chatWindow.focus()
    }
  } catch (err) {
    console.warn('Direct chat window open error:', err)
  }

  // 2. Also initialize and maximize the on-site widget in case user returns to this tab
  try {
    initLiveChat()
    if (window.LiveChatWidget && typeof window.LiveChatWidget.call === 'function') {
      window.LiveChatWidget.call('maximize')
    }
  } catch (err) {
    // Non-blocking
  }
}

