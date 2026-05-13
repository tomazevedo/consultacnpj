/**
 * Formata CNPJ com máscara
 * @param {string} value - CNPJ sem formatação
 * @returns {string} CNPJ formatado (XX.XXX.XXX/XXXX-XX)
 */
export const formatCNPJ = (value) => {
  const cleanedValue = value.replace(/\D/g, '')
  if (!cleanedValue) return ''
  
  return cleanedValue
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18)
}

/**
 * Formata telefone com DDD
 * @param {string} value - Telefone sem formatação
 * @returns {string} Telefone formatado ((XX) XXXXX-XXXX)
 */
export const formatPhone = (value) => {
  if (!value) return ''
  
  const cleanedValue = value.replace(/\D/g, '')
  if (cleanedValue.length < 10) return value
  
  const ddd = cleanedValue.slice(0, 2)
  const firstPart = cleanedValue.slice(2, 7)
  const secondPart = cleanedValue.slice(7, 11)
  
  return `(${ddd}) ${firstPart}-${secondPart}`
}

/**
 * Capitaliza a primeira letra de cada palavra
 * @param {string} str - String a ser capitalizada
 * @returns {string} String capitalizada
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Verifica se uma string é uma URL válida
 * @param {string} str - String a verificar
 * @returns {boolean} True se for uma URL
 */
export const isUrl = (str) => {
  if (!str || typeof str !== 'string') return false
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/**
 * Verifica se uma string é um e-mail válido
 * @param {string} str - String a verificar
 * @returns {boolean} True se for um e-mail
 */
export const isEmail = (str) => {
  if (!str || typeof str !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(str)
}

/**
 * Formata número como moeda brasileira
 * @param {number} value - Valor numérico
 * @returns {string} Valor formatado em moeda
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'N/A'
  return `R$ ${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
}

/**
 * Formata data para o padrão brasileiro
 * @param {string} dateString - Data em formato ISO
 * @returns {string} Data formatada (DD/MM/YYYY)
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('pt-BR')
  } catch {
    return dateString
  }
}
