import React, { useState } from 'react'

export default function TransactionForm({ onCreated }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('General')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!amount) return
    try {
      setSaving(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount), type, category, note })
      })
      if (!res.ok) throw new Error('Failed to create transaction')
      setAmount('')
      setNote('')
      if (onCreated) onCreated()
    } catch (e) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/40 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
      <select value={type} onChange={(e)=>setType(e.target.value)} className="bg-slate-900 text-white border border-white/10 rounded px-3 py-2">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="number" min="0" step="0.01" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount" className="flex-1 bg-slate-900 text-white border border-white/10 rounded px-3 py-2" />
      <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category" className="flex-1 bg-slate-900 text-white border border-white/10 rounded px-3 py-2" />
      <input value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Note (optional)" className="flex-[2] bg-slate-900 text-white border border-white/10 rounded px-3 py-2" />
      <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium px-4 py-2 rounded">
        {saving ? 'Saving…' : 'Add'}
      </button>
    </form>
  )
}
