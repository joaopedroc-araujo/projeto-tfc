import IMatch from './IMatch';

export default interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>
  getMatchesByProgress(inProgress: boolean): Promise<IMatch[]>,
}
