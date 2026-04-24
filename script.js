const API_URL = 'https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams';
const GIT_USER = 'GabriellMagnago';

const state = {
    teams: [],
    groups: {},
    groupMatches: {},
    classification: {},
    playoffs: null,
    champion: null
};

async function loadTeamsFromAPI() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'git-user': GIT_USER,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        state.teams = data;
        console.log(`✅ Carregados ${state.teams.length} times`);
        return state.teams;
    } catch (error) {
        console.error('❌ Erro ao carregar times:', error);
        alert('Erro ao carregar times da API. Verifique sua conexão ou o Git user.');
        throw error;
    }
}

async function sendFinalResult(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'git-user': GIT_USER,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar resultado: ${response.status}`);
        }

        console.log('✅ Resultado enviado para API com sucesso');
        return await response.json();
    } catch (error) {
        console.error('❌ Erro ao enviar resultado:', error);
    }
}

function createRandomGroups() {
    const groups = {
        'A': [], 'B': [], 'C': [], 'D': [],
        'E': [], 'F': [], 'G': [], 'H': []
    };

    const shuffledTeams = [...state.teams].sort(() => Math.random() - 0.5);

    const groupLetters = Object.keys(groups);
    shuffledTeams.forEach((team, index) => {
        const groupLetter = groupLetters[Math.floor(index / 4)];
        groups[groupLetter].push({
            name: team,
            points: 0,
            scored: 0,
            conceded: 0,
            matches: 0
        });
    });

    state.groups = groups;
    console.log('✅ Grupos criados aleatoriamente');
    return groups;
}

function generateGroupMatches() {
    state.groupMatches = {};

    for (const [groupLetter, teams] of Object.entries(state.groups)) {
        state.groupMatches[groupLetter] = [];

        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                state.groupMatches[groupLetter].push({
                    team1: teams[i].name,
                    team2: teams[j].name,
                    score1: null,
                    score2: null,
                    played: false
                });
            }
        }
    }

    console.log('✅ Jogos dos grupos gerados');
    return state.groupMatches;
}

function generateRandomScore() {
    return Math.floor(Math.random() * 5);
}

function simulateGroupMatches() {
    for (const [groupLetter, matches] of Object.entries(state.groupMatches)) {
        matches.forEach(match => {
            const score1 = generateRandomScore();
            const score2 = generateRandomScore();

            match.score1 = score1;
            match.score2 = score2;
            match.played = true;

            const team1 = state.groups[groupLetter].find(t => t.name === match.team1);
            const team2 = state.groups[groupLetter].find(t => t.name === match.team2);

            team1.scored += score1;
            team1.conceded += score2;
            team1.matches += 1;

            team2.scored += score2;
            team2.conceded += score1;
            team2.matches += 1;

            if (score1 > score2) {
                team1.points += 3;
            } else if (score2 > score1) {
                team2.points += 3;
            } else {
                team1.points += 1;
                team2.points += 1;
            }
        });
    }

    console.log('✅ Jogos dos grupos simulados');
}

function getGoalDifference(team) {
    return team.scored - team.conceded;
}

function comparePlayers(team1, team2) {
    if (team1.points !== team2.points) {
        return team2.points - team1.points;
    }

    const diff1 = getGoalDifference(team1);
    const diff2 = getGoalDifference(team2);
    if (diff1 !== diff2) {
        return diff2 - diff1;
    }

    if (team1.scored !== team2.scored) {
        return team2.scored - team1.scored;
    }

    return Math.random() - 0.5;
}

function classifyGroups() {
    state.classification = {};

    for (const [groupLetter, teams] of Object.entries(state.groups)) {
        const sortedTeams = [...teams].sort(comparePlayers);
        state.classification[groupLetter] = sortedTeams;
    }

    console.log('✅ Grupos classificados');
    return state.classification;
}

function getQualifiedTeams() {
    const qualified = [];

    for (const [groupLetter, teams] of Object.entries(state.classification)) {
        qualified.push({
            name: teams[0].name,
            position: `${groupLetter}1`,
            group: groupLetter
        });
        qualified.push({
            name: teams[1].name,
            position: `${groupLetter}2`,
            group: groupLetter
        });
    }

    console.log('✅ Times classificados para mata-mata');
    return qualified;
}

function generatePlayoffStructure() {
    const qualified = getQualifiedTeams();

    const roundOf16 = [];
    for (let i = 0; i < 16; i += 2) {
        roundOf16.push({
            team1: qualified[i].name,
            team2: qualified[i + 1].name,
            score1: null,
            score2: null,
            penalties1: null,
            penalties2: null,
            winner: null
        });
    }

    state.playoffs = {
        roundOf16: roundOf16,
        quarterFinals: [],
        semiFinals: [],
        final: null
    };

    console.log('✅ Estrutura de mata-mata criada');
    return state.playoffs;
}

function simulatePlayoffMatch(match) {
    let score1 = generateRandomScore();
    let score2 = generateRandomScore();

    match.score1 = score1;
    match.score2 = score2;

    if (score1 === score2) {
        match.penalties1 = Math.floor(Math.random() * 6);
        match.penalties2 = Math.floor(Math.random() * 6);

        if (match.penalties1 === match.penalties2) {
            match.penalties1 = Math.floor(Math.random() * 6) + 1;
            match.penalties2 = Math.floor(Math.random() * 6);
        }

        match.winner = match.penalties1 > match.penalties2 ? match.team1 : match.team2;
    } else {
        match.winner = score1 > score2 ? match.team1 : match.team2;
    }

    return match;
}

function simulatePlayoffs() {
    state.playoffs.roundOf16.forEach(match => simulatePlayoffMatch(match));

    state.playoffs.quarterFinals = [];
    for (let i = 0; i < state.playoffs.roundOf16.length; i += 2) {
        const match1 = state.playoffs.roundOf16[i];
        const match2 = state.playoffs.roundOf16[i + 1];

        state.playoffs.quarterFinals.push({
            team1: match1.winner,
            team2: match2.winner,
            score1: null,
            score2: null,
            penalties1: null,
            penalties2: null,
            winner: null
        });
    }
    state.playoffs.quarterFinals.forEach(match => simulatePlayoffMatch(match));

    state.playoffs.semiFinals = [];
    for (let i = 0; i < state.playoffs.quarterFinals.length; i += 2) {
        const match1 = state.playoffs.quarterFinals[i];
        const match2 = state.playoffs.quarterFinals[i + 1];

        state.playoffs.semiFinals.push({
            team1: match1.winner,
            team2: match2.winner,
            score1: null,
            score2: null,
            penalties1: null,
            penalties2: null,
            winner: null
        });
    }
    state.playoffs.semiFinals.forEach(match => simulatePlayoffMatch(match));

    const finalTeams = state.playoffs.semiFinals;
    state.playoffs.final = {
        team1: finalTeams[0].winner,
        team2: finalTeams[1].winner,
        score1: null,
        score2: null,
        penalties1: null,
        penalties2: null,
        winner: null
    };
    simulatePlayoffMatch(state.playoffs.final);
    state.champion = state.playoffs.final.winner;

    console.log('✅ Mata-mata simulado');
}

function renderGroups() {
    const groupsContainer = document.getElementById('groups');
    groupsContainer.innerHTML = '';

    for (const [groupLetter, teams] of Object.entries(state.classification)) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'group-title';
        titleDiv.textContent = `Grupo ${groupLetter}`;
        groupDiv.appendChild(titleDiv);

        teams.forEach((team, index) => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team-in-group';

            const position = index + 1;
            const teamName = document.createElement('span');
            teamName.className = 'team-name';
            teamName.textContent = `${position}. ${team.name}`;

            const pointsDiv = document.createElement('span');
            pointsDiv.className = 'team-points';
            pointsDiv.textContent = `${team.points}pts`;

            teamDiv.appendChild(teamName);
            teamDiv.appendChild(pointsDiv);
            groupDiv.appendChild(teamDiv);
        });

        const matchesDiv = document.createElement('div');
        matchesDiv.className = 'matches-section';

        const matchesTitle = document.createElement('div');
        matchesTitle.className = 'matches-title';
        matchesTitle.textContent = '📊 Resultados';
        matchesDiv.appendChild(matchesTitle);

        state.groupMatches[groupLetter].forEach(match => {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match';

            matchDiv.innerHTML = `
                <span class="match-team">${match.team1}</span>
                <span class="match-score">${match.score1} x ${match.score2}</span>
                <span class="match-team">${match.team2}</span>
            `;

            matchesDiv.appendChild(matchDiv);
        });

        groupDiv.appendChild(matchesDiv);
        groupsContainer.appendChild(groupDiv);
    }
}

function renderPlayoffs() {
    const playoffsContainer = document.getElementById('playoffs');
    playoffsContainer.innerHTML = '';

    const roundOf16Section = document.createElement('div');
    roundOf16Section.className = 'playoff-stage';
    roundOf16Section.innerHTML = '<h3>🏟️ Oitavas de Final</h3>';

    const roundOf16Matches = document.createElement('div');
    roundOf16Matches.className = 'playoff-matches';
    state.playoffs.roundOf16.forEach(match => {
        roundOf16Matches.appendChild(createPlayoffMatchElement(match));
    });
    roundOf16Section.appendChild(roundOf16Matches);
    playoffsContainer.appendChild(roundOf16Section);

    const quarterSection = document.createElement('div');
    quarterSection.className = 'playoff-stage';
    quarterSection.innerHTML = '<h3>🥊 Quartas de Final</h3>';

    const quarterMatches = document.createElement('div');
    quarterMatches.className = 'playoff-matches';
    state.playoffs.quarterFinals.forEach(match => {
        quarterMatches.appendChild(createPlayoffMatchElement(match));
    });
    quarterSection.appendChild(quarterMatches);
    playoffsContainer.appendChild(quarterSection);

    const semiSection = document.createElement('div');
    semiSection.className = 'playoff-stage';
    semiSection.innerHTML = '<h3>⚡ Semifinais</h3>';

    const semiMatches = document.createElement('div');
    semiMatches.className = 'playoff-matches';
    state.playoffs.semiFinals.forEach(match => {
        semiMatches.appendChild(createPlayoffMatchElement(match));
    });
    semiSection.appendChild(semiMatches);
    playoffsContainer.appendChild(semiSection);
}

function createPlayoffMatchElement(match) {
    const div = document.createElement('div');
    div.className = 'playoff-match';

    const team1Div = document.createElement('div');
    team1Div.className = `playoff-team ${match.winner === match.team1 ? 'winner' : ''}`;
    team1Div.innerHTML = `
        <span class="playoff-team-name">${match.team1}</span>
        <span class="playoff-team-score">${match.score1}</span>
    `;

    const team2Div = document.createElement('div');
    team2Div.className = `playoff-team ${match.winner === match.team2 ? 'winner' : ''}`;
    team2Div.innerHTML = `
        <span class="playoff-team-name">${match.team2}</span>
        <span class="playoff-team-score">${match.score2}</span>
    `;

    div.appendChild(team1Div);
    div.appendChild(team2Div);

    if (match.penalties1 !== null) {
        const penaltyDiv = document.createElement('div');
        penaltyDiv.className = 'penalty-info';
        penaltyDiv.textContent = `Pênaltis: ${match.penalties1} x ${match.penalties2}`;
        div.appendChild(penaltyDiv);
    }

    return div;
}

function renderChampion() {
    const finalContainer = document.getElementById('final');
    finalContainer.innerHTML = '';

    const champion = state.champion;
    const finalMatch = state.playoffs.final;

    finalContainer.innerHTML = `
        <div class="champion-emoji">🏆</div>
        <div class="champion-title">Campeão Mundial de 2026!</div>
        <div class="champion-name">${champion.toUpperCase()}</div>
        <div style="margin-top: 30px; font-size: 1.1em;">
            <p>Venceu a Final contra ${finalMatch.team1 === champion ? finalMatch.team2 : finalMatch.team1}</p>
            <p style="margin-top: 15px;">Resultado: <strong>${finalMatch.score1} x ${finalMatch.score2}</strong></p>
            ${finalMatch.penalties1 !== null ? `<p>Pênaltis: <strong>${finalMatch.penalties1} x ${finalMatch.penalties2}</strong></p>` : ''}
        </div>
    `;
}

async function startSimulation() {
    try {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('actions').style.display = 'none';

        await loadTeamsFromAPI();

        createRandomGroups();

        generateGroupMatches();

        simulateGroupMatches();

        classifyGroups();

        renderGroups();
        document.getElementById('groupsSection').style.display = 'block';

        generatePlayoffStructure();

        simulatePlayoffs();

        renderPlayoffs();
        document.getElementById('playoffsSection').style.display = 'block';

        renderChampion();
        document.getElementById('finalSection').style.display = 'block';
        await sendFinalResult({
            champion: state.champion,
            finalist: state.playoffs.final.team1 === state.champion 
                ? state.playoffs.final.team2 
                : state.playoffs.final.team1,
            groups: state.classification,
            playoffs: state.playoffs
        });

        document.getElementById('loading').style.display = 'none';

        console.log('✅ Simulação concluída com sucesso!');
    } catch (error) {
        console.error('❌ Erro durante simulação:', error);
        document.getElementById('loading').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const actionsSection = document.getElementById('actions');

    actionsSection.style.display = 'block';

    startBtn.addEventListener('click', startSimulation);

    console.log('🎮 Aplicação carregada. Clique em "Iniciar Simulação" para começar.');
});
