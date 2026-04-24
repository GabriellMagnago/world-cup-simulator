# 🏆 Simulador de Copa do Mundo

Aplicação web simples e funcional que simula uma Copa do Mundo, desde a fase de grupos até a final.

## 📋 Funcionalidades

✅ Consumo de API externa  
✅ Separação aleatória em 8 grupos  
✅ Geração de todos os jogos (round-robin)  
✅ Simulação de resultados  
✅ Cálculo de pontuação com desempates  
✅ Mata-mata com oitavas, quartas, semifinal e final  
✅ Simulação de pênaltis em empates  
✅ Envio do resultado final para API  

## 🚀 Como Usar

1. **Configurar Git User**
   - Abrir `script.js`
   - Alterar `const GIT_USER = 'seu_usuario_git'` com seu usuário GitHub

2. **Abrir aplicação**
   - Abrir `index.html` em um navegador
   - Clicar em "🚀 Iniciar Simulação"

3. **Ver resultados**
   - Fase de Grupos com classificação
   - Todos os jogos com placares
   - Mata-mata com pênaltis
   - Campeão final

## 📁 Estrutura

```
word-cup-gabriel/
├── index.html      # Estrutura HTML
├── style.css       # Estilos (Flexbox/Grid)
├── script.js       # Lógica JavaScript
└── README.md       # Este arquivo
```

## 🔧 Tecnologias

- **HTML5** - Marcação semântica
- **CSS3** - Layout com Flexbox/Grid, gradientes
- **JavaScript Puro** - Sem frameworks
- **API REST** - Consumo e POST

## 📊 Lógica do Projeto

### 1️⃣ Carregamento de Times
```javascript
GET /WorldCup/GetAllTeams
Header: git-user: seu_usuario
```

### 2️⃣ Criação de Grupos
- 32 times distribuídos aleatoriamente
- 4 times por grupo (A até H)

### 3️⃣ Fase de Grupos
- Todos contra todos em cada grupo (6 jogos por grupo)
- Placares aleatórios (0-4 gols)
- Pontuação: Vitória = 3pts, Empate = 1pt

### 4️⃣ Desempates
1. Maior pontuação
2. Maior saldo de gols
3. Mais gols marcados
4. Aleatório

### 5️⃣ Mata-Mata
- **Oitavas**: 16 times → 8 vencedores
- **Quartas**: 8 times → 4 vencedores
- **Semifinal**: 4 times → 2 vencedores
- **Final**: 2 times → 1 campeão

Empates decidem com pênaltis (0-5 gols cada).

### 6️⃣ Resultado Final
Enviado via POST para API com:
- Campeão
- Vice-campeão
- Grupos e classificações
- Resultados do mata-mata

## 💡 Código Bem Organizado

### Funções de API
- `loadTeamsFromAPI()` - Carregar times
- `sendFinalResult()` - Enviar resultado

### Funções de Grupos
- `createRandomGroups()` - Criar grupos aleatoriamente
- `generateGroupMatches()` - Gerar todos os jogos

### Funções de Simulação
- `simulateGroupMatches()` - Simular fase de grupos
- `simulatePlayoffs()` - Simular mata-mata

### Funções de Classificação
- `classifyGroups()` - Ordenar times com desempates
- `getQualifiedTeams()` - Obter 2 melhores de cada grupo

### Funções de Renderização
- `renderGroups()` - Mostrar grupos na tela
- `renderPlayoffs()` - Mostrar mata-mata
- `renderChampion()` - Mostrar campeão

## 📝 Sugestões de Commits Progressivos

Se você estiver desenvolvendo incrementalmente, aqui estão os commits sugeridos:

```bash
# 1. Estrutura inicial
git add index.html style.css
git commit -m "feat: estrutura inicial do projeto"

# 2. Integração com API
git add script.js (apenas funções de API)
git commit -m "feat: integração com API de times"

# 3. Geração de grupos
git add script.js (adicionar createRandomGroups)
git commit -m "feat: geração dos grupos aleatórios"

# 4. Simulação da fase de grupos
git add script.js (adicionar simulação)
git commit -m "feat: simulação de partidas da fase de grupos"

# 5. Classificação
git add script.js (adicionar classificação)
git commit -m "feat: cálculo de pontuação e classificação"

# 6. Mata-mata
git add script.js (adicionar mata-mata)
git commit -m "feat: implementação do mata-mata"

# 7. Renderização completa
git add script.js (adicionar renderização)
git commit -m "feat: renderização completa da simulação"

# 8. Melhorias de estilo
git add style.css (ajustes visuais)
git commit -m "style: melhoria no layout e responsividade"
```

## 🎨 Design

- **Cores**: Gradiente roxo (#667eea → #764ba2)
- **Layout**: Flexbox e CSS Grid
- **Responsivo**: Adaptado para mobile
- **Interativo**: Hover effects e transições suaves

## 🐛 Possíveis Melhorias Futuras

- [ ] Armazenar historicamente simulações
- [ ] Permitir customização de times
- [ ] Gráficos com dados de desempenho
- [ ] Sistema de pontuação por rodada
- [ ] Replay de um jogo específico
- [ ] Exportar resultado como PDF

## ⚖️ Licença

Este projeto é fornecido como base para teste de estágio.

---

**Dúvidas?** Consulte a console do navegador para logs detalhados da simulação.

**Boa sorte! 🍀**
