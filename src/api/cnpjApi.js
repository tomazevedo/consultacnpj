import axios from 'axios'

const API_BASE_URL = 'https://publica.cnpj.ws/cnpj'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

/**
 * Consulta CNPJ na API pública
 * @param {string} cnpj - CNPJ sem máscara
 * @returns {Promise<Object>} Dados da empresa
 */
export const consultarCNPJ = async (cnpj) => {
  try {
    const cleanedCNPJ = cnpj.replace(/\D/g, '')
    
    if (cleanedCNPJ.length !== 14) {
      throw new Error('CNPJ deve conter 14 dígitos')
    }
    
    const response = await api.get(`/${cleanedCNPJ}`)
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('CNPJ não encontrado')
    }
    if (error.message.includes('Network Error') || error.code === 'ECONNABORTED') {
      throw new Error('Erro de conexão. Verifique sua internet')
    }
    throw error
  }
}

export default api
