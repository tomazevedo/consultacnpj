import React from 'react'
import { BarChart3 } from 'lucide-react'

export default function QueryCounter({ count }) {
  return (
    <div className="bg-secondary border border-slate-700 rounded-lg p-4 flex items-center gap-3">
      <div className="p-3 bg-accent/20 rounded-lg">
        <BarChart3 className="w-6 h-6 text-accent" />
      </div>
      <div>
        <p className="text-sm text-slate-400">Consultas Realizadas</p>
        <p className="text-2xl font-bold text-white">{count}</p>
      </div>
    </div>
  )
}
