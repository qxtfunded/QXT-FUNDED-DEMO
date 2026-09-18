import { openLiveChat } from '../../lib/livechat'

export default function LiveChatFloatingButton() {
  const handleClick = (e) => {
    openLiveChat(e)
  }

  return (
    <div
      id="qxt-floating-livechat-container"
      className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-[99999] flex items-center print:hidden"
    >
      {/* Button to open chat right inside website */}
      <button
        id="qxt-livechat-trigger"
        type="button"
        onClick={handleClick}
        aria-label="Open 24/7 Live Support Chat"
        className="group relative flex items-center rounded-full bg-gradient-to-r from-ink-900 via-ink-850 to-ink-900 py-2 sm:py-2.5 px-3.5 sm:px-4.5 text-paper-100 shadow-[0_4px_25px_rgba(0,0,0,0.8)] border border-gold-500/40 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-gold-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] active:scale-95 cursor-pointer text-left"
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



