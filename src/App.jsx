import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { Code, LogOut } from 'lucide-react'
import CnpjInput from './components/CnpjInput'
import SummaryCard from './components/SummaryCard'
import DynamicDataRenderer from './components/DynamicDataRenderer'
import JsonViewer from './components/JsonViewer'
import QueryCounter from './components/QueryCounter'
import { consultarCNPJ } from './api/cnpjApi'

export default function App() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [queryCount, setQueryCount] = useState(0)
  const [showJsonViewer, setShowJsonViewer] = useState(false)
  const [lastCnpj, setLastCnpj] = useState('')

  const handleSearch = async (cnpj) => {
    setIsLoading(true)
    setError(null)
    setData(null)
    setLastCnpj(cnpj)

    try {
      const result = await consultarCNPJ(cnpj)
      setData(result)
      setQueryCount(prev => prev + 1)
      toast.success('CNPJ consultado com sucesso!')
    } catch (err) {
      const errorMessage = err.message || 'Erro ao consultar CNPJ'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setData(null)
    setError(null)
    setLastCnpj('')
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Consulta CNPJ
          </h1>
          <p className="text-slate-400 text-lg">
            Consulte dados de empresas brasileiras de forma rápida e segura
          </p>
        </div>

        {/* Search Section */}
        <div className="card">
          <CnpjInput onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Results Section */}
      {data && (
        <div className="max-w-6xl mx-auto">
          {/* Top Actions Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
            <QueryCounter count={queryCount} />
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowJsonViewer(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Code className="w-5 h-5" />
                Ver JSON Bruto
              </button>
              
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all duration-200 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Limpar
              </button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="mb-6">
            <SummaryCard data={data} />
          </div>

          {/* Dynamic Data Renderer */}
          <div className="mb-6">
            <DynamicDataRenderer data={data} />
          </div>

          {/* JSON Metadata */}
          <div className="card">
            <h2 className="card-title">Informações Técnicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded">
                <p className="text-sm text-slate-400 mb-1">CNPJ Consultado</p>
                <p className="text-lg font-mono text-accent">{lastCnpj}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded">
                <p className="text-sm text-slate-400 mb-1">Total de Campos</p>
                <p className="text-lg font-bold text-white">
                  {Object.keys(data).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-red-300">
            <p className="font-semibold">Erro ao consultar CNPJ</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!data && !error && !isLoading && (
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>Digite um CNPJ válido acima para consultar informações da empresa</p>
        </div>
      )}

      {/* JSON Viewer Modal */}
      <JsonViewer 
        data={data} 
        isOpen={showJsonViewer} 
        onClose={() => setShowJsonViewer(false)} 
      />
    </div>
  )
}
