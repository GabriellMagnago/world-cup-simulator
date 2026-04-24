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
