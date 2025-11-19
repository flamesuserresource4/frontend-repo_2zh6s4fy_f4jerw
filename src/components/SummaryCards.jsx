import React, { useEffect, useState } from 'react'

const formatCurrency = (n) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n || 0)

export default function SummaryCards() {
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 })
  const [loading, setLoading] = useState(true)

  const loadSummary = async () => {
    try {
      setLoading(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/summary/month`)
      const data = await res.json()
      setSummary(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadSummary() }, [])

  const items = [
    { label: 'Total Income', value: summary.total_income, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { label: 'Total Expenses', value: summary.total_expense, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
    { label: 'Balance', value: summary.balance, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6 grid gap-4 sm:grid-cols-3">
      {items.map((it) => (
        <div key={it.label} className={`rounded-xl border ${it.border} ${it.bg} p-5`}> 
          <p className="text-sm text-slate-300/80">{it.label}</p>
          <p className={`text-2xl font-bold mt-1 ${it.color}`}>{loading ? '…' : formatCurrency(it.value)}</p>
        </div>
      ))}
    </section>
  )
}
