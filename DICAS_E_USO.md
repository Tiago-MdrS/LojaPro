# 💡 DICAS E GUIA DE USO DO DASHBOARD

## 🎯 Uso Diário

### Manhã - Iniciar o Dia
1. Abra o Dashboard
2. Observe as **Metas do Dia**
3. Verifique **Alertas de Estoque Baixo**
4. Anote a meta de vendas para o dia

### Durante o Dia - Registrar Vendas
1. Clique em **"Vendas"** no menu
2. Botão **"+ Nova Venda"**
3. Selecione o produto
4. Digite a quantidade
5. Clique **"Registrar"**

### Tarde - Acompanhamento
1. Volte ao **Dashboard**
2. Veja o progresso da meta
3. Compare **Meta vs Atingido**
4. Identifique produtos mais vendidos

### Fim do Dia - Relatório
1. Clique em **"Relatórios"**
2. Revise o resumo financeiro
3. Se necessário, exporte em **PDF** ou **Excel**
4. Arquive para referência

---

## 📦 Gerenciamento de Estoque

### Adicionar Novo Produto
```
1. Clique em "Estoque" no menu
2. Botão "+ Novo Produto"
3. Preencha:
   - Nome: Ex: "Notebook Dell"
   - Preço: Ex: "3500"
   - Quantidade: Ex: "15"
   - Quantidade Mínima: Ex: "5"
4. Clique "Criar"
```

### Atualizar Quantidade
```
1. Vá para "Estoque"
2. Clique no ícone ✏️ do produto
3. Altere a quantidade
4. Clique "Atualizar"
```

### Entender os Alertas
```
STATUS VERDE (OK)     → Estoque seguro, sem preocupações
STATUS AMARELO (BAIXO) → Repor em breve, não é urgente
STATUS VERMELHO (FORA) → Produto fora do estoque, urgente repor
```

---

## 💰 Controle Financeiro

### Registrar uma Venda

**Cenário 1: Venda de um produto**
```
Cliente compra: 1 Notebook R$ 3.500
1. Clique "Vendas"
2. Botão "+ Nova Venda"
3. Produto: Notebook
4. Quantidade: 1
5. Total aparece: R$ 3.500
6. Clique "Registrar"
✓ Venda registrada, lucro atualizado
```

**Cenário 2: Venda de múltiplos produtos**
```
Cliente compra: 1 Notebook + 2 Mouse + 1 Teclado
1. Registre cada item separadamente (3 transações)
   - Notebook: 1x = R$ 3.500
   - Mouse: 2x = R$ 300
   - Teclado: 1x = R$ 400
✓ Total da venda: R$ 4.200
✓ Dashboard atualiza automaticamente
```

### Adicionar Despesa

Atualmente: Dados de exemplo no store
Futura: Clique "Despesas" + adicione gastos (implementar)

---

## 🎯 Configurar Metas

### Definir Meta Diária
```
1. Clique em "Metas"
2. Clique "Editar Metas"
3. Digite "Meta Diária": Ex: 3000 (R$ 3.000)
4. Clique "Salvar Metas"

✓ O dashboard passa a monitorar essa meta
✓ Mostra progresso em tempo real
```

### Definir Meta Mensal
```
1. Clique em "Metas"
2. Clique "Editar Metas"
3. Digite "Meta Mensal": Ex: 80000 (R$ 80.000)
4. Clique "Salvar Metas"

✓ Acompanhe no gráfico dos últimos 15 dias
✓ Veja se está no caminho certo
```

### Interpretar o Progresso
```
BARRA AZUL    → Ainda não atingiu a meta
BARRA VERDE   → Meta atingida! 🎉
PERCENTUAL    → Quanto já alcançou (Ex: 75%)
VALOR FALTANDO → Quanto precisa ainda (Ex: R$ 1.650)
```

---

## 📊 Entender os Gráficos

### Gráfico de Vendas (Últimos 31 dias)
```
O que mostra: Tendência de vendas ao longo do mês
Como usar: 
  - Se subindo: Está indo bem! 📈
  - Se caindo: Precisa de estratégia 📉
  - Se plana: Estável, mas pode melhorar ➡️
```

### Gráfico de Fluxo de Caixa
```
Barras verdes (Entradas)   = Dinheiro que entra
Barras vermelhas (Saídas)  = Dinheiro que sai

Bom sinal: Verdes > Vermelhas
Alerta: Vermelhas > Verdes
```

