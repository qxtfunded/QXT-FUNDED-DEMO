import { useState, useEffect } from 'react'
import { openLiveChat } from '../../lib/livechat'

export default function LiveChatFloatingButton() {
  const [isChatMaximized, setIsChatMaximized] = useState(false)

  // Listen to LiveChatWidget visibility if in-page widget is opened
  useEffect(() => {
    const attachListener = () => {
      if (typeof window !== 'undefined' && window.LiveChatWidget && typeof window.LiveChatWidget.on === 'function') {
        window.LiveChatWidget.on('visibility_changed', (data) => {
          if (data && data.visibility === 'maximized') {
            setIsChatMaximized(true)
          } else {
            setIsChatMaximized(false)
          }
        })
        return true
      }
      return false
    }

    if (!attachListener()) {
      const timer = setInterval(() => {
        if (attachListener()) {
          clearInterval(timer)
        }
      }, 300)
      return () => clearInterval(timer)
    }
  }, [])

  const handleClick = (e) => {
    openLiveChat(e)
  }

  return (
    <div
      id="qxt-floating-livechat-container"
      className={`fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center print:hidden transition-all duration-300 ${
        isChatMaximized ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100'
      }`}
    >
      {/* Button to open chat right inside website */}
      <button
        id="qxt-livechat-trigger"
        type="button"
        onClick={handleClick}
        aria-label="Open 24/7 Live Support Chat"
        className="group relative flex items-center rounded-full bg-gradient-to-r from-ink-900 via-ink-850 to-ink-900 py-2 sm:py-2.5 px-3.5 sm:px-4.5 text-paper-100 shadow-[0_4px_20px_rgba(0,0,0,0.6)] border border-gold-500/30 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-gold-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] active:scale-95 cursor-pointer text-left"
      >
        {/* Glow effect */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold-500/20 via-mint-500/10 to-gold-500/20 opacity-0 blur transition duration-300 group-hover:opacity-100 pointer-events-none" />

        {/* Text Details */}
        <div className="flex flex-col text-left pointer-events-none select-none">
          <span className="text-[11px] sm:text-xs font-bold text-paper-100 group-hover:text-gold-300 transition-colors leading-tight">
            24/7 Live Chat
          </span>
          <span className="text-[9px] sm:text-[10px] font-medium text-mint-400 flex items-center gap-1.5 mt-0.5 leading-tight">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint-400 animate-pulse" />
            Online Support
          </span>
        </div>
      </button>
    </div>
  )
}



