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
  league: string;
  season: string;
  score: string;
  odds: BookmakerOdds[];
  // lineup: LineupData;
  // injuries: InjuriesData;
  // statistics: StatisticsData;
  // events: EventsData;
  // players: PlayersData;
}