### Produtos Mais Vendidos
```
Top 5 produtos que mais vendeu
Usar para:
  - Manter estoque desses produtos
  - Fazer promoções com os menos vendidos
  - Ajustar estratégia comercial
```

---

## 📄 Exportar Relatórios

### Exportar para PDF
```
1. Clique em "Relatórios"
2. Escolha período (Data Inicial e Final)
3. Clique "Exportar para PDF"
4. Abre automaticamente para visualizar
5. Salve no seu computador ou imprima

✓ Formato profissional
✓ Pronto para enviar a contadores
✓ Histórico em mãos
```

### Exportar para Excel
```
1. Clique em "Relatórios"
2. Escolha período
3. Clique "Exportar para Excel"
4. Arquivo baixa automaticamente

✓ Múltiplas abas (Vendas, Despesas, Resumo)
✓ Pode editar e compartilhar
✓ Dados estruturados para análise
```

### Usar Filtros de Período
```
Padrão: Últimos 30 dias

Para mudar:
1. Clique Data Inicial
2. Selecione primeiro dia desejado
3. Clique Data Final
4. Selecione último dia desejado
5. Dados atualizam automaticamente

Exemplos de filtros:
- Todo o mês: 01/01 a 31/01
- Uma semana: 01/01 a 07/01
- Últimos dias: 15/01 a 20/01
```

---

## 🎨 Personalização

### Mudar para Tema Claro
```
1. Clique no ícone ☀️ (Sol) na Sidebar
2. Interface muda para branco/claro
3. Clique novamente para voltar ao escuro
✓ Sua preferência é mantida na sessão
```

### Não há limite de produtos
```
Adicione quantos quiser:
- Clique "Estoque"
- "+ Novo Produto" (sempre disponível)
- Sem limite de quantidade
```

---

## ⚠️ Alertas Visuais Importantes

### Estoque Baixo
```
STATUS: AMARELO
Significa: Quantidade ≤ Mínimo configurado
O que fazer: Repor em breve

Exemplo: 
  Produto: Mouse
  Quantidade: 2
  Mínimo: 5
  → Alerta amarelo (2 < 5)
```

### Fora de Estoque
```
STATUS: VERMELHO
Significa: Quantidade = 0
O que fazer: Repor imediatamente!

Ação rápida:
1. Vá em "Estoque"
2. Edite o produto
3. Aumente a quantidade
4. Clique "Atualizar"
```

### Meta Não Atingida
```
BARRA: AZUL (< 100%)
Significado: Ainda há tempo!
Dica: Aumentar esforço de vendas

Exemplo: 45% da meta
→ R$ 1.350 atingido de R$ 3.000
→ Faltam R$ 1.650
```

### Meta Atingida
```
BARRA: VERDE (= 100%)
Mensagem: 🎉 Parabéns! Meta atingida!
Próximo passo: Preparar para o dia seguinte
```

---

## 📊 Análise de Dados

### Dashboard - Encontrar Insights
```
1. Veja o Ticket Médio
   - Se alto: Clientes gastam bastante
   - Se baixo: Aumentar valor médio

2. Observe a Margem de Lucro
   - Se > 50%: Negócio muito lucrativo
   - Se 30-50%: Normal
   - Se < 30%: Revisar despesas

3. Acompanhe Estoque Total
   - Muito alto: Capital parado
   - Muito baixo: Falta de estoque
   - Equilibrado: 3-6 meses de venda
```

### Relatórios - Tomar Decisões
```
Ao gerar um relatório, observe:

1. Tendência de vendas
   - Aumentando? Continue assim!
   - Diminuindo? Faça promoção

2. Receita vs Despesas
   - Despesas > 60% da receita? Corte gastos
   - Despesas < 30%? Invista em marketing

3. Produtos mais vendidos
   - Aumentar estoque deles
   - Reduzir dos menos vendidos
```

---

## 🚀 Dicas Profissionais

### 1. Consistência
```
✓ Registre vendas conforme ocorrem
✓ Não deixe para depois
✓ Números precisos = Análises confiáveis
```

### 2. Metas Realistas
```
✓ Base em histórico anterior
✓ Aumente gradualmente (5-10%)
✓ Reconsidere mensalmente
```

