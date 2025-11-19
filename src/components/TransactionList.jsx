import React, { useEffect, useState } from 'react'

const formatCurrency = (n) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n || 0)
const formatDate = (iso) => new Date(iso).toLocaleDateString()

export default function TransactionList({ refreshSignal }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setLoading(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const now = new Date()
      const res = await fetch(`${baseUrl}/api/transactions?month=${now.getMonth()+1}&year=${now.getFullYear()}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [refreshSignal])

  return (
    <div className="bg-slate-800/40 border border-white/10 rounded-xl overflow-hidden">
      <div className="grid grid-cols-12 px-4 py-3 text-xs text-slate-300/70 uppercase tracking-wide">
        <div className="col-span-4">Note</div>
        <div className="col-span-3">Category</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-3 text-right">Amount</div>
      </div>
      <div className="divide-y divide-white/10">
        {loading ? (
          <div className="p-6 text-center text-slate-300">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-slate-300">No transactions yet</div>
        ) : (
          items.map((t) => (
            <div key={t.id} className="grid grid-cols-12 px-4 py-3 text-slate-200">
              <div className="col-span-4">{t.note || '-'}</div>
              <div className="col-span-3">{t.category}</div>
              <div className="col-span-2">{t.date ? formatDate(t.date) : '-'}</div>
              <div className={`col-span-3 text-right font-medium ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>{t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
