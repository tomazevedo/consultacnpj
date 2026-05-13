import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function JsonViewer({ data, isOpen, onClose }) {
  const [copied, setCopied] = useState(false)

  const jsonString = JSON.stringify(data, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    toast.success('JSON copiado para a área de transferência!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary border border-slate-700 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">JSON Bruto</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-slate-900/50">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">
            {jsonString}
          </pre>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar JSON
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
