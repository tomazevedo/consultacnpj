import React, { useState } from 'react'
import { Search, Loader } from 'lucide-react'
import { formatCNPJ } from '../utils/formatters'

export default function CnpjInput({ onSearch, isLoading }) {
  const [cnpj, setCnpj] = useState('')

  const handleChange = (e) => {
    const formatted = formatCNPJ(e.target.value)
    setCnpj(formatted)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cnpj.replace(/\D/g, '').length === 14) {
      onSearch(cnpj)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && cnpj.replace(/\D/g, '').length === 14) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Digite o CNPJ (XX.XXX.XXX/XXXX-XX)"
            value={cnpj}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="input-cnpj"
            maxLength="18"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || cnpj.replace(/\D/g, '').length !== 14}
          className="btn-primary flex items-center justify-center gap-2 min-w-48"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Consultando...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Consultar
            </>
          )}
        </button>
      </div>
    </form>
  )
}
