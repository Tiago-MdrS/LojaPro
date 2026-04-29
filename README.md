# 🏪 Loja Dashboard Pro

Dashboard profissional para gerenciamento completo de loja, com controle financeiro, estoque, metas e relatórios.

---

## 🚀 Sobre o Projeto

O **Loja Dashboard Pro** é um sistema moderno desenvolvido para facilitar o controle de vendas, despesas e desempenho financeiro de uma loja.

O sistema foi pensado para ser simples de usar, mas com recursos avançados como metas inteligentes, relatórios e controle automático de estoque.

---

## ✨ Funcionalidades

### 💸 Financeiro

* Registro de vendas diárias
* Controle de despesas
* Cálculo automático de lucro
* Ticket médio
* Resumo financeiro em tempo real

### 📦 Estoque

* Cadastro de produtos
* Controle automático de quantidade
* Baixa automática ao vender
* Alerta de estoque baixo
* Histórico de movimentações

### 🎯 Metas

* Meta diária e mensal
* Metas personalizadas por data
* Barra de progresso automática
* Reset automático diário (horário de Brasília)
* Indicador de metas cumpridas e não cumpridas

### 📊 Dashboard

* Indicadores (KPIs)
* Produtos mais vendidos
* Fluxo de caixa
* Visão geral da loja

### 📤 Relatórios

* Exportação em PDF
* Exportação em Excel
* Filtro por período
* Análise de metas (cumpridas / não cumpridas)

### 💾 Persistência

* Armazenamento local com `localStorage`
* Dados mantidos mesmo após fechar o sistema

---

## 🧠 Tecnologias Utilizadas

* React
* Vite
* Zustand (gerenciamento de estado)
* Tailwind CSS
* jsPDF (relatórios PDF)
* XLSX (exportação Excel)
* Lucide Icons

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/loja-dashboard-pro.git

# Acesse a pasta
cd loja-dashboard-pro

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

---

## 🖥️ Build para produção

```bash
npm run build
```

---

## 📦 Gerar executável (.exe)

Se estiver usando Electron:

```bash
npm run dist
```

---

## 📁 Estrutura do Projeto

```bash
src/
├── components/
├── pages/
│   ├── Dashboard.jsx
│   ├── Sales.jsx
│   ├── Inventory.jsx
│   ├── Targets.jsx
│   ├── Expenses.jsx
│   └── Reports.jsx
├── store/
│   └── index.js
└── App.jsx
```

---

## 🔥 Diferenciais do Projeto

* Interface moderna estilo SaaS
* Sistema completo sem backend
* Reset automático baseado no horário do Brasil
* Controle inteligente de metas
* Pronto para evolução para API ou SQLite

---

## 🧪 Melhorias Futuras

* Integração com banco de dados (SQLite ou API)
* Sistema de login
* Multiusuário
* Backup e restauração de dados
* Dashboard com gráficos avançados

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido por **Tiago Madeira**

---

## ⭐ Contribuição

Sinta-se à vontade para contribuir com melhorias:

```bash
# Fork o projeto
# Crie uma branch
git checkout -b minha-feature

# Commit
git commit -m "feat: minha melhoria"

# Push
git push origin minha-feature
```

---

## 💡 Observação

Este projeto pode ser facilmente adaptado para uso comercial ou transformado em um SaaS completo.
