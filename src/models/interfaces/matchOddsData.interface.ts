export interface BookmakerOdds {
  bookMakerName: string;
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface MatchOddsData {
  day: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  odds: BookmakerOdds[];
}
