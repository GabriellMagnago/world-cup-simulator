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
