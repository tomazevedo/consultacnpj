import React from 'react'
import { Building2, MapPin, Phone, Mail, FileText, Users, Calendar, TrendingUp } from 'lucide-react'
import { formatPhone, capitalize } from '../utils/formatters'

export default function SummaryCard({ data }) {
  const fields = [
    {
      icon: <Building2 className="w-5 h-5" />,
      label: 'Razão Social',
      value: data.razao_social || 'N/A'
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: 'Nome Fantasia',
      value: data.nome_fantasia || 'N/A'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Situação',
      value: capitalize(data.situacao || 'N/A'),
      badge: data.situacao === 'ATIVA'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Endereço',
      value: `${data.logradouro || ''} ${data.numero || ''}, ${data.complemento || ''}`.trim() || 'N/A'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Cidade/UF',
      value: `${data.municipio || ''} - ${data.uf || ''}`.replace(' - ', '') || 'N/A'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'CNAE Principal',
      value: `${data.cnae_fiscal || 'N/A'} - ${data.cnae_fiscal_descricao || ''}`
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Telefone',
      value: formatPhone(data.ddd_telefone) || 'N/A'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'E-mail',
      value: data.email || 'N/A'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Capital Social',
      value: data.capital_social ? `R$ ${parseFloat(data.capital_social).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'N/A'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Data de Abertura',
      value: data.data_inicio_atividade ? new Date(data.data_inicio_atividade).toLocaleDateString('pt-BR') : 'N/A'
    }
  ]

  return (
    <div className="card">
      <h2 className="card-title flex items-center gap-2">
        <Building2 className="w-6 h-6 text-accent" />
        Resumo da Empresa
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-3 items-start">
            <div className="text-accent mt-1">{field.icon}</div>
            <div className="flex-1">
              <p className="text-sm text-slate-400">{field.label}</p>
              <p className="text-gray-100 font-medium mt-1">
                {field.value}
                {field.badge && <span className="ml-2 inline-block px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Ativa</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
