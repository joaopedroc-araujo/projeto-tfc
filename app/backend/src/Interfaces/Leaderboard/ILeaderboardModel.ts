import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardModel {
  getAllLeaderboard(): Promise<ILeaderboard[]>;
}
