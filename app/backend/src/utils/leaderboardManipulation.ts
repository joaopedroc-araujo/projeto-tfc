import IMatch from '../Interfaces/Match/IMatch';
import ITeam from '../Interfaces/Teams/Team';

class leaderboardManipulations {
    static calculateVictories(matches: IMatch[], isHome?: boolean) {
        return matches.filter((match) =>
            isHome ? match.homeTeamGoals > match.awayTeamGoals : match.awayTeamGoals > match.homeTeamGoals
        ).length;
    }

    static calculateDraws(matches: IMatch[]) {
        return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    }

    static calculateGoalsFavor(matches: IMatch[], isHome?: boolean) {
        return matches.reduce((total, match) =>
            total + (isHome ? match.homeTeamGoals : match.awayTeamGoals), 0
        );
    }

    static calculateOwnGoals(matches: IMatch[], isHome?: boolean) {
        return matches.reduce((total, match) =>
            total + (isHome ? match.awayTeamGoals : match.homeTeamGoals), 0
        );
    }

    static calculateTeamStats(matches: IMatch[], isHome?: boolean) {
        const totalGames = matches.length;
        const totalVictories = leaderboardManipulations.calculateVictories(matches, isHome);
        const totalDraws = leaderboardManipulations.calculateDraws(matches);
        const goalsFavor = leaderboardManipulations.calculateGoalsFavor(matches, isHome);
        const ownGoals = leaderboardManipulations.calculateOwnGoals(matches, isHome);
        return {
            totalPoints: totalVictories * 3 + totalDraws,
            totalGames,
            totalVictories,
            totalDraws,
            totalLosses: totalGames - totalVictories - totalDraws,
            goalsFavor,
            ownGoals,
            goalsBalance: goalsFavor - ownGoals,
            efficiency: Math
                .round(((totalVictories * 3 + totalDraws) / (totalGames * 3)) * 100 * 100) / 100,
        };
    }

    static calculateStats(team: Partial<ITeam>, matches: IMatch[], statsType: 'home' | 'away' | 'total') {
        let homeMatches = matches.filter((match) => match.homeTeamId === team.id);
        let awayMatches = matches.filter((match) => match.awayTeamId === team.id);

        let homeStats = leaderboardManipulations.calculateTeamStats(homeMatches, true);
        let awayStats = leaderboardManipulations.calculateTeamStats(awayMatches, false);

        let totalStats = {
            totalPoints: homeStats.totalPoints + awayStats.totalPoints,
            totalGames: homeStats.totalGames + awayStats.totalGames,
            totalVictories: homeStats.totalVictories + awayStats.totalVictories,
            totalDraws: homeStats.totalDraws + awayStats.totalDraws,
            totalLosses: homeStats.totalLosses + awayStats.totalLosses,
            goalsFavor: homeStats.goalsFavor + awayStats.goalsFavor,
            ownGoals: homeStats.ownGoals + awayStats.ownGoals,
            goalsBalance: homeStats.goalsBalance + awayStats.goalsBalance,
            efficiency: Math.round((((homeStats.totalVictories + awayStats.totalVictories) * 3 + (homeStats.totalDraws + awayStats.totalDraws)) / ((homeStats.totalGames + awayStats.totalGames) * 3)) * 100 * 100) / 100,
        };

        switch (statsType) {
            case 'home':
                return {
                    name: team.teamName,
                    ...homeStats,
                };
            case 'away':
                return {
                    name: team.teamName,
                    ...awayStats,
                };
            case 'total':
            default:
                return {
                    name: team.teamName,
                    ...totalStats,
                };
        }
    }

    static calculateAndSortLeaderboard(teams: Partial<ITeam>[], matches: IMatch[], statsType: 'home' | 'away' | 'total') {
        let leaderboard = teams.map((team) => {
            const teamMatches = matches.filter((match) =>
                match.homeTeamId === team.id || match.awayTeamId === team.id
            );
            return leaderboardManipulations.calculateStats(team, teamMatches, statsType);
        });

        leaderboard.sort((a, b) => {
            if (a.totalPoints !== b.totalPoints) {
                return b.totalPoints - a.totalPoints;
            }
            if (a.totalVictories !== b.totalVictories) {
                return b.totalVictories - a.totalVictories;
            }
            if ((a.goalsFavor - a.ownGoals) !== (b.goalsFavor - b.ownGoals)) {
                return (b.goalsFavor - b.ownGoals) - (a.goalsFavor - a.ownGoals);
            }
            return b.goalsFavor - a.goalsFavor;
        });

        return leaderboard;
    }

}

export default leaderboardManipulations;
