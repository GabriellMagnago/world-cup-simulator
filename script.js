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
