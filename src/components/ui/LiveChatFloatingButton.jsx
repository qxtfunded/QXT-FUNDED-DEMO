import { useState, useEffect } from 'react'
import { MessageSquare, Sparkles, X } from 'lucide-react'
import { openLiveChat } from '../../lib/livechat'

export default function LiveChatFloatingButton() {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Listen to LiveChatWidget visibility if possible
  useEffect(() => {
    if (typeof window !== 'undefined' && window.LiveChatWidget) {
      window.LiveChatWidget.on('visibility_changed', (data) => {
        if (data && data.visibility === 'maximized') {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      })
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      id="qxt-floating-livechat-container"
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3 animate-fade-in print:hidden"
    >
      {/* Floating Action Button */}
      <button
        id="qxt-livechat-trigger"
        onClick={openLiveChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open 24/7 Live Support Chat"
        className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-ink-900 via-ink-850 to-ink-900 py-3 px-4.5 text-paper-100 shadow-2xl border border-gold-500/30 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-gold-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] active:scale-95"
      >
        {/* Glow effect */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold-500/20 via-mint-500/10 to-gold-500/20 opacity-0 blur transition duration-300 group-hover:opacity-100" />

        {/* Icon & Pulse Status Dot */}
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/30 group-hover:bg-gold-500 group-hover:text-ink-950 transition-colors duration-200">
          <MessageSquare size={17} className="transition-transform group-hover:scale-110" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint-500 border border-ink-900" />
          </span>
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-paper-100 group-hover:text-gold-300 transition-colors">
            24/7 Live Chat
          </span>
          <span className="text-[10px] font-medium text-mint-400 flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint-400 animate-pulse" />
            Online Support
          </span>
        </div>
      </button>
    </div>
  )
}
