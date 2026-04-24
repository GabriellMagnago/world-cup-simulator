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
