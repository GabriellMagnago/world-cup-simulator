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
