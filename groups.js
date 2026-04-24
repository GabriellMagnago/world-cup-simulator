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
