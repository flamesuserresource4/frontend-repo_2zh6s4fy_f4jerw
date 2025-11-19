import React, { useState } from 'react'
import Navbar from './components/Navbar'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const triggerRefresh = () => setRefreshKey((k) => k + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Money Management</h1>
        <p className="text-slate-300">Add incomes and expenses, see this month's totals and your running balance.</p>

        <SummaryCards key={`sum-${refreshKey}`} />
        <TransactionForm onCreated={triggerRefresh} />
        <TransactionList refreshSignal={refreshKey} />
      </main>
    </div>
  )
}

export default App
