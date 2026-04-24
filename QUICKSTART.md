# 🚀 Guia de Início Rápido

## Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Usuário GitHub (para o header `git-user`)
- Conexão com internet

## ⚡ Início Rápido

### 1. Configure seu Git User

Abra o arquivo `script.js` e localize esta linha no topo:

```javascript
const GIT_USER = 'GabriellMagnago'; // Substituir pelo seu usuário Git
```

Altere `seu_usuario_git` para seu nome de usuário GitHub real.

**Exemplo:**
```javascript
const GIT_USER = 'GabriellMagnago'; // ✅ Correto
```

### 2. Abra a Aplicação

Clique duas vezes em `index.html` ou arraste-o para seu navegador.

Alternativa via terminal:
```bash
# Windows (PowerShell)
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 3. Clique em "🚀 Iniciar Simulação"

Aguarde alguns segundos enquanto:
- ✅ Times são carregados da API
- ✅ Grupos são criados aleatoriamente
- ✅ Partidas são simuladas
- ✅ Mata-mata é gerado e simulado
- ✅ Resultado é enviado para API

### 4. Explore os Resultados

A página mostrará:

1. **📋 Fase de Grupos**
   - Classificação de cada grupo
   - Posição dos times
   - Pontuação e jogos

2. **⚔️ Mata-Mata**
   - Oitavas de final
   - Quartas de final
   - Semifinais
   - Indicador de pênaltis (quando houver)

3. **🥇 Campeão**
   - Time campeão
   - Vice-campeão
   - Placar da final

## 🔍 Verificar Erros

Se algo não funcionar:

1. **Abra o Console** (F12 ou Ctrl+Shift+I)
2. **Procure por mensagens de erro** (em vermelho)
3. **Verifique**: 
   - Git user correto
   - Conexão com internet
   - API disponível

### Mensagens de Erro Comuns

| Erro | Solução |
|------|---------|
| `Erro na API: 401` | Git user incorreto |
| `Erro na API: 404` | API indisponível |
| `TypeError` | Navegador desatualizado |

## 📚 Entender o Código

### Estrutura de Arquivos

```
script.js
├── CONFIGURAÇÃO (linhas 1-5)
├── ESTADO GLOBAL (linhas 7-13)
├── FUNÇÕES DE API (linhas 15-50)
├── FUNÇÕES DE GRUPOS (linhas 52-95)
├── FUNÇÕES DE JOGOS (linhas 97-140)
├── FUNÇÕES DE SIMULAÇÃO (linhas 142-200)
├── FUNÇÕES DE CLASSIFICAÇÃO (linhas 202-260)
├── FUNÇÕES DE MATA-MATA (linhas 262-350)
├── FUNÇÕES DE RENDERIZAÇÃO (linhas 352-450)
├── FUNÇÃO PRINCIPAL (linhas 452-490)
└── INICIALIZAÇÃO (linhas 492-510)
```

### Fluxo Principal

```
1. loadTeamsFromAPI()
   ↓
2. createRandomGroups()
   ↓
3. generateGroupMatches()
   ↓
4. simulateGroupMatches()
   ↓
5. classifyGroups()
   ↓
6. renderGroups() // Mostrar na tela
   ↓
7. generatePlayoffStructure()
   ↓
8. simulatePlayoffs()
   ↓
9. renderPlayoffs() + renderChampion() // Mostrar resultados
   ↓
10. sendFinalResult() // Enviar para API
```

## 💡 Dicas para Desenvolvimento

### Adicionar Logs

Para rastrear o que está acontecendo:

```javascript
// Já existem logs no código:
console.log('✅ Grupos criados aleatoriamente');
console.log('❌ Erro ao carregar times:', error);
```

Abra o console (F12) para vê-los.

### Modificar Placares

Para testar com placares específicos, altere em `script.js`:

```javascript
// Linha ~145
function generateRandomScore() {
    return Math.floor(Math.random() * 5); // 0-4 gols
}

// Mudar para:
function generateRandomScore() {
    return Math.floor(Math.random() * 3); // 0-2 gols
}
```

### Testar sem API

Se quiser testar localmente sem a API real:

```javascript
// Substitute a função loadTeamsFromAPI:

async function loadTeamsFromAPI() {
    // Times de exemplo
    const mockTeams = [
        'Brasil', 'Argentina', 'França', 'Alemanha',
        'Espanha', 'Itália', 'Portugal', 'Holanda',
        'Inglaterra', 'Bélgica', 'Suíça', 'Dinamarca',
        'Suécia', 'Polônia', 'Croácia', 'Sérvia',
        'República Tcheca', 'Áustria', 'Grécia', 'Romênia',
        'Bulgária', 'Islândia', 'Irlanda', 'País de Gales',
        'Escócia', 'Turquia', 'Israel', 'Líbano',
        'Irã', 'Iraque', 'Arábia Saudita', 'Japão'
    ];
    
    state.teams = mockTeams;
    return mockTeams;
}
```

## 🎯 Próximas Etapas (após teste passar)

1. ✅ Implementar sistema de login
2. ✅ Salvar histórico de simulações
3. ✅ Permitir customização de times
4. ✅ Gráficos de desempenho
5. ✅ Exportar resultados em PDF

## 📞 Suporte

- Consulte a console do navegador (F12) para logs detalhados
- Verifique o arquivo README.md para mais informações
- Todos os erros são exibidos em vermelho na console

---

**Pronto para começar?** Abra `index.html` e clique em "Iniciar Simulação"! 🚀
