import IMatch from '../Interfaces/Match/IMatch';
import ITeam from '../Interfaces/Teams/Team';

class leaderboardManipulations {
    static calculateVictories(matches: IMatch[], isHome: boolean) {
        return matches.filter((match) =>
            isHome ? match.homeTeamGoals > match.awayTeamGoals : match.awayTeamGoals > match.homeTeamGoals
        ).length;
    }

    static calculateDraws(matches: IMatch[]) {
        return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    }

    static calculateGoalsFavor(matches: IMatch[], isHome: boolean) {
        return matches.reduce((total, match) =>
            total + (isHome ? match.homeTeamGoals : match.awayTeamGoals), 0
        );
    }

    static calculateOwnGoals(matches: IMatch[], isHome: boolean) {
        return matches.reduce((total, match) =>
            total + (isHome ? match.awayTeamGoals : match.homeTeamGoals), 0
        );
    }

    static calculateTeamStats(matches: IMatch[], isHome: boolean) {
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

    static calculateStats(team: Partial<ITeam>, matches: IMatch[], isHome: boolean) {
        const filteredMatches = matches.filter((match) =>
            isHome ? match.homeTeamId === team.id : match.awayTeamId === team.id
        );
        const teamStats = leaderboardManipulations.calculateTeamStats(filteredMatches, isHome);

        return {
            name: team.teamName,
            ...teamStats,
        };
    }
}

export default leaderboardManipulations;
