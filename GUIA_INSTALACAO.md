# 🚀 Guia Completo de Instalação e Execução

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js** (versão 16 ou superior)
   - Download: https://nodejs.org
   - Verificar: `node --version`

2. **npm** (vem com Node.js)
   - Verificar: `npm --version`

## 📥 Instalação do Projeto

### Passo 1: Preparar o Ambiente

```bash
# Crie uma pasta para o projeto
mkdir meu-projeto
cd meu-projeto

# Ou extraia os arquivos do projeto
# Navegue até a pasta do projeto
cd loja-dashboard
```

### Passo 2: Instalar Dependências

```bash
# Instale todas as dependências
npm install

# Aguarde a conclusão (pode levar alguns minutos)
```

### Passo 3: Verificar Instalação

```bash
# Verifique se as dependências foram instaladas
npm list | grep -E "react|recharts|electron"
```

## 💻 Executar em Desenvolvimento

### Opção 1: Apenas Web (Recomendado para iniciar)

```bash
# Execute o servidor de desenvolvimento
npm run dev

# Acesse em seu navegador:
# http://localhost:5173
```

### Opção 2: Aplicação Desktop (Electron)

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2 (aguarde a mensagem "ready in X ms"):**
```bash
npm run electron-dev
```

A janela do Electron abrirá automaticamente!

## 🏗️ Build para Produção

### Gerar Aplicação Web

```bash
# Compila para produção
npm run build

# A pasta 'dist/' contém os arquivos prontos para deploy
```

### Gerar Instalador Desktop (.exe)

```bash
# Cria o instalador Windows
npm run electron-builder

# O arquivo .exe estará em: dist/
```

O instalador:
- ✅ Funciona offline
- ✅ Armazena dados localmente
- ✅ Interface profissional
- ✅ Atualização automática (configurável)

## 🎯 Usando o Dashboard

### Dashboard Principal
- **Vendas do dia**, **Lucro**, **Despesas**, **Estoque**
- **Gráficos** de vendas dos últimos 31 dias
- **Fluxo de caixa** detalhado
- **Produtos mais vendidos**
- **Alertas** de estoque baixo

### Módulo de Vendas
- Registre vendas rapidamente
- Visualize histórico de transações
- Cálculo automático de totais

### Gerenciamento de Estoque
- Cadastre produtos com preço
- Acompanhe quantidades
- Receba alertas de estoque baixo
- Edite e exclua produtos

### Metas
- Configure metas diárias
- Configure metas mensais
- Acompanhe progresso em tempo real
- Visualize gráfico de últimos 15 dias

### Relatórios
- Exporte para PDF
- Exporte para Excel
- Filtre por período
- Visualize resumo financeiro

## 🔧 Troubleshooting

### Erro: "Port 5173 is already in use"

```bash
# Encontre o processo usando a porta
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Mate o processo ou use outra porta
npm run dev -- --port 5174
```

### Erro: "Module not found"

```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Electron não abre

```bash
# Aguarde 5-10 segundos após executar 'npm run dev'
# Certifique-se que a porta 5173 está ativa
# Verifique se a porta 5173 está respondendo antes de rodar electron-dev
```

### Dados não persistem

Os dados estão sendo armazenados em memória (Zustand). Para persistência:
1. Descomente o código de persistência em `src/store.js` (se disponível)
2. Ou conecte um banco de dados SQLite

## 📊 Estrutura de Dados

### Produtos
```javascript
{
  id: 1,
  name: "Notebook",
  price: 3500,
  quantity: 15,
  minQuantity: 5
}
```

### Vendas
```javascript
{
  id: 1,
  productId: 1,
  quantity: 2,
  value: 7000,
  date: "2024-01-15T10:30:00"
}
```

### Despesas
```javascript
{
  id: 1,
  description: "Aluguel",
  value: 5000,
  date: "2024-01-15T09:00:00"
}
```

## 🎨 Personalizando

### Mudar Cores
Edite `tailwind.config.js`:
```javascript
colors: {
  primary: '#0f172a',
  secondary: '#1e293b',
  accent: '#3b82f6',
}
```

### Mudar Logo
Substitua a imagem em `assets/icon.png`

### Mudar Metas Padrão
Edite `src/store.js` na seção `targets`

## 📱 Responsividade

A aplicação se adapta automaticamente para:
- **Desktop** (1400x900px recomendado)
- **Tablet** (ajusta layout)
- **Mobile** (layout mobile)

## 🔐 Segurança

- ✅ Sem acesso ao node_modules do navegador
- ✅ Contexto isolado do Electron
- ✅ Sem node integration
- ✅ Script de preload seguro

## 📚 Tecnologias Usadas

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| React | 18.2.0 | Interface |
| Vite | 4.3.9 | Build tool |
| Electron | 25.0.0 | Desktop |
| Recharts | 2.10.3 | Gráficos |
| Zustand | 4.4.0 | Estado global |
| Tailwind CSS | 3.3.0 | Estilo |
| jsPDF | 2.5.1 | Exportar PDF |
| XLSX | 0.18.5 | Exportar Excel |

## 🚀 Próximos Passos

1. **Adicione seus dados**
   - Cadastre seus produtos
   - Configure suas metas
   - Registre suas vendas

2. **Customize a aparência**
   - Mude as cores
   - Adicione seu logo
   - Personalize menus

3. **Faça deploy**
   - Crie o instalador .exe
   - Distribua para sua equipe
   - Use nos computadores da loja

4. **Expandir funcionalidades**
   - Adicione integração com APIs
   - Implemente sincronização em nuvem
   - Crie versão mobile

## 📞 Suporte

Se encontrar problemas:

1. Verifique as logs no console (F12)
2. Limpe cache e reinstale: `npm install`
3. Verifique se Node.js é versão 16+
4. Tente em outra porta: `npm run dev -- --port 5174`

## 📄 Licença

Use livremente para seus projetos!

---

**Pronto para começar?** 🎉

```bash
npm install
npm run dev
# Acesse http://localhost:5173
```

**Sucesso!** 🚀