### 3. Monitoramento Diário
```
✓ 5 minutos cada manhã
✓ 5 minutos cada noite
✓ 1 hora no fim de semana para análise
```

### 4. Ação nos Alertas
```
✓ Alerta de estoque baixo → Repor em 48h
✓ Meta não atingida → Aumentar vendas
✓ Margem baixa → Revisar custos
```

### 5. Backup de Dados
```
Semanal:
1. Clique "Relatórios"
2. Filtro: Semana passada
3. Exporte para Excel
4. Salve em pasta (Backup)
✓ Dados salvos em segurança
```

---

## 🔧 Troubleshooting de Uso

### "Minha venda não aparece"
```
Solução:
1. Recarregue a página (F5)
2. Vá para "Vendas"
3. Role para baixo na tabela
4. Procure na lista
```

### "Estoque não atualizou"
```
Solução:
1. Vá em "Estoque"
2. Clique ✏️ do produto
3. Mude a quantidade
4. Clique "Atualizar"
```

### "Dados desapareceram"
```
Nota: Dados estão em memória (não persistem ao fechar)
Solução para não perder dados:
1. Exporte para Excel regularmente
2. Mantenha a aba aberta
3. Não feche o navegador sem backup
```

### "Não consigo editar metas"
```
Solução:
1. Clique em "Metas"
2. Clique "Editar Metas" (botão azul)
3. Edite os valores
4. Clique "Salvar Metas"
```

---

## 📱 Usando em Diferentes Dispositivos

### No Desktop (Recomendado)
```
✓ Visão completa de todos os gráficos
✓ Tela maior para detalhes
✓ Múltiplas abas abertas
✓ Melhor experiência
```

### No Tablet
```
✓ Interface se adapta
✓ Toque para interagir
✓ Bom para consultas rápidas
✓ Não ideal para entrada de dados
```

### No Mobile
```
✓ Layout se adapta
✓ Pode usar para emergências
✓ Não recomendado para uso prolongado
✓ Melhor para verificar metrics
```

---

## 🎓 Cenários de Uso Real

### Cenário 1: Segunda-feira Matinal
```
7:50 - Abra o dashboard
7:52 - Observe a meta do dia (R$ 3.000)
7:53 - Verifique alertas (Mouse com estoque baixo)
7:55 - Faça uma lista de ações para o dia
8:00 - Comece a trabalhar com metas em mente
```

### Cenário 2: Durante o Dia
```
10:30 - Registra venda #1 (Notebook)
11:15 - Registra venda #2 (Mouse)
14:00 - Verifica progresso: 35% da meta
15:45 - Registra venda #3 (Teclado)
18:00 - Verifica progresso: 65% da meta
19:30 - Última venda (Monitor): Atingiu 95% 🎯
```

### Cenário 3: Fim de Semana (Análise)
```
Sábado 15h - Tem tempo livre
1. Abra "Relatórios"
2. Selecione semana inteira
3. Exporte para Excel
4. Analise dados
5. Identifique padrões
6. Planeje melhorias

Insights obtidos:
- Terça é dia mais forte
- Mouse precisa de reposição
- Meta mensal está 20% atrasada
```

---

## 💡 Estratégias para Crescimento

### Aumentar Meta Gradualmente
```
Semana 1: Meta R$ 3.000/dia
Semana 2: Meta R$ 3.150/dia (+5%)
Semana 3: Meta R$ 3.300/dia (+5%)
Semana 4: Meta R$ 3.465/dia (+5%)

Resultado: +22% de crescimento no mês!
```

### Focar em Produtos de Alto Valor
```
Análise de lucro por produto:
1. Notebook: R$ 1.000/unidade de lucro
2. Teclado: R$ 150/unidade de lucro
3. Mouse: R$ 50/unidade de lucro

Estratégia: Aumentar venda de Notebook
```

### Reduzir Despesas
```
1. Exporte relatórios de despesas
2. Identifique maiores gastos
3. Procure economias (fornecedores, etc)
4. Cada 10% reduzido = +10% de lucro
```

---

## 📞 Precisa de Ajuda?

Consulte:
- ✅ **GUIA_INSTALACAO.md** - Como instalar/usar
- ✅ **DOCUMENTACAO_COMPLETA.md** - Referência técnica
- ✅ **README.md** - Visão geral das features

---

**Dicas: Use regularmente, mantenha dados atualizados e analise semanalmente para crescimento sustentado!** 🚀
