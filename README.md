# Loja Dashboard Pro

Dashboard profissional e completo para gerenciamento de loja com controle financeiro, estoque e metas.

## 🚀 Features

✨ **Interface Moderna**
- Design SaaS profissional
- Tema claro/escuro
- Totalmente responsivo
- Animações suaves

💸 **Controle Financeiro**
- Registro de vendas diárias
- Controle de despesas
- Cálculo automático de lucro
- Resumos diário e mensal
- Fluxo de caixa detalhado

📦 **Gerenciamento de Estoque**
- Cadastro de produtos
- Controle de quantidade
- Alertas de estoque baixo
- Histórico de movimentações
- Atualização em tempo real

🎯 **Sistema de Metas**
- Metas diárias e mensais
- Barra de progresso
- Comparação meta vs realizado
- Alertas visuais

📊 **Dashboard Interativo**
- Gráficos de vendas (últimos 31 dias)
- Fluxo de caixa visual
- Produtos mais vendidos
- KPIs em tempo real
- Ticket médio

📤 **Relatórios e Exportação**
- Exportação em PDF
- Exportação em Excel
- Filtros por período
- Resumos financeiros

## 📋 Requisitos

- Node.js 16+
- npm ou yarn
- Windows/Mac/Linux

## 🔧 Instalação

1. **Clone ou baixe o projeto:**
```bash
git clone seu-repositorio
cd loja-dashboard
```

2. **Instale as dependências:**
```bash
npm install
```

## 💻 Desenvolvimento

Para rodar em desenvolvimento:

```bash
# Terminal 1: Inicie o servidor Vite
npm run dev

# Terminal 2: Inicie o Electron (aguarde a porta 5173 ficar disponível)
npm run electron-dev
```

## 🏗️ Build

### Web (Vite)
```bash
npm run build
```

### Desktop (Electron)
```bash
npm run electron-builder
```

Isso vai gerar um arquivo `.exe` em `dist/` pronto para instalar.

## 📁 Estrutura do Projeto

```
loja-dashboard/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Barra de navegação
│   │   └── KPICard.jsx        # Cards de KPI
│   ├── pages/
│   │   ├── Dashboard.jsx      # Dashboard principal
│   │   ├── Sales.jsx          # Página de vendas
│   │   ├── Inventory.jsx      # Gerenciamento de estoque
│   │   ├── Targets.jsx        # Metas
│   │   └── Reports.jsx        # Relatórios
│   ├── store.js               # Zustand store (estado global)
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Entrada React
│   └── index.css              # Estilos globais
├── electron/
│   ├── main.js                # Processo principal Electron
│   └── preload.js             # Script de preload
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## 🎨 Paleta de Cores

- **Primary:** #0f172a (Azul escuro)
- **Secondary:** #1e293b (Cinza escuro)
- **Accent:** #3b82f6 (Azul)
- **Success:** #10b981 (Verde)
- **Warning:** #f59e0b (Amarelo)
- **Danger:** #ef4444 (Vermelho)

## 📱 Responsividade

A aplicação é totalmente responsiva:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🔐 Segurança

- Contexto isolado no Electron
- Sem node integration
- Preload script seguro
- Validação de entrada

## 📊 Dados de Exemplo

O dashboard vem com dados de exemplo para demonstrar todas as funcionalidades:
- 5 produtos em estoque
- Vendas dos últimos 15 dias
- Despesas mensais
- Metas configuráveis

## 🚀 Deploy

### Desktop (.exe)
```bash
npm run electron-builder
```

### Web
```bash
npm run build
# Fazer upload da pasta 'dist/' para seu servidor
```

## 📝 Licença

Este projeto é fornecido como está.

## 👨‍💻 Suporte

Para dúvidas ou problemas:
1. Verifique se todas as dependências estão instaladas
2. Limpe a pasta `node_modules` e instale novamente
3. Verifique se a porta 5173 não está em uso

## 🎯 Próximas Features

- [ ] Autenticação de usuário
- [ ] Sincronização em nuvem
- [ ] Multi-usuário
- [ ] Dashboard em tempo real
- [ ] Integração com APIs de pagamento
- [ ] Mobile app
- [ ] Análises avançadas

---

**Desenvolvido com ❤️ usando React, Vite, Electron e Tailwind CSS**
