import IMatch from './IMatch';

export default interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>
  getMatchesByProgress(inProgress: boolean): Promise<IMatch[]>,
  finishMatch(matchId: number, match: Partial<IMatch>): Promise<IMatch | null>,
  updateMatch(matchId: number, match: Partial<IMatch>): Promise<{ message: string } | null>,
  // newMatch(match: IMatch): Promise<IMatch>,
}
