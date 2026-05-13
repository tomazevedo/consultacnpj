# Consulta CNPJ

Um frontend React moderno e responsivo para consultar informações de empresas brasileiras usando a API pública de CNPJ.

## ✨ Funcionalidades

- 🔍 **Consulta de CNPJ**: Campo com máscara automática (XX.XXX.XXX/XXXX-XX)
- 📊 **Resumo Profissional**: Exibe as informações principais da empresa em um layout limpo
  - Razão Social
  - Nome Fantasia
  - Situação
  - Endereço Completo
  - Cidade/UF
  - CNAE Principal
  - Telefone
  - E-mail
  - Capital Social
  - Data de Abertura

- 🎯 **Seção Dinâmica**: Renderiza automaticamente TODOS os dados retornados pela API
  - Suporte para objetos aninhados
  - Suporte para arrays
  - Suporte para listas de objetos
  - Expansão/recolhimento de itens
  - Links automáticos para URLs
  - Links para e-mails

- 📋 **JSON Bruto**: Modal para visualizar e copiar o JSON completo da resposta
- 📈 **Contador de Consultas**: Acompanhe o número de buscas realizadas
- ⚡ **Loading States**: Indicador visual durante o carregamento
- ❌ **Tratamento de Erros**: Mensagens claras e amigáveis
- 📱 **Responsivo**: Design que se adapta a qualquer tamanho de tela
- 🎨 **Design Profissional**: Tema moderno com Tailwind CSS

## 🚀 Tecnologias

- **React 18** - Framework UI
- **Vite** - Build tool rápido
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/tomazevedo/consultacnpj.git
cd consultacnpj

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🔗 API Utilizada

A aplicação utiliza a API pública: `https://publica.cnpj.ws/cnpj/{cnpj}`

Exemplo de requisição:
```bash
curl https://publica.cnpj.ws/cnpj/11222333000181
```

## 📝 Exemplos de CNPJs para Testar

Alguns CNPJs reais para testar a aplicação:

- **11.222.333/0001-81** - Exemplo genérico
- **34.028.317/0001-87** - GOOGLE BRASIL INTERNET LTDA.
- **14.103.597/0001-15** - MICROSOFT BRASIL INDUSTRIA DE SOFTWARE LTDA.

## 🎯 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── CnpjInput.jsx   # Input com máscara
│   ├── SummaryCard.jsx # Card com resumo
│   ├── DynamicDataRenderer.jsx # Renderizador dinâmico
│   ├── JsonViewer.jsx  # Modal de JSON
│   └── QueryCounter.jsx # Contador de consultas
├── api/
│   └── cnpjApi.js      # Integração com API
├── utils/
│   ���── formatters.js   # Funções de formatação
├── App.jsx             # Componente principal
├── main.jsx            # Entry point
└── index.css           # Estilos globais
```

## 🎨 Customização

### Cores
As cores podem ser customizadas em `tailwind.config.js`:

```js
colors: {
  primary: '#0f172a',
  secondary: '#1e293b',
  accent: '#0ea5e9',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
}
```

### Formatadores
Adicione novos formatadores em `src/utils/formatters.js` conforme necessário.

## 🔒 Segurança

- ✅ Validação de CNPJ no frontend
- ✅ Timeout de 10 segundos nas requisições
- ✅ Tratamento de erros de conexão
- ✅ Proteção contra XSS com React

## 📄 Licença

MIT

## 👨‍💻 Autor

[Tomas Azevedo](https://github.com/tomazevedo)

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.
