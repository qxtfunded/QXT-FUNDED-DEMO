import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from '../ui/CookieBanner';
import LiveChatFloatingButton from '../ui/LiveChatFloatingButton';
import ScrollToTop from './ScrollToTop';

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#070A12] text-slate-100 selection:bg-emerald-500 selection:text-black">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <LiveChatFloatingButton />
    </div>
  );
}
