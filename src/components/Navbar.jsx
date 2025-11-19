import React from 'react'

export default function Navbar() {
  return (
    <header className="w-full border-b border-white/10 bg-slate-900/70 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5C3 6.91 5.91 4 9.5 4S16 6.91 16 10.5c0 2.12-.85 4.04-2.22 5.44a15.8 15.8 0 0 1-4.1 2.92c-.37.18-.8.18-1.16 0a15.8 15.8 0 0 1-4.1-2.92A7.63 7.63 0 0 1 3 10.5Zm6.5 0h.01M20.5 20l-3-3m0 0l-3 3m3-3v6"/></svg>
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">Money Manager</p>
            <p className="text-xs text-blue-300/70">Track income and expenses</p>
          </div>
        </div>
        <a href="/test" className="text-sm text-blue-300 hover:text-blue-200">System Check</a>
      </div>
    </header>
  )
}
