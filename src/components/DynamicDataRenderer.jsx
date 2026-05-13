import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { isUrl, isEmail } from '../utils/formatters'

export default function DynamicDataRenderer({ data }) {
  const [expandedItems, setExpandedItems] = useState({})

  // Lista de campos que já foram exibidos no resumo
  const excludedFields = [
    'razao_social',
    'nome_fantasia',
    'situacao',
    'logradouro',
    'numero',
    'complemento',
    'municipio',
    'uf',
    'cnae_fiscal',
    'cnae_fiscal_descricao',
    'ddd_telefone',
    'email',
    'capital_social',
    'data_inicio_atividade'
  ]

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const isObject = (val) => val !== null && typeof val === 'object'
  const isArray = Array.isArray

  const renderValue = (value, key) => {
    // Valores nulos ou undefined
    if (value === null || value === undefined) {
      return <span className="text-slate-500 italic">N/A</span>
    }

    // Valores booleanos
    if (typeof value === 'boolean') {
      return (
        <span className={value ? 'text-green-400' : 'text-red-400'}>
          {value ? 'Sim' : 'Não'}
        </span>
      )
    }

    // URLs
    if (typeof value === 'string' && isUrl(value)) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">
          {value}
        </a>
      )
    }

    // E-mails
    if (typeof value === 'string' && isEmail(value)) {
      return (
        <a href={`mailto:${value}`} className="text-accent hover:underline">
          {value}
        </a>
      )
    }

    // Strings
    if (typeof value === 'string') {
      return <span className="text-gray-100 break-words">{value}</span>
    }

    // Números
    if (typeof value === 'number') {
      return <span className="text-gray-100">{value.toLocaleString('pt-BR')}</span>
    }

    // Objetos e arrays
    if (isObject(value)) {
      return <span className="text-slate-400 italic">[{isArray(value) ? 'Array' : 'Objeto'}]</span>
    }

    return <span className="text-gray-100">{String(value)}</span>
  }

  const renderObject = (obj, keyPath = '') => {
    const entries = Object.entries(obj).filter(([key]) => !excludedFields.includes(key))

    if (entries.length === 0) return null

    return (
      <div className="space-y-3">
        {entries.map(([key, value]) => {
          const uniqueKey = keyPath ? `${keyPath}.${key}` : key
          const isExpanded = expandedItems[uniqueKey]
          const hasChildren = isObject(value)

          return (
            <div key={uniqueKey} className="border-l-2 border-slate-700 pl-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-300 font-medium capitalize">
                  {key.replace(/_/g, ' ')}
                </span>

                {hasChildren ? (
                  <button
                    onClick={() => toggleExpand(uniqueKey)}
                    className="p-1 hover:bg-slate-700 rounded transition-colors"
                    title={isExpanded ? 'Recolher' : 'Expandir'}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-accent" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                ) : null}
              </div>

              {!hasChildren && (
                <div className="mt-1">
                  {renderValue(value, key)}
                </div>
              )}

              {hasChildren && isExpanded && (
                <div className="mt-3">
                  {isArray(value) ? (
                    <div className="space-y-3">
                      {value.map((item, index) => (
                        <div key={index} className="border-l-2 border-slate-700 pl-4 bg-slate-700/20 p-3 rounded">
                          {isObject(item) ? (
                            renderObject(item, `${uniqueKey}[${index}]`)
                          ) : (
                            renderValue(item, `${key}[${index}]`)
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    renderObject(value, uniqueKey)
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="card-title">Dados Completos da API</h2>
      {renderObject(data)}
    </div>
  )
}
